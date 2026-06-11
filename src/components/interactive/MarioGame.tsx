'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, X, Rocket, Crosshair, ChevronRight } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────
interface Player {
    x: number; y: number; vy: number; vx: number
    width: number; height: number
    onGround: boolean; facing: 'left' | 'right'
    jetpackActive: boolean;
    particles: { x: number, y: number, life: number, maxLife: number, vx: number, vy: number }[]
}

interface Platform {
    x: number; y: number; width: number; height: number
    color: string; type: 'station' | 'asteroid'
}

interface Collectible {
    x: number; y: number; size: number
    label: string; color: string; collected: boolean; group: string
}

// ─── Skill Data & Map Coordinates ─────────────────────────
const SKILL_ITEMS = [
    { label: 'React', color: '#61DAFB', group: 'Frontend Architecture' },
    { label: 'Next.js', color: '#FFFFFF', group: 'Frontend Framework' },
    { label: 'Node.js', color: '#3C873A', group: 'Backend Runtime' },
    { label: 'TypeScript', color: '#3178C6', group: 'Language Protocol' },
    { label: 'MongoDB', color: '#47A248', group: 'NoSQL Database' },
    { label: 'Docker', color: '#2496ED', group: 'Containerization' },
    { label: 'AWS', color: '#FF9900', group: 'Cloud Infrastructure' },
    { label: 'Go', color: '#00ADD8', group: 'Systems Language' },
    { label: 'Redis', color: '#DC382D', group: 'In-Memory Datastore' },
    { label: 'K8s', color: '#326CE5', group: 'Orchestration' },
    { label: 'GraphQL', color: '#E10098', group: 'API Query Language' },
    { label: 'PHP', color: '#777BB4', group: 'Backend Language' },
    { label: 'Git', color: '#F05032', group: 'Version Control' },
    { label: 'Azure', color: '#0078D4', group: 'Cloud Infrastructure' },
    { label: 'Tailwind', color: '#38BDF8', group: 'Styling Engine' },
    { label: 'Express', color: '#68A063', group: 'Server Framework' },
    { label: 'MySQL', color: '#4479A1', group: 'Relational DB' },
    { label: 'PostgreSQL', color: '#336791', group: 'Relational DB' },
    { label: 'GCP', color: '#4285F4', group: 'Cloud Infrastructure' },
    { label: 'NestJS', color: '#E0234E', group: 'Backend Framework' },
]

const MAP_NODES: Record<string, {x: number, y: number}> = {
  'React': {x: 50, y: 50},
  'Next.js': {x: 35, y: 40},
  'Tailwind': {x: 40, y: 65},
  'TypeScript': {x: 60, y: 35},
  'Node.js': {x: 70, y: 50},
  'Express': {x: 80, y: 40},
  'NestJS': {x: 75, y: 65},
  'GraphQL': {x: 60, y: 55},
  'MongoDB': {x: 90, y: 35},
  'PostgreSQL': {x: 85, y: 70},
  'MySQL': {x: 95, y: 60},
  'Redis': {x: 90, y: 80},
  'AWS': {x: 20, y: 20},
  'Azure': {x: 35, y: 15},
  'GCP': {x: 10, y: 35},
  'Docker': {x: 25, y: 75},
  'K8s': {x: 15, y: 65},
  'Git': {x: 50, y: 20},
  'Go': {x: 65, y: 15},
  'PHP': {x: 80, y: 20},
}

const CONNECTIONS = [
    ['React', 'Next.js'], ['React', 'Tailwind'], ['React', 'TypeScript'],
    ['Node.js', 'Express'], ['Node.js', 'NestJS'], ['Node.js', 'TypeScript'],
    ['Express', 'MongoDB'], ['NestJS', 'PostgreSQL'], ['PostgreSQL', 'MySQL'],
    ['PostgreSQL', 'Redis'], ['AWS', 'Azure'], ['AWS', 'GCP'],
    ['Docker', 'K8s'], ['Git', 'Go'], ['Go', 'PHP'],
    ['React', 'GraphQL'], ['Node.js', 'GraphQL']
]

