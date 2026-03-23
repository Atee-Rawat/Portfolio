'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, School } from 'lucide-react'
import { PERSONAL_INFO } from '@/utils/constants'
import { useRef } from 'react'

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%'])

  const coursework = [
    'Data Structures & Algorithms',
    'Object Oriented Programming',
    'Database Management Systems',
    'Computer Networks',
    'Software Engineering',
    'Cloud Computing',
    'Machine Learning Fundamentals',
    'System Design',
  ]

  const educationHistory = [
    {
      level: "Bachelor's Degree",
      institution: PERSONAL_INFO.university,
      degree: PERSONAL_INFO.degree,
      duration: '2022 - 2026',
      status: 'current' as const,
      icon: GraduationCap,
      color: 'from-blue-500 to-purple-600',
    },
    {
      level: 'Senior Secondary',
      institution: 'Senior Secondary Schooling, Capt. Ganga Singh Rawat IC',
      degree: 'PCM (Physics, Chemistry, Mathematics)',
      duration: '05/2020 - 07/2022',
      status: 'completed' as const,
      icon: School,
      color: 'from-green-500 to-emerald-600',
    },
  ]

  return (
    <section ref={sectionRef} id="education" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
            My <span className="gradient-text">Education</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Academic journey from school to university, focused on strong computer science foundations
          </p>
        </motion.div>

        {/* Timeline with animated line */}
        <div className="relative max-w-3xl mx-auto mb-16">
          {/* Animated vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 -translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          {educationHistory.map((education, index) => (
            <motion.div
              key={education.level}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3, type: 'spring', stiffness: 300 }}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${education.color} flex items-center justify-center shadow-lg`}>
                  <education.icon className="h-6 w-6 text-white" />
                </div>
                {education.status === 'current' && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Card */}
              <motion.div
                className={`ml-20 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="glass-effect rounded-2xl p-6 relative overflow-hidden">
                  <motion.div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${education.color}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                    style={{ transformOrigin: 'left' }}
                  />

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {education.level}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {education.institution} • {education.degree}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {education.duration}
                  </p>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${education.status === 'current'
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      }`}
                  >
                    {education.status === 'current' ? '⚡ In Progress' : '✅ Completed'}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Coursework */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              Current Academic Focus
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Currently in 7th Semester • Expected Graduation: {PERSONAL_INFO.graduationYear}
            </p>

            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Key Coursework & Specializations
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {coursework.map((course, index) => (
                <motion.div
                  key={course}
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, type: 'spring', stiffness: 200 }}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: '0 0 20px rgba(102, 126, 234, 0.2)',
                  }}
                  className="bg-white/20 dark:bg-black/20 rounded-lg p-3 text-center border border-white/15 dark:border-white/8 hover:border-blue-400/40 dark:hover:border-blue-500/40 transition-colors cursor-default"
                >
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-tight">
                    {course}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
