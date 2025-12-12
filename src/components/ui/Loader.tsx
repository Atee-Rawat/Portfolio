'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiAmazon,
  SiGooglecloud,
  SiDigitalocean,
  SiNginx,
  SiPhp,
  SiGraphql,
  SiKubernetes,
  SiTypescript,
  SiJavascript,
  SiTailwindcss
} from 'react-icons/si'
import type { IconType } from 'react-icons'

type TechIcon = { key: string; Icon: IconType; color?: string }

const TECH_ICONS: TechIcon[] = [
  { key: 'react', Icon: SiReact, color: '#61DAFB' },
  { key: 'next', Icon: SiNextdotjs, color: '#FFFFFF' },
  { key: 'ts', Icon: SiTypescript, color: '#3178C6' },
  { key: 'js', Icon: SiJavascript, color: '#F7DF1E' },
  { key: 'tailwind', Icon: SiTailwindcss, color: '#38BDF8' },
  { key: 'node', Icon: SiNodedotjs, color: '#3C873A' },
  { key: 'express', Icon: SiExpress, color: '#FFFFFF' },
  { key: 'mongo', Icon: SiMongodb, color: '#47A248' },
  { key: 'postgres', Icon: SiPostgresql, color: '#336791' },
  { key: 'redis', Icon: SiRedis, color: '#DC382D' },
  { key: 'docker', Icon: SiDocker, color: '#2496ED' },
  { key: 'gha', Icon: SiGithubactions, color: '#2088FF' },
  { key: 'aws', Icon: SiAmazon, color: '#FF9900' },
  { key: 'gcp', Icon: SiGooglecloud, color: '#4285F4' },
  { key: 'do', Icon: SiDigitalocean, color: '#0080FF' },
  { key: 'nginx', Icon: SiNginx, color: '#009639' },
  { key: 'php', Icon: SiPhp, color: '#777BB4' },
  { key: 'graphql', Icon: SiGraphql, color: '#E10098' },
  { key: 'k8s', Icon: SiKubernetes, color: '#326CE5' }
]

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(t)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const setDims = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })
      setDims()
      window.addEventListener('resize', setDims)
      return () => window.removeEventListener('resize', setDims)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background:
          'radial-gradient(1200px 800px at 50% 40%, rgba(108,198,255,0.10), transparent 60%), radial-gradient(1000px 700px at 50% 70%, rgba(106,92,246,0.08), transparent 60%), linear-gradient(135deg, #0a0f1c 0%, #090d17 40%, #070b12 100%)'
      }}
    >
      {/* Layer A: behind content */}
      <TechRain width={dimensions.width} height={dimensions.height} density={30} opacity={0.55} zIndexClass="z-0" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-24 h-24 mx-auto mb-8 rounded-2xl flex items-center justify-center shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #6A5CF6 0%, #6CC6FF 100%)' }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-white"
          >
            AR
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold text-white mb-2"
        >
          Ateeshay Rawat
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-blue-400 mb-8"
        >
          FullStack Developer and DevOps Specialist
        </motion.p>

        <div className="w-64 mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Loading Portfolio</span>
            <span className="text-sm text-blue-400 font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #6A5CF6, #6CC6FF)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#6CC6FF' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Layer B: in front of content (very faint) */}
      <TechRain width={dimensions.width} height={dimensions.height} density={16} opacity={0.18} zIndexClass="z-20" />
    </motion.div>
  )
}

/* ---------- Optimized Tech Rain ---------- */
function TechRain({
  width,
  height,
  density = 30,
  opacity = 0.6,
  zIndexClass = 'z-0'
}: {
  width: number
  height: number
  density?: number
  opacity?: number
  zIndexClass?: string
}) {
  // OFF: no center gutter; full‑page coverage
  const drops = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      // full width spawn with slight negative overdraw to avoid side bias
      const x = -40 + Math.random() * (width + 80) // [-40, width+40]
      const yStart = -120 - Math.random() * 180 // above viewport
      const yEnd = height + 160 // below viewport
      const tech = TECH_ICONS[i % TECH_ICONS.length]
      const size = 16 + Math.floor(Math.random() * 16) // 16–32
      const dur = 4.8 + Math.random() * 2.8 // faster to reduce lag feel
      const delay = Math.random() * 0.1 // start immediately
      const drift = (Math.random() - 0.5) * 120 // smaller drift for fewer paints
      const rotate = (Math.random() - 0.5) * 20 // smaller rotation to keep GPU cheap

      return {
        id: `${tech.key}-${i}-${size}`,
        tech,
        size,
        x,
        yStart,
        yEnd,
        xDrift: x + drift,
        dur,
        delay,
        rotate
      }
    })
  }, [width, height, density])

  return (
    <div className={`absolute inset-0 pointer-events-none ${zIndexClass}`}>
      {drops.map((d) => {
        const Icon = d.tech.Icon
        return (
          <motion.div
            key={d.id}
            className="absolute will-change-transform"
            style={{
              width: d.size,
              height: d.size,
              left: d.x,
              top: d.yStart,
              opacity,
              transform: 'translateZ(0)' // promote to its own layer (GPU)
            }}
            initial={{ y: d.yStart }}
            animate={{ x: d.xDrift, y: d.yEnd, rotate: d.rotate }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'linear' }}
          >
            <div
              className="w-full h-full grid place-items-center rounded-md"
              style={{
                // keep effects subtle to reduce paint time
                boxShadow: '0 0 6px rgba(108,198,255,0.18)',
                background: 'rgba(255,255,255,0.02)'
              }}
            >
              <Icon size={d.size} color={d.tech.color ?? '#cfe8ff'} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