// ─── Game Constants ──────────────────────────────────────
const CANVAS_W = 800
const CANVAS_H = 400
const GRAVITY = 0.15
const JETPACK_FORCE = 0.4
const MAX_FALL_SPEED = 6
const MOVE_SPEED = 3.5
const WORLD_WIDTH = 6000 

// ─── Level Generator ─────────────────────────────────────
function generateLevel() {
    const platforms: Platform[] = []
    const collectibles: Collectible[] = []
    
    // Space stations (ground segments)
    let gx = 0
    while (gx < WORLD_WIDTH) {
        const segW = 300 + Math.random() * 500
        platforms.push({ x: gx, y: CANVAS_H - 30, width: segW, height: 30, color: '#0f172a', type: 'station' })
        gx += segW + 150 + Math.random() * 200 
    }
    
    // Orbital platforms
    for (let i = 0; i < 40; i++) {
        platforms.push({
            x: 200 + i * 150 + Math.random() * 100,
            y: 80 + Math.random() * 220,
            width: 70 + Math.random() * 80,
            height: 12,
            color: '#1e293b',
            type: 'asteroid'
        })
    }
    
    // Collectibles (Tech Sectors)
    SKILL_ITEMS.forEach((skill, i) => {
        const px = 400 + i * 270 + Math.random() * 100
        const py = 60 + Math.random() * 180
        collectibles.push({
            x: px, y: py, size: 28,
            label: skill.label, color: skill.color, group: skill.group, collected: false,
        })
    })

    // Sort platforms by X
    platforms.sort((a,b) => a.x - b.x)
    collectibles.sort((a,b) => a.x - b.x)

    return { platforms, collectibles }
}

