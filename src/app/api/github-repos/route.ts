import { NextResponse } from 'next/server'

export async function GET() {
  const username = 'Atee-Rawat' // Updated to your username
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // If you run into rate limits, you might need a GITHUB_TOKEN here later
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch repositories' }, 
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}