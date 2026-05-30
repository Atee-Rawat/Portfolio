'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function AnimatedSunCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { damping: 30, mass: 0.5, stiffness: 200 })
  const springY = useSpring(cursorY, { damping: 30, mass: 0.5, stiffness: 200 })
  
  const [isHovering, setIsHovering] = useState(false)
  const trailRef = useRef<{ x: number; y: number; id: number }[]>([])
  const trailCounterRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Add trail particles
      trailCounterRef.current++
      if (trailCounterRef.current % 4 === 0) {
        trailRef.current.push({
          x: e.clientX,
          y: e.clientY,
          id: Math.random(),
        })
        if (trailRef.current.length > 15) {
          trailRef.current.shift()
        }
      }
    }

    const handleMouseDown = () => {
      const element = containerRef.current
      if (element) {
        element.style.animation = 'pulse-radiation 0.6s ease-out'
        setTimeout(() => {
          element.style.animation = ''
        }, 600)
      }
    }

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, [role="button"]')
      setIsHovering(!!isClickable)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseover', handleHoverStart)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseover', handleHoverStart)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }

        @keyframes rotate-plasma {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes orbit-particles {
          0% { transform: rotate(0deg) translateX(16px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(16px) rotate(-360deg); }
        }

        @keyframes pulse-radiation {
          0% {
            box-shadow: 0 0 20px rgba(255, 200, 0, 0.8),
                        0 0 40px rgba(255, 150, 0, 0.4),
                        inset 0 0 20px rgba(255, 200, 0, 0.2);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 200, 0, 0.6),
                        0 0 100px rgba(255, 150, 0, 0.3),
                        inset 0 0 40px rgba(255, 200, 0, 0.1);
            transform: scale(1.2);
          }
          100% {
            box-shadow: 0 0 0px rgba(255, 200, 0, 0),
                        0 0 0px rgba(255, 150, 0, 0),
                        inset 0 0 0px rgba(255, 200, 0, 0);
            transform: scale(1);
          }
        }
      `}</style>

      {/* Trail particles */}
      {trailRef.current.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: particle.x,
            top: particle.y,
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{
              background: 'radial-gradient(circle, #ffc800 0%, #ff9600 100%)',
              boxShadow: '0 0 8px rgba(255, 200, 0, 0.6)',
            }}
          />
        </motion.div>
      ))}

      {/* Main cursor */}
      <motion.div
        ref={containerRef}
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        animate={{
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Core glowing sun */}
        <div
          className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle at 30% 30%, #ffeb3b, #ffc800, #ff9600)',
            boxShadow: `
              0 0 15px rgba(255, 200, 0, 0.9),
              0 0 30px rgba(255, 150, 0, 0.6),
              inset -2px -2px 8px rgba(0, 0, 0, 0.4),
              inset 2px 2px 8px rgba(255, 255, 200, 0.3)
            `,
          }}
        />

        {/* Plasma ring (rotating) */}
        <motion.div
          style={{
            position: 'absolute',
            width: '32px',
            height: '32px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid',
            borderColor: 'transparent rgba(255, 200, 0, 0.6) transparent rgba(255, 150, 0, 0.3)',
            borderRadius: '50%',
            animation: 'rotate-plasma 3s linear infinite',
          }}
        />

        {/* Outer corona glow */}
        <div
          style={{
            position: 'absolute',
            width: '48px',
            height: '48px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            boxShadow: '0 0 24px rgba(255, 200, 0, 0.4), 0 0 48px rgba(255, 150, 0, 0.2)',
          }}
        />

        {/* Orbiting particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              left: '50%',
              top: '50%',
              background: 'rgba(255, 200, 0, 0.8)',
              boxShadow: '0 0 6px rgba(255, 200, 0, 0.6)',
              animation: `orbit-particles 4s linear infinite`,
              transformOrigin: '0 0',
              animationDelay: `${i * 1.33}s`,
            }}
          />
        ))}
      </motion.div>
    </>
  )
}
