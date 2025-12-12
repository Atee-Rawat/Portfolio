'use client'

import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Award, Code } from 'lucide-react'
import { PERSONAL_INFO } from '@/utils/constants'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="about" className="py-20 bg-white/50 dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Full Stack Developer & DevOps Specialist building reliable web and mobile products end‑to‑end.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm Ateeshay Rawat, a passionate Full Stack Developer and DevOps specialist with a wide tech stack across
              web and mobile. I work with MERN, Next.js, TypeScript, React Native, and LAMP to deliver scalable, secure,
              and user‑centric websites and apps.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              On the infrastructure side, I design CI/CD pipelines and cloud deployments across AWS, Azure, GCP, and
              DigitalOcean. I rely on GitHub, Git, Postman, Docker, and solid testing and monitoring practices to ship
              fast and maintain quality in production.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-lg"
              >
                <MapPin className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700 dark:text-gray-300">{PERSONAL_INFO.location}</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-lg"
              >
                <GraduationCap className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700 dark:text-gray-300">{PERSONAL_INFO.university}</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-6 rounded-xl text-center"
            >
              <Code className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Web + Mobile</h3>
              <p className="text-gray-600 dark:text-gray-400">React, Next.js, React Native, Node.js</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-6 rounded-xl text-center"
            >
              <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">MERN • LAMP</h3>
              <p className="text-gray-600 dark:text-gray-400">TypeScript, Express, PHP/MySQL</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-6 rounded-xl text-center"
            >
              <GraduationCap className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Cloud Platforms</h3>
              <p className="text-gray-600 dark:text-gray-400">AWS, Azure, GCP, DigitalOcean</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-6 rounded-xl text-center"
            >
              <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">DevOps & Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">Docker, GitHub Actions, Git, Postman</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
