import { NextResponse } from 'next/server'

export async function GET() {
  const username = 'Atee-Rawat' // Updated to your username
  const githubToken = process.env.GITHUB_TOKEN

  try {
    if (!githubToken) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN is not configured' }, 
        { status: 500 }
      )
    }

    // GraphQL query to fetch pinned repositories
    const query = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: [REPOSITORY]) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                homepageUrl
                languages(first: 1) {
                  nodes {
                    name
                  }
                }
                stargazerCount
                forkCount
                updatedAt
              }
            }
          }
        }
      }
    `

    console.log('Fetching pinned repos for:', username)
    console.log('Token present:', !!githubToken)
    console.log('Token length:', githubToken?.length)

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${githubToken}`,
      },
      body: JSON.stringify({ query }),
      cache: 'no-store'
    })

    console.log('GraphQL Response status:', response.status)

    const result = await response.json()

    console.log('GraphQL Result:', JSON.stringify(result).substring(0, 500))

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors)
      return NextResponse.json(
        { error: result.errors[0].message }, 
        { status: 400 }
      )
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch pinned repositories' }, 
        { status: response.status }
      )
    }

    // Transform GraphQL response to match REST API format
    const pinnedRepos = result.data.user.pinnedItems.nodes.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      language: repo.languages.nodes[0]?.name || null,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      updated_at: repo.updatedAt,
      fork: false
    }))
    
    // Set response headers to prevent caching
    const responseHeaders = new Headers()
    responseHeaders.set('Cache-Control', 'no-store, max-age=0')
    
    return NextResponse.json(pinnedRepos, { headers: responseHeaders })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}