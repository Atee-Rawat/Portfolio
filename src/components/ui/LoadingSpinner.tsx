'use client'

import { motion, useCycle } from 'framer-motion'

export default function LoadingSpinner() {
  const [phase, cyclePhase] = useCycle<'idle' | 'pulse'>('idle', 'pulse')

  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative" style={{ width: 64, height: 64 }}>
        {/* Conic energy ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage: 'conic-gradient(#6A5CF6, #6CC6FF, #6A5CF6)',
            maskImage: 'radial-gradient(circle at center, transparent 58%, black 60%)',
            WebkitMaskImage: 'radial-gradient(circle at center, transparent 58%, black 60%)',
            boxShadow: '0 0 24px rgba(108,198,255,0.25)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
          onAnimationComplete={() => cyclePhase()}
        />

        {/* Inner glow pulse */}
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{
            background: 'radial-gradient(closest-side, rgba(106,92,246,0.25), transparent 70%)',
          }}
          animate={phase === 'pulse' ? { opacity: [0.5, 0.9, 0.5] } : { opacity: 0.6 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* A.R mini tile */}
        <div
          className="absolute inset-0 grid place-items-center rounded-full pointer-events-none"
          aria-label="Loading"
        >
          <div
            className="w-7 h-7 rounded-xl grid place-items-center text-white text-xs font-bold shadow-xl"
            style={{ background: 'linear-gradient(135deg, #6A5CF6, #6CC6FF)' }}
          >
            AR
          </div>
        </div>
      </div>
    </div>
  )
}
