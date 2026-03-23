'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SKILLS } from '@/utils/constants'

const ADD_SKILLS = {
  programming: ['JavaScript', 'TypeScript', 'Go', 'PHP', 'Kotlin'],
  frontend: ['React', 'Next.js', 'React Native', 'Tailwind CSS'],
  backend: ['Node.js', 'Express', 'NestJS', 'PHP', 'Go', 'REST APIs', 'GraphQL'],
  databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
  cloud: ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean', 'Docker', 'Kubernetes', 'Nginx', 'GitHub Actions', 'CI/CD'],
  tools: ['Git', 'GitHub', 'Postman', 'Docker', 'Android Studio', 'VS Code'],
} as const

const mergeSkills = (base: any, add: any) =>
  Object.fromEntries(
    Object.keys(base).map((k) => [
      k,
      Array.from(new Set([...(base[k] ?? []), ...(add[k] ?? [])])),
    ])
  )

const MERGED = mergeSkills(SKILLS, ADD_SKILLS)

const skillCategories = [
  { name: 'Programming', skills: MERGED.programming, color: 'from-blue-500 to-cyan-500', glow: 'rgba(59,130,246,0.3)' },
  { name: 'Frontend', skills: MERGED.frontend, color: 'from-green-500 to-emerald-500', glow: 'rgba(16,185,129,0.3)' },
  { name: 'Backend', skills: MERGED.backend, color: 'from-purple-500 to-violet-500', glow: 'rgba(139,92,246,0.3)' },
  { name: 'Databases', skills: MERGED.databases, color: 'from-orange-500 to-red-500', glow: 'rgba(249,115,22,0.3)' },
  { name: 'Cloud & DevOps', skills: MERGED.cloud, color: 'from-pink-500 to-rose-500', glow: 'rgba(236,72,153,0.3)' },
  { name: 'Tools', skills: MERGED.tools, color: 'from-indigo-500 to-blue-500', glow: 'rgba(99,102,241,0.3)' },
]

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Technical <span className="gradient-text">Skills</span>
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Proficient in modern technologies across the full stack development spectrum
          </p>
        </motion.div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="group glass-effect rounded-xl p-6 relative overflow-hidden"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Animated glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${category.glow}, transparent 70%)`,
                }}
              />

              {/* Gradient bar with animation */}
              <motion.div
                className={`h-1 bg-gradient-to-r ${category.color} rounded-full mb-4`}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
              />

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 relative z-10">
                {category.name}
              </h3>

              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill: string, skillIndex: number) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: categoryIndex * 0.05 + skillIndex * 0.04,
                      duration: 0.4,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: `0 0 15px ${category.glow}`,
                      transition: { duration: 0.2 },
                    }}
                    className="px-3 py-1.5 text-sm bg-white/10 dark:bg-white/5 rounded-full text-gray-700 dark:text-gray-300 border border-white/20 dark:border-white/10 cursor-default backdrop-blur-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Card count badge */}
              <div className="absolute top-10 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {category.skills.length} skills
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total skills counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.p
            className="text-gray-500 dark:text-gray-400 text-sm"
          >
            <motion.span
              className="text-2xl font-bold gradient-text"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            >
              {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}+
            </motion.span>{' '}
            technologies mastered
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
