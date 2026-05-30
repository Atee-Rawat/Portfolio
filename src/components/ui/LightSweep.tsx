'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function LightSweep({ className = '' }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      initial={{ x: '-120%' }}
      animate={{ x: '120%' }}
      transition={{ repeat: Infinity, duration: 1.8, ease: [0.2, 0.9, 0.2, 1] }}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 45%, rgba(182,143,57,0.12) 55%, transparent 100%)',
        mixBlendMode: 'overlay',
        filter: 'blur(10px)',
      }}
    />
  )
}
