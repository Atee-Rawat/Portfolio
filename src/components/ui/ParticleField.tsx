'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    color: string
}

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#60a5fa', '#a78bfa']

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: -1000, y: -1000 })
    const animationRef = useRef<number>(0)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    const initParticles = useCallback((width: number, height: number) => {
        const count = Math.min(80, Math.floor((width * height) / 15000))
        const particles: Particle[] = []
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            })
        }
        particlesRef.current = particles
    }, [])

    const animate = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const { width, height } = canvas
        ctx.clearRect(0, 0, width, height)

        const particles = particlesRef.current
        const mouse = mouseRef.current

        particles.forEach((p, i) => {
            // Mouse interaction
            const dx = mouse.x - p.x
            const dy = mouse.y - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const mouseRadius = 150

            if (dist < mouseRadius) {
                const force = (mouseRadius - dist) / mouseRadius
                p.vx -= (dx / dist) * force * 0.5
                p.vy -= (dy / dist) * force * 0.5
            }

            // Update position
            p.x += p.vx
            p.y += p.vy

            // Friction
            p.vx *= 0.99
            p.vy *= 0.99

            // Boundary wrap
            if (p.x < 0) p.x = width
            if (p.x > width) p.x = 0
            if (p.y < 0) p.y = height
            if (p.y > height) p.y = 0

            // Draw particle
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = p.color
            ctx.globalAlpha = p.opacity
            ctx.fill()

            // Draw lines to nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j]
                const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
                if (d < 120) {
                    ctx.beginPath()
                    ctx.moveTo(p.x, p.y)
                    ctx.lineTo(p2.x, p2.y)
                    ctx.strokeStyle = p.color
                    ctx.globalAlpha = (1 - d / 120) * 0.15
                    ctx.lineWidth = 0.5
                    ctx.stroke()
                }
            }

            // Draw line to mouse if close
            if (dist < mouseRadius) {
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(mouse.x, mouse.y)
                ctx.strokeStyle = '#667eea'
                ctx.globalAlpha = (1 - dist / mouseRadius) * 0.3
                ctx.lineWidth = 0.5
                ctx.stroke()
            }
        })

        ctx.globalAlpha = 1
        animationRef.current = requestAnimationFrame(animate)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleResize = () => {
            const w = window.innerWidth
            const h = window.innerHeight
            canvas.width = w
            canvas.height = h
            setDimensions({ width: w, height: h })
            initParticles(w, h)
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseleave', handleMouseLeave)

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseleave', handleMouseLeave)
            cancelAnimationFrame(animationRef.current)
        }
    }, [initParticles, animate])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-auto z-0"
            style={{ opacity: 0.7 }}
        />
    )
}
