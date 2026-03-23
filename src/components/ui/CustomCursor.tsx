'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const trailX = useMotionValue(-100)
    const trailY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
    const trailSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 }

    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)
    const trailXSpring = useSpring(trailX, trailSpringConfig)
    const trailYSpring = useSpring(trailY, trailSpringConfig)

    const moveCursor = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
        trailX.set(e.clientX)
        trailY.set(e.clientY)
        if (!isVisible) setIsVisible(true)
    }, [cursorX, cursorY, trailX, trailY, isVisible])

    useEffect(() => {
        // Detect touch device
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        setIsTouchDevice(isTouch)
        if (isTouch) return

        window.addEventListener('mousemove', moveCursor)

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.dataset.cursor === 'pointer'
            ) {
                setIsHovering(true)
            }
        }

        const handleMouseOut = () => setIsHovering(false)

        document.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseout', handleMouseOut)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseout', handleMouseOut)
        }
    }, [moveCursor])

    if (isTouchDevice) return null

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 48 : 12,
                        height: isHovering ? 48 : 12,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="rounded-full bg-white"
                    style={{
                        boxShadow: isHovering
                            ? '0 0 20px rgba(255,255,255,0.5)'
                            : '0 0 10px rgba(255,255,255,0.3)',
                    }}
                />
            </motion.div>

            {/* Trail ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: trailXSpring,
                    y: trailYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 64 : 36,
                        height: isHovering ? 64 : 36,
                        opacity: isVisible ? 0.4 : 0,
                        borderWidth: isHovering ? 2 : 1,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="rounded-full border-white/50"
                    style={{ borderStyle: 'solid' }}
                />
            </motion.div>
        </>
    )
}
