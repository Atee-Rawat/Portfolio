'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const lock = useRef(false)

  const handleClick = () => {
    if (lock.current) return
    lock.current = true
    toggleTheme()
    setTimeout(() => (lock.current = false), 350) // debounce rapid taps
  }

  const isDark = theme === 'dark'
  const ringFrom = isDark ? '#1d4ed8' : '#fbbf24' // blue vs amber
  const ringTo = isDark ? '#7c3aed' : '#f97316'   // violet vs orange

  return (
    <motion.button
      onClick={handleClick}
      className="relative p-3 rounded-xl glass-effect hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 overflow-hidden group"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Toggle theme"
    >
      {/* Animated gradient ring */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl blur-[10px]"
        style={{ background: `linear-gradient(135deg, ${ringFrom}, ${ringTo})` }}
        animate={{ opacity: isDark ? 0.55 : 0.45, rotate: isDark ? 25 : -25 }}
        transition={{ duration: 0.6 }}
      />

      {/* Inner backdrop */}
      <div className="relative z-10 rounded-xl px-2 py-1.5 bg-white/10 dark:bg-black/10 backdrop-blur-[2px]" />

      {/* Icon container with spin/scale */}
      <motion.div
        className="absolute inset-0 grid place-items-center z-20"
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', type: 'spring', stiffness: 220, damping: 14 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
              transition={{ duration: 0.28 }}
              className="relative"
            >
              {/* Sunburst for light mode arrival */}
              <motion.span
                className="absolute -inset-3 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, #fde68a, #fb923c, #fde68a)' }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.35, scale: 1.0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.45 }}
              />
              <Sun className="relative h-5 w-5 text-yellow-400 drop-shadow" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -90 }}
              transition={{ duration: 0.28 }}
              className="relative"
            >
              {/* Starfield flare for dark mode arrival */}
              <motion.span
                className="absolute -inset-3 rounded-full"
                style={{ background: 'radial-gradient(circle at 60% 40%, rgba(124,58,237,0.35), transparent 60%)' }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.3, scale: 1.0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.45 }}
              />
              <Moon className="relative h-5 w-5 text-slate-700 dark:text-slate-300 drop-shadow" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ripple feedback */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={false}
        whileTap={{ scale: 1.45, opacity: 0.12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ background: isDark ? '#000000' : '#ffffff', opacity: 0 }}
      />
    </motion.button>
  )
}
