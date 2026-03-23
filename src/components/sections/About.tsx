'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { MapPin, GraduationCap, Award, Code, Briefcase, Cloud, Cpu, Layers } from 'lucide-react'
import { PERSONAL_INFO } from '@/utils/constants'
import { useRef, useState } from 'react'

const stats = [
  { icon: Code, label: 'Web + Mobile', desc: 'React, Next.js, React Native, Node.js', color: 'from-blue-500 to-cyan-500' },
  { icon: Layers, label: 'MERN • LAMP', desc: 'TypeScript, Express, PHP/MySQL', color: 'from-purple-500 to-violet-500' },
  { icon: Cloud, label: 'Cloud Platforms', desc: 'AWS, Azure, GCP, DigitalOcean', color: 'from-green-500 to-emerald-500' },
  { icon: Cpu, label: 'DevOps & Tools', desc: 'Docker, GitHub Actions, Git, Postman', color: 'from-orange-500 to-red-500' },
]

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) / (rect.width / 2)
    const deltaY = (e.clientY - centerY) / (rect.height / 2)
    rotateX.set(-deltaY * 10)
    rotateY.set(deltaX * 10)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Full Stack Developer & DevOps Specialist building reliable web and mobile products end‑to‑end.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <motion.p
              className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              I&apos;m Ateeshay Rawat, a passionate Full Stack Developer and DevOps specialist with a wide tech stack across
              web and mobile. I work with MERN, Next.js, TypeScript, React Native, and LAMP to deliver scalable, secure,
              and user‑centric websites and apps.
            </motion.p>

            <motion.p
              className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              On the infrastructure side, I design CI/CD pipelines and cloud deployments across AWS, Azure, GCP, and
              DigitalOcean. I rely on GitHub, Git, Postman, Docker, and solid testing and monitoring practices to ship
              fast and maintain quality in production.
            </motion.p>

            <div className="flex flex-wrap gap-4 pt-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 glass-effect px-4 py-2.5 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <MapPin className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{PERSONAL_INFO.location}</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 glass-effect px-4 py-2.5 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <GraduationCap className="h-5 w-5 text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{PERSONAL_INFO.university}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Stat cards with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {stats.map((stat, index) => (
              <TiltCard key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  className="glass-effect p-6 rounded-xl text-center relative overflow-hidden group"
                >
                  {/* Gradient top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

                  <motion.div
                    className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <stat.icon className="h-7 w-7 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{stat.label}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
