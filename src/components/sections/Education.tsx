'use client'

import { motion } from 'framer-motion'
import { GraduationCap, School } from 'lucide-react'
import { PERSONAL_INFO } from '@/utils/constants'

export default function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const coursework = [
    'Data Structures & Algorithms',
    'Object Oriented Programming',
    'Database Management Systems',
    'Computer Networks',
    'Software Engineering',
    'Cloud Computing',
    'Machine Learning Fundamentals',
    'System Design'
  ]

  // Education timeline data (no CGPA/percentages, 10th removed)
  const educationHistory = [
    {
      level: "Bachelor's Degree",
      institution: PERSONAL_INFO.university,
      degree: PERSONAL_INFO.degree,
      duration: '2022 - 2026',
      status: 'current',
      icon: GraduationCap,
      color: 'from-blue-500 to-purple-600'
    },
    {
      level: 'Senior Secondary',
      institution: 'Senior Secondary Schooling, Capt. Ganga Singh Rawat IC',
      degree: 'PCM (Physics, Chemistry, Mathematics)',
      duration: '05/2020 - 07/2022',
      status: 'completed',
      icon: School,
      color: 'from-green-500 to-emerald-600'
    }
  ]

  return (
    <section id="education" className="py-20">
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
            My <span className="gradient-text">Education</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Academic journey from school to university, focused on strong computer science foundations
          </motion.p>
        </motion.div>

        {/* Education Timeline Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-6 mb-16"
        >
          {educationHistory.map((education) => (
            <motion.div
              key={`${education.level}-${education.institution}-${education.duration}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass-effect rounded-2xl p-6 border border-white/20 dark:border-white/10 relative"
            >
              <div className="flex items-center space-x-4">
                {/* Icon */}
                <motion.div whileHover={{ rotate: 5 }} className="flex-shrink-0">
                  <div className={`w-14 h-14 bg-gradient-to-br ${education.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <education.icon className="h-7 w-7 text-white" />
                  </div>
                </motion.div>

                {/* Content (no grade line) */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {education.level}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {education.institution} • {education.degree}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {education.duration}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                  education.status === 'current'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                }`}
              >
                {education.status === 'current' ? 'In Progress' : 'Completed'}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Current University Details (CGPA removed, keep status and coursework) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-effect rounded-2xl p-8 border border-white/20 dark:border-white/10"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Current Academic Focus
            </h3>

            {/* Academic Status only */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 dark:text-white">Academic Status</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Currently in 7th Semester • Expected Graduation: {PERSONAL_INFO.graduationYear}
              </p>
            </div>

            {/* Key Coursework */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Key Coursework & Specializations</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {coursework.map((course, index) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/30 dark:bg-black/30 rounded-lg p-3 text-center border border-white/20 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
                  >
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-tight">
                      {course}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