// ─── Component ───────────────────────────────────────────
export default function TechnologyExplorationSimulator() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'map' | 'won'>('menu')
    const [discoveredSkills, setDiscoveredSkills] = useState<string[]>([])
    const [lastDiscovered, setLastDiscovered] = useState<{label: string, group: string, color: string} | null>(null)
    const [scanOverlay, setScanOverlay] = useState(false)
    const totalSkills = SKILL_ITEMS.length

    const playerRef = useRef<Player>({
        x: 100, y: 150, vy: 0, vx: 0,
        width: 24, height: 32,
        onGround: false, facing: 'right',
        jetpackActive: false, particles: []
    })
    
    const keysRef = useRef<Set<string>>(new Set())
    const cameraRef = useRef(0)
    const levelRef = useRef(generateLevel())
    const animRef = useRef(0)
    
    // Background Stars Array
    const starsRef = useRef(Array.from({length: 100}, () => ({
        x: Math.random() * CANVAS_W,
        y: Math.random() * CANVAS_H,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: 0.1 + Math.random() * 0.3
    })))

    // ── Game Start ──
    const startGame = useCallback(() => {
        playerRef.current = {
            x: 100, y: 150, vy: 0, vx: 0,
            width: 24, height: 32,
            onGround: false, facing: 'right',
            jetpackActive: false, particles: []
        }
        cameraRef.current = 0
        setDiscoveredSkills([])
        setScanOverlay(false)
        levelRef.current = generateLevel()
        setGameState('playing')
    }, [])

    // ── Input Handling ──
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (gameState === 'map') return;
            const tag = (e.target as HTMLElement)?.tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA') return
            keysRef.current.add(e.key.toLowerCase())
            if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) e.preventDefault()
        }
        const up = (e: KeyboardEvent) => keysRef.current.delete(e.key.toLowerCase())
        window.addEventListener('keydown', down)
        window.addEventListener('keyup', up)
        return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
    }, [gameState])

    // ── Touch controls ──
    const touchRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({ left: false, right: false, jump: false })
    const leftBtnRef = useRef<HTMLButtonElement>(null)
    const jumpBtnRef = useRef<HTMLButtonElement>(null)
    const rightBtnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            if (gameState !== 'playing') return
            const t = touchRef.current
            if (t.left) keysRef.current.add('arrowleft')
            else keysRef.current.delete('arrowleft')
            if (t.right) keysRef.current.add('arrowright')
            else keysRef.current.delete('arrowright')
            if (t.jump) keysRef.current.add(' ')
            else keysRef.current.delete(' ')
        }, 16)
        return () => clearInterval(interval)
    }, [gameState])

    useEffect(() => {
        const opts: AddEventListenerOptions = { passive: false }
        const leftBtn = leftBtnRef.current
        const jumpBtn = jumpBtnRef.current
        const rightBtn = rightBtnRef.current

        const onLeftStart = (e: Event) => { e.preventDefault(); touchRef.current.left = true }
        const onLeftEnd = (e: Event) => { e.preventDefault(); touchRef.current.left = false }
        const onJumpStart = (e: Event) => { e.preventDefault(); touchRef.current.jump = true }
        const onJumpEnd = (e: Event) => { e.preventDefault(); touchRef.current.jump = false }
        const onRightStart = (e: Event) => { e.preventDefault(); touchRef.current.right = true }
        const onRightEnd = (e: Event) => { e.preventDefault(); touchRef.current.right = false }
        const onCtx = (e: Event) => e.preventDefault()

        leftBtn?.addEventListener('touchstart', onLeftStart, opts); leftBtn?.addEventListener('touchend', onLeftEnd, opts); leftBtn?.addEventListener('contextmenu', onCtx)
        jumpBtn?.addEventListener('touchstart', onJumpStart, opts); jumpBtn?.addEventListener('touchend', onJumpEnd, opts); jumpBtn?.addEventListener('contextmenu', onCtx)
        rightBtn?.addEventListener('touchstart', onRightStart, opts); rightBtn?.addEventListener('touchend', onRightEnd, opts); rightBtn?.addEventListener('contextmenu', onCtx)

        return () => {
            leftBtn?.removeEventListener('touchstart', onLeftStart); leftBtn?.removeEventListener('touchend', onLeftEnd)
            jumpBtn?.removeEventListener('touchstart', onJumpStart); jumpBtn?.removeEventListener('touchend', onJumpEnd)
            rightBtn?.removeEventListener('touchstart', onRightStart); rightBtn?.removeEventListener('touchend', onRightEnd)
        }
    }, [])

    // ── Main Game Loop ──
    const gameLoop = useCallback(() => {
        if (gameState !== 'playing') return;

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const p = playerRef.current
        const keys = keysRef.current
        const level = levelRef.current
        const cam = cameraRef.current

        // ── Physics & Input ──
        if (keys.has('arrowleft') || keys.has('a')) {
            p.vx = -MOVE_SPEED; p.facing = 'left'
        } else if (keys.has('arrowright') || keys.has('d')) {
            p.vx = MOVE_SPEED; p.facing = 'right'
        } else {
            p.vx *= 0.9 // Friction in space
            if (Math.abs(p.vx) < 0.1) p.vx = 0
        }

        if (keys.has('arrowup') || keys.has('w') || keys.has(' ')) {
            p.vy -= JETPACK_FORCE
            p.jetpackActive = true
        } else {
            p.jetpackActive = false
        }

        p.vy += GRAVITY
        if (p.vy > MAX_FALL_SPEED) p.vy = MAX_FALL_SPEED
        
        p.x += p.vx
        p.y += p.vy

        // World Bounds
        if (p.x < 0) { p.x = 0; p.vx = 0 }
        if (p.x > WORLD_WIDTH - p.width) { p.x = WORLD_WIDTH - p.width; p.vx = 0 }
        
        // Ceiling
        if (p.y < 0) { p.y = 0; p.vy = 0 }

        // Fall Death (Respawn)
        if (p.y > CANVAS_H + 50) {
            p.y = -50
            p.x = Math.max(0, p.x - 200) // move back slightly
            p.vy = 0
        }

        // ── Platform Collision ──
        p.onGround = false
        for (const plat of level.platforms) {
            if (
                p.x + p.width > plat.x && p.x < plat.x + plat.width &&
                p.y + p.height >= plat.y && p.y + p.height <= plat.y + plat.height + 10 &&
                p.vy >= 0
            ) {
                p.y = plat.y - p.height
                p.vy = 0
                p.onGround = true
            }
        }

        // ── Collectibles (Technology Nodes) ──
        let newDiscovery = false;
        for (const c of level.collectibles) {
            if (c.collected) continue
            const dx = (p.x + p.width / 2) - (c.x + c.size / 2)
            const dy = (p.y + p.height / 2) - (c.y + c.size / 2)
            if (Math.sqrt(dx * dx + dy * dy) < 40) {
                c.collected = true
                newDiscovery = true
                setDiscoveredSkills(prev => {
                    const next = [...prev, c.label]
                    if (next.length === totalSkills) {
                        setTimeout(() => setGameState('won'), 1500)
                    }
                    return next
                })
                setLastDiscovered({label: c.label, group: c.group, color: c.color})
                setScanOverlay(true)
                setTimeout(() => setScanOverlay(false), 2000)
            }
        }

        // ── Camera ──
        const targetCam = p.x - CANVAS_W / 3
        cameraRef.current += (targetCam - cam) * 0.1
        if (cameraRef.current < 0) cameraRef.current = 0
        if (cameraRef.current > WORLD_WIDTH - CANVAS_W) cameraRef.current = WORLD_WIDTH - CANVAS_W
        const newCam = cameraRef.current

        // ── Particles ──
        if (p.jetpackActive) {
            for(let i=0; i<2; i++) {
                p.particles.push({
                    x: p.x + p.width / 2 + (Math.random() - 0.5) * 8,
                    y: p.y + p.height,
                    vx: (Math.random() - 0.5) * 1,
                    vy: Math.random() * 2 + 1,
                    life: 0,
                    maxLife: 15 + Math.random() * 10
                })
            }
        }
        for (let i = p.particles.length - 1; i >= 0; i--) {
            const pt = p.particles[i]
            pt.x += pt.vx
            pt.y += pt.vy
            pt.life++
            if (pt.life >= pt.maxLife) p.particles.splice(i, 1)
        }

        // ══════════════ DRAW ══════════════
        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

        // Draw Parallax Stars
        starsRef.current.forEach(star => {
            star.x -= star.speed
            if (star.x < 0) star.x = CANVAS_W
            ctx.globalAlpha = star.alpha
            ctx.fillStyle = '#ffffff'
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
            ctx.fill()
        })
        ctx.globalAlpha = 1.0

        // Draw Platforms
        for (const plat of level.platforms) {
            const px = plat.x - newCam
            if (px > CANVAS_W + 20 || px + plat.width < -20) continue

            if (plat.type === 'station') {
                ctx.fillStyle = plat.color
                ctx.beginPath()
                ctx.roundRect(px, plat.y, plat.width, plat.height, [8, 8, 0, 0])
                ctx.fill()
                // Tech line
                ctx.fillStyle = '#3b82f6'
                ctx.fillRect(px, plat.y, plat.width, 2)
            } else {
                // Asteroid
                ctx.fillStyle = plat.color
                ctx.beginPath()
                ctx.roundRect(px, plat.y, plat.width, plat.height, 6)
                ctx.fill()
            }
        }

        // Draw Nodes
        for (const c of level.collectibles) {
            if (c.collected) continue
            const cx = c.x - newCam
            if (cx > CANVAS_W + 40 || cx < -40) continue

            const bobY = c.y + Math.sin(Date.now() * 0.002 + c.x) * 6

            // Glow Ring
            ctx.shadowColor = c.color
            ctx.shadowBlur = 15
            ctx.strokeStyle = c.color
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(cx + c.size/2, bobY + c.size/2, c.size/2, 0, Math.PI * 2)
            ctx.stroke()
            ctx.shadowBlur = 0

            // Inner Core
            ctx.fillStyle = c.color
            ctx.beginPath()
            ctx.arc(cx + c.size/2, bobY + c.size/2, c.size/4, 0, Math.PI * 2)
            ctx.fill()

            // Label
            ctx.fillStyle = 'rgba(255,255,255,0.7)'
            ctx.font = '9px monospace'
            ctx.textAlign = 'center'
            ctx.fillText(c.label, cx + c.size / 2, bobY - 10)
        }

        // Draw Player (Drone)
        const px = p.x - newCam
        const py = p.y
        
        ctx.save()
        if (p.facing === 'left') {
            ctx.translate(px + p.width / 2, 0)
            ctx.scale(-1, 1)
            ctx.translate(-(px + p.width / 2), 0)
        }

        // Particles
        p.particles.forEach(pt => {
            const ptx = pt.x - newCam
            const alpha = 1 - (pt.life / pt.maxLife)
            ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`
            ctx.beginPath()
            ctx.arc(ptx, pt.y, 2, 0, Math.PI * 2)
            ctx.fill()
        })

        // Body
        ctx.fillStyle = '#e2e8f0'
        ctx.beginPath()
        ctx.roundRect(px, py, p.width, p.height, 6)
        ctx.fill()

        // Jetpack Backpack
        ctx.fillStyle = '#94a3b8'
        ctx.beginPath()
        ctx.roundRect(px - 4, py + 4, 6, 20, 2)
        ctx.fill()

        // Visor
        ctx.shadowColor = '#60a5fa'
        ctx.shadowBlur = 10
        ctx.fillStyle = '#3b82f6'
        ctx.beginPath()
        ctx.roundRect(px + 12, py + 6, 14, 8, 3)
        ctx.fill()
        ctx.shadowBlur = 0

        // Thruster glow
        if (p.jetpackActive) {
            ctx.shadowColor = '#3b82f6'
            ctx.shadowBlur = 15
            ctx.fillStyle = '#60a5fa'
            ctx.beginPath()
            ctx.moveTo(px + 4, py + p.height)
            ctx.lineTo(px + p.width - 4, py + p.height)
            ctx.lineTo(px + p.width / 2, py + p.height + 12)
            ctx.fill()
            ctx.shadowBlur = 0
        }

        ctx.restore()

        animRef.current = requestAnimationFrame(gameLoop)
    }, [gameState, totalSkills])

    // ── Loop Lifecycle ──
    useEffect(() => {
        if (gameState === 'playing') {
            animRef.current = requestAnimationFrame(gameLoop)
        }
        return () => cancelAnimationFrame(animRef.current)
    }, [gameState, gameLoop])

    // ── UI Components ──
    return (
        <div className="flex flex-col items-center w-full relative">
            
            {/* Top HUD (Persistent) */}
            {gameState === 'playing' && (
                <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start pointer-events-none">
                    <div className="bg-black/50 backdrop-blur-md border border-white/10 p-3 rounded-lg flex flex-col">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Mission Progress</span>
                        <span className="text-xs font-mono text-blue-400 font-bold">{discoveredSkills.length} / {totalSkills} SECTORS MAPPED</span>
                        <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${(discoveredSkills.length / totalSkills) * 100}%`}} />
                        </div>
                    </div>

                    <button 
                        onClick={() => setGameState('map')}
                        className="pointer-events-auto bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 p-2.5 rounded-lg flex items-center space-x-2 text-blue-400 transition-colors backdrop-blur-md"
                    >
                        <Map className="w-4 h-4" />
                        <span className="text-[10px] font-mono tracking-widest uppercase hidden sm:block">Galactic Map</span>
                    </button>
                </div>
            )}

            {/* Discovery Scan Overlay */}
            <AnimatePresence>
                {scanOverlay && lastDiscovered && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="absolute top-24 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-xl border border-blue-500/50 p-4 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] text-center w-64 pointer-events-none"
                    >
                        <Crosshair className="w-6 h-6 text-blue-400 mx-auto mb-2 animate-spin-slow" />
                        <p className="text-[10px] font-mono text-blue-400 tracking-[0.2em] mb-1">NEW SECTOR DISCOVERED</p>
                        <h3 className="text-lg font-bold text-white tracking-widest uppercase" style={{ color: lastDiscovered.color }}>{lastDiscovered.label}</h3>
                        <p className="text-[10px] font-mono text-gray-400 mt-1">{lastDiscovered.group}</p>
                        <div className="mt-2 text-[9px] font-mono text-green-400 bg-green-500/10 py-1 rounded inline-block px-2">STATUS: MAPPED</div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Canvas Container */}
            <div
                className="relative rounded-2xl overflow-hidden border border-white/10 w-full max-w-[900px] bg-[#050510]"
                style={{ boxShadow: '0 0 50px rgba(0,0,0,0.5)', aspectRatio: '2/1' }}
            >
                <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    className="w-full h-full block"
                />

                {/* ── Overlays ── */}

                {/* Main Menu */}
                {gameState === 'menu' && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-50">
                        <Rocket className="w-12 h-12 text-blue-500 mb-4" />
                        <p className="text-xl sm:text-2xl font-mono font-bold text-white mb-2 tracking-[0.2em] text-center px-4">TECHNOLOGY EXPLORATION SIMULATOR</p>
                        <p className="text-gray-400 text-xs sm:text-sm mb-8 font-mono tracking-widest text-center px-4">Pilot Drone A-01 • Discover {totalSkills} Technology Sectors</p>
                        
                        <motion.button
                            onClick={startGame}
                            className="px-8 py-3 rounded text-white font-mono text-xs tracking-widest font-bold border border-blue-500 hover:bg-blue-500/20 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            INITIATE EXPLORATION PROTOCOL
                        </motion.button>
                        
                        <div className="mt-8 flex gap-8 text-gray-500 text-[10px] font-mono tracking-widest text-center hidden md:flex">
                            <span>A / D or ← → TO NAVIGATE</span>
                            <span>W / SPACE TO ENGAGE THRUSTERS</span>
                        </div>
                    </div>
                )}

                {/* Mission Accomplished */}
                {gameState === 'won' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md z-50 p-6 text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mb-6">
                            <Map className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-2xl font-mono font-bold text-green-400 mb-2 tracking-[0.2em]">MISSION ACCOMPLISHED</p>
                        <p className="text-white text-sm mb-4 font-mono tracking-widest">ALL {totalSkills} TECHNOLOGY SECTORS MAPPED</p>
                        <p className="text-gray-400 text-[10px] mb-8 font-mono tracking-widest bg-white/5 py-2 px-4 rounded border border-white/10">GALAXY EXPLORATION: 100% | COMMANDER CERTIFICATION GRANTED</p>
                        
                        <div className="flex gap-4">
                            <motion.button
                                onClick={() => setGameState('map')}
                                className="px-6 py-3 rounded text-black bg-green-500 font-mono text-[10px] tracking-widest font-bold hover:bg-green-400 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                VIEW GALACTIC MAP
                            </motion.button>
                            <motion.button
                                onClick={startGame}
                                className="px-6 py-3 rounded text-white border border-white/20 font-mono text-[10px] tracking-widest hover:bg-white/10 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                RESTART MISSION
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Galactic Systems Map */}
                <AnimatePresence>
                    {gameState === 'map' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 bg-[#020205] z-[100] flex flex-col overflow-hidden"
                        >
                            <div className="absolute top-4 left-4 z-10 flex flex-col">
                                <h3 className="text-blue-400 font-mono tracking-[0.2em] text-sm font-bold">GALACTIC SYSTEMS MAP</h3>
                                <p className="text-[10px] font-mono text-gray-500 tracking-widest">{discoveredSkills.length} / {totalSkills} SECTORS ONLINE</p>
                            </div>
                            
                            <button 
                                onClick={() => setGameState(discoveredSkills.length === totalSkills ? 'won' : 'playing')}
                                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white p-2 bg-white/5 rounded-full backdrop-blur-md"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Constellation Network */}
                            <div className="flex-1 relative w-full h-full p-8 sm:p-12">
                                <div className="absolute inset-8 sm:inset-16">
                                    {/* Draw Connections */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                        {CONNECTIONS.map(([a, b], i) => {
                                            const nodeA = MAP_NODES[a]
                                            const nodeB = MAP_NODES[b]
                                            if (!nodeA || !nodeB) return null
                                            const active = discoveredSkills.includes(a) && discoveredSkills.includes(b)
                                            return (
                                                <line 
                                                    key={i}
                                                    x1={`${nodeA.x}%`} y1={`${nodeA.y}%`}
                                                    x2={`${nodeB.x}%`} y2={`${nodeB.y}%`}
                                                    stroke={active ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.05)'}
                                                    strokeWidth={active ? 2 : 1}
                                                    strokeDasharray={active ? 'none' : '4 4'}
                                                />
                                            )
                                        })}
                                    </svg>

                                    {/* Draw Nodes */}
                                    {SKILL_ITEMS.map((skill) => {
                                        const pos = MAP_NODES[skill.label]
                                        if (!pos) return null
                                        const discovered = discoveredSkills.includes(skill.label)
                                        
                                        return (
                                            <div 
                                                key={skill.label}
                                                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-default"
                                                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                                            >
                                                <div 
                                                    className="w-3 h-3 rounded-full transition-all duration-500"
                                                    style={{ 
                                                        backgroundColor: discovered ? skill.color : '#1e293b',
                                                        boxShadow: discovered ? `0 0 15px ${skill.color}` : 'none',
                                                        border: `1px solid ${discovered ? 'transparent' : '#334155'}`
                                                    }}
                                                />
                                                <span 
                                                    className="absolute top-4 text-[8px] sm:text-[10px] font-mono tracking-widest whitespace-nowrap transition-colors duration-500"
                                                    style={{ color: discovered ? '#e2e8f0' : '#475569' }}
                                                >
                                                    {skill.label}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            
                            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                                <p className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">CONSTELLATION NETWORK: LIVE</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* Mobile touch controls */}
            <div className="flex justify-between w-full max-w-[900px] mt-6 md:hidden px-4 select-none" style={{ touchAction: 'none', WebkitUserSelect: 'none' }}>
                <div className="flex gap-4">
                    <button
                        ref={leftBtnRef}
                        className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center active:bg-blue-500/20 active:text-blue-400 active:border-blue-500/50 transition-colors"
                        style={{ touchAction: 'manipulation' }}
                    >
                        <ChevronRight className="w-8 h-8 rotate-180" />
                    </button>
                    <button
                        ref={rightBtnRef}
                        className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center active:bg-blue-500/20 active:text-blue-400 active:border-blue-500/50 transition-colors"
                        style={{ touchAction: 'manipulation' }}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>
                <button
                    ref={jumpBtnRef}
                    className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center active:bg-blue-500/40 transition-colors"
                    style={{ touchAction: 'manipulation' }}
                >
                    <Rocket className="w-6 h-6" />
                </button>
            </div>
            
            <p className="text-gray-600 text-[10px] font-mono tracking-widest mt-6 text-center hidden md:block">
                EXPLORATION CONTROLS: ARROW KEYS / WASD TO NAVIGATE • SPACE TO ENGAGE THRUSTERS
            </p>
        </div>
    )
}
