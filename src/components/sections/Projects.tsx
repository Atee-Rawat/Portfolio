'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, GitFork, Code, Calendar } from 'lucide-react'
import { GitHubRepo } from '@/types/github'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github-repos')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: GitHubRepo[] = await response.json()
        
        // Filter and sort repos
        const filteredRepos = data
          .filter(repo => {
            return !repo.fork
          })
          .sort((a, b) => {
            // Sort by last updated
            const dateA = new Date(a.updated_at).getTime()
            const dateB = new Date(b.updated_at).getTime()
            return dateB - dateA
          })
        
        setRepos(filteredRepos)
        
      } catch (err) {
        console.error('Error fetching repos:', err)
        setError('Failed to load projects. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  // Manual deployment URLs (Empty for now as requested)
  const DEPLOYED_PROJECTS: Record<string, string> = {
    // Example: 'Portfolio': 'https://your-portfolio-url.com',
  }

  const getDeploymentInfo = (repo: GitHubRepo) => {
    const manualUrl = DEPLOYED_PROJECTS[repo.name]
    
    const githubHomepage = repo.homepage && 
      repo.homepage.trim() !== '' && 
      (repo.homepage.startsWith('http://') || repo.homepage.startsWith('https://'))
    
    const deploymentUrl = manualUrl || (githubHomepage ? repo.homepage : null)
    
    return {
      hasDeployment: !!deploymentUrl,
      deploymentUrl
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      'C++': 'bg-blue-600',
      HTML: 'bg-orange-500',
      CSS: 'bg-blue-400',
      React: 'bg-cyan-500',
      'Next.js': 'bg-black'
    }
    return colors[language || ''] || 'bg-gray-500'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    })
  }

  const generateDescription = (name: string, language: string | null, hasDeployment: boolean) => {
    const cleanName = name.replace(/-/g, ' ').replace(/_/g, ' ')
    
    if (name === 'Portfolio') {
      return 'My personal portfolio website showcasing my projects and skills.'
    }
    
    if (hasDeployment) return `${cleanName} - Live project available.`
    return `${cleanName} - Built with ${language || 'code'}.`
  }

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A showcase of my latest work from GitHub
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : repos.length === 0 ? (
          <div className="text-center text-gray-500">
            <Github className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold">No Projects Found</h3>
            <p>Projects will appear here once added to GitHub.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {repos.map((repo) => {
              const { hasDeployment, deploymentUrl } = getDeploymentInfo(repo)
              
              return (
                <motion.div
                  key={repo.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className="glass-effect rounded-xl p-6 group hover:shadow-2xl transition-all duration-300 border border-white/20 dark:border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                        {repo.name.replace(/-/g, ' ')}
                      </h3>
                      {repo.language && (
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {repo.language}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <motion.a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </motion.a>
                      {hasDeployment && (
                        <motion.a
                          href={deploymentUrl || ''}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {repo.description || generateDescription(repo.name, repo.language, hasDeployment)}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-4 w-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(repo.updated_at)}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* View All Projects Button - Updated to your profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Atee-Rawat?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-5 w-5" />
            <span>View All Projects on GitHub</span>
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}