'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Download, Phone, Mail, ArrowDown } from 'lucide-react'
import { PERSONAL_INFO } from '@/utils/constants'
import Typewriter from 'typewriter-effect'
import ParticleField from '@/components/ui/ParticleField'
import { useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const handleDownloadResume = () => {
    const a = document.createElement('a')
    a.href = '/AteeshayRawat.pdf'
    a.download = 'AteeshayRawat.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  // Letter-by-letter animation for "Hi, I'm"
  const greeting = "Hi, I'm"
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { delay: 0.3 + i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Interactive particle field */}
      <div className="absolute inset-0 z-[1]">
        <ParticleField />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        {/* Rotating ring */}
        <motion.div
          className="absolute top-[15%] right-[10%] w-32 h-32 border-2 border-blue-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        {/* Floating diamond */}
        <motion.div
          className="absolute bottom-[20%] left-[8%] w-16 h-16 border-2 border-purple-500/20"
          style={{ transform: 'rotate(45deg)' }}
          animate={{ y: [-20, 20, -20], rotate: [45, 135, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Small floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center">
          {/* Name with glitch + letter animation */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 mt-16"
          >
            <span className="inline-flex" style={{ perspective: '1000px' }}>
              {greeting.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={letter === ' ' ? 'inline-block w-3' : 'inline-block'}
                  style={{ transformOrigin: 'bottom' }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>{' '}
            <motion.span
              className="gradient-text glitch-text inline-block"
              data-text={PERSONAL_INFO.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, type: 'spring', stiffness: 200 }}
            >
              {PERSONAL_INFO.name}
            </motion.span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 h-20 flex items-center justify-center"
          >
            <div className="glass-effect px-6 py-3 rounded-2xl neon-box">
              <Typewriter
                options={{
                  strings: [
                    'Full Stack Developer & DevOps',
                    'Web + Mobile: MERN & React Native',
                    'Next.js • TypeScript • LAMP',
                    'AWS • Azure • GCP • DigitalOcean',
                    'Docker • CI/CD • GitHub Actions',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 80,
                  deleteSpeed: 50,
                  wrapperClassName: 'font-semibold gradient-text',
                }}
              />
            </div>
          </motion.div>

          {/* Tagline with reveal animation */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            {PERSONAL_INFO.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-10">
            <motion.button
              onClick={handleDownloadResume}
              className="magnetic-btn group flex items-center space-x-3 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
              whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              data-cursor="pointer"
            >
              <Download className="h-5 w-5 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </motion.button>

            <motion.a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn group inline-flex items-center space-x-3 bg-gray-900 dark:bg-white/10 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 border border-white/10"
              whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.98 }}
              data-cursor="pointer"
            >
              <Github className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span className="hidden md:inline">GitHub</span>
            </motion.a>
          </motion.div>

          {/* Contact links */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-6 mb-12">
            <motion.a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              data-cursor="pointer"
            >
              <Mail className="h-5 w-5" />
              <div className="text-left">
                <p className="text-sm font-semibold">{PERSONAL_INFO.email}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email me</p>
              </div>
            </motion.a>

            <motion.a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="inline-flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              data-cursor="pointer"
            >
              <Phone className="h-5 w-5" />
              <div className="text-left">
                <p className="text-sm font-semibold">{PERSONAL_INFO.phone}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Call me</p>
              </div>
            </motion.a>

            <motion.a
              href={`https://wa.me/${PERSONAL_INFO.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25d366] shadow-lg hover:shadow-2xl hover:bg-[#1ebe57] transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              <svg className="w-7 h-7" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="p-2 rounded-full glass-effect"
            >
              <ArrowDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
