'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

// ─── Types ───────────────────────────────────────────────
interface Player {
    x: number; y: number; vy: number; vx: number
    width: number; height: number
    onGround: boolean; facing: 'left' | 'right'
    frame: number; frameTimer: number
}

interface Platform {
    x: number; y: number; width: number; height: number
    color: string; label?: string
}

interface Collectible {
    x: number; y: number; size: number
    label: string; color: string; collected: boolean
}

interface Enemy {
    x: number; y: number; width: number; height: number
    vx: number; emoji: string; alive: boolean
}

// ─── Skill data (from constants) ─────────────────────────
const SKILL_ITEMS = [
    { label: 'React', color: '#61DAFB' },
    { label: 'Next.js', color: '#FFFFFF' },
    { label: 'Node', color: '#3C873A' },
    { label: 'TypeScript', color: '#3178C6' },
    { label: 'MongoDB', color: '#47A248' },
    { label: 'Docker', color: '#2496ED' },
    { label: 'AWS', color: '#FF9900' },
    { label: 'Go', color: '#00ADD8' },
    { label: 'Redis', color: '#DC382D' },
    { label: 'K8s', color: '#326CE5' },
    { label: 'GraphQL', color: '#E10098' },
    { label: 'PHP', color: '#777BB4' },
    { label: 'Git', color: '#F05032' },
    { label: 'Azure', color: '#0078D4' },
    { label: 'Tailwind', color: '#38BDF8' },
    { label: 'Express', color: '#68A063' },
    { label: 'MySQL', color: '#4479A1' },
    { label: 'PostgreSQL', color: '#336791' },
    { label: 'GCP', color: '#4285F4' },
    { label: 'NestJS', color: '#E0234E' },
]

const CANVAS_W = 800
const CANVAS_H = 400
const GRAVITY = 0.6
const JUMP_FORCE = -12
const MOVE_SPEED = 4
const WORLD_WIDTH = 4800 // scrollable world

// ─── Level generator ─────────────────────────────────────
function generateLevel() {
    const platforms: Platform[] = []
    const collectibles: Collectible[] = []
    const enemies: Enemy[] = []

    // Ground segments with gaps
    const groundY = CANVAS_H - 40
    let gx = 0
    while (gx < WORLD_WIDTH) {
        const segW = 200 + Math.random() * 300
        platforms.push({ x: gx, y: groundY, width: segW, height: 40, color: '#1e3a5f' })
        gx += segW + (Math.random() > 0.7 ? 80 + Math.random() * 60 : 0) // sometimes a gap
    }

    // Floating platforms with skill labels
    const categories = [
        { name: 'Frontend', color: '#10b981' },
        { name: 'Backend', color: '#8b5cf6' },
        { name: 'Cloud', color: '#f59e0b' },
        { name: 'DevOps', color: '#ec4899' },
        { name: 'Database', color: '#ef4444' },
        { name: 'Tools', color: '#6366f1' },
    ]
    for (let i = 0; i < 20; i++) {
        const cat = categories[i % categories.length]
        platforms.push({
            x: 300 + i * 220 + Math.random() * 60,
            y: 160 + Math.random() * 140,
            width: 100 + Math.random() * 80,
            height: 16,
            color: cat.color,
            label: cat.name,
        })
    }

    // Place skill collectibles on/above platforms
    SKILL_ITEMS.forEach((skill, i) => {
        const px = 250 + i * 230 + Math.random() * 40
        const py = 100 + Math.random() * 180
        collectibles.push({
            x: px, y: py, size: 24,
            label: skill.label, color: skill.color, collected: false,
        })
    })

    // Enemies (bugs to stomp!)
    const bugEmojis = ['🐛', '🪲', '🐞', '💀', '👾']
    for (let i = 0; i < 12; i++) {
        enemies.push({
            x: 500 + i * 380,
            y: groundY - 28,
            width: 28, height: 28,
            vx: (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random()),
            emoji: bugEmojis[i % bugEmojis.length],
            alive: true,
        })
    }

    return { platforms, collectibles, enemies }
}

// ─── Component ───────────────────────────────────────────
export default function MarioGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [collected, setCollected] = useState(0)
    const [totalSkills] = useState(SKILL_ITEMS.length)
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'won' | 'dead'>('menu')
    const [highScore, setHighScore] = useState(0)

    const playerRef = useRef<Player>({
        x: 80, y: 200, vy: 0, vx: 0,
        width: 28, height: 36,
        onGround: false, facing: 'right',
        frame: 0, frameTimer: 0,
    })
    const keysRef = useRef<Set<string>>(new Set())
    const cameraRef = useRef(0)
    const levelRef = useRef(generateLevel())
    const animRef = useRef(0)
    const scoreRef = useRef(0)
    const collectedRef = useRef(0)

    useEffect(() => {
        const s = localStorage.getItem('mario-highscore')
        if (s) setHighScore(parseInt(s))
    }, [])

    const startGame = useCallback(() => {
        playerRef.current = {
            x: 80, y: 200, vy: 0, vx: 0,
            width: 28, height: 36,
            onGround: false, facing: 'right',
            frame: 0, frameTimer: 0,
        }
        cameraRef.current = 0
        scoreRef.current = 0
        collectedRef.current = 0
        setScore(0)
        setCollected(0)
        levelRef.current = generateLevel()
        setGameState('playing')
    }, [])

    // ── Draw helpers ──
    const drawPlayer = useCallback((ctx: CanvasRenderingContext2D, p: Player, cam: number) => {
        const sx = p.x - cam
        const sy = p.y

        ctx.save()
        if (p.facing === 'left') {
            ctx.translate(sx + p.width / 2, 0)
            ctx.scale(-1, 1)
            ctx.translate(-(sx + p.width / 2), 0)
        }

        // Body
        ctx.fillStyle = '#667eea'
        ctx.beginPath()
        ctx.roundRect(sx + 4, sy + 10, 20, 22, 4)
        ctx.fill()

        // Head
        ctx.fillStyle = '#fbbf24'
        ctx.beginPath()
        ctx.arc(sx + 14, sy + 8, 10, 0, Math.PI * 2)
        ctx.fill()

        // Eyes
        ctx.fillStyle = '#1e293b'
        ctx.fillRect(sx + 11, sy + 5, 3, 4)
        ctx.fillRect(sx + 17, sy + 5, 3, 4)

        // Hat (code bracket)
        ctx.fillStyle = '#764ba2'
        ctx.beginPath()
        ctx.roundRect(sx + 4, sy - 4, 20, 8, 3)
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 8px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('{ }', sx + 14, sy + 2)

        // Legs animation
        const legOffset = p.onGround ? Math.sin(p.frameTimer * 0.3) * 4 : 4
        ctx.fillStyle = '#1e3a5f'
        ctx.fillRect(sx + 6, sy + 30, 6, 6 + legOffset)
        ctx.fillRect(sx + 16, sy + 30, 6, 6 - legOffset)

        ctx.restore()
    }, [])

    // ── Main game loop ──
    const gameLoop = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const p = playerRef.current
        const keys = keysRef.current
        const level = levelRef.current
        const cam = cameraRef.current

        // ── Input ──
        if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) {
            p.vx = -MOVE_SPEED; p.facing = 'left'
        } else if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) {
            p.vx = MOVE_SPEED; p.facing = 'right'
        } else {
            p.vx *= 0.85
            if (Math.abs(p.vx) < 0.2) p.vx = 0
        }

        if ((keys.has('ArrowUp') || keys.has('w') || keys.has('W') || keys.has(' ')) && p.onGround) {
            p.vy = JUMP_FORCE
            p.onGround = false
        }

        // ── Physics ──
        p.vy += GRAVITY
        p.x += p.vx
        p.y += p.vy

        // Clamp to world
        if (p.x < 0) p.x = 0
        if (p.x > WORLD_WIDTH - p.width) p.x = WORLD_WIDTH - p.width

        // Fall death
        if (p.y > CANVAS_H + 60) {
            setGameState('dead')
            if (scoreRef.current > highScore) {
                setHighScore(scoreRef.current)
                localStorage.setItem('mario-highscore', scoreRef.current.toString())
            }
            return
        }

        // ── Platform collision ──
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

        // ── Collectibles ──
        for (const c of level.collectibles) {
            if (c.collected) continue
            const dx = (p.x + p.width / 2) - (c.x + c.size / 2)
            const dy = (p.y + p.height / 2) - (c.y + c.size / 2)
            if (Math.sqrt(dx * dx + dy * dy) < 30) {
                c.collected = true
                scoreRef.current += 100
                collectedRef.current++
                setScore(scoreRef.current)
                setCollected(collectedRef.current)

                if (collectedRef.current >= totalSkills) {
                    setGameState('won')
                    if (scoreRef.current > highScore) {
                        setHighScore(scoreRef.current)
                        localStorage.setItem('mario-highscore', scoreRef.current.toString())
                    }
                    return
                }
            }
        }

        // ── Enemies ──
        for (const e of level.enemies) {
            if (!e.alive) continue
            e.x += e.vx

            // Reverse at bounds
            const onPlatform = level.platforms.some(
                pl => e.x + e.width > pl.x && e.x < pl.x + pl.width && Math.abs((e.y + e.height) - pl.y) < 5
            )
            if (!onPlatform || e.x < 0 || e.x > WORLD_WIDTH) e.vx *= -1

            // Player collision
            if (
                p.x + p.width > e.x && p.x < e.x + e.width &&
                p.y + p.height > e.y && p.y < e.y + e.height
            ) {
                if (p.vy > 0 && p.y + p.height < e.y + e.height / 2 + 5) {
                    // Stomp!
                    e.alive = false
                    p.vy = JUMP_FORCE * 0.5
                    scoreRef.current += 200
                    setScore(scoreRef.current)
                } else {
                    // Hit by enemy
                    setGameState('dead')
                    if (scoreRef.current > highScore) {
                        setHighScore(scoreRef.current)
                        localStorage.setItem('mario-highscore', scoreRef.current.toString())
                    }
                    return
                }
            }
        }

        // ── Camera ──
        const targetCam = p.x - CANVAS_W / 3
        cameraRef.current += (targetCam - cam) * 0.08
        if (cameraRef.current < 0) cameraRef.current = 0
        if (cameraRef.current > WORLD_WIDTH - CANVAS_W) cameraRef.current = WORLD_WIDTH - CANVAS_W
        const newCam = cameraRef.current

        // ── Animation frame counter ──
        if (Math.abs(p.vx) > 0.3) p.frameTimer++

        // ══════════════ DRAW ══════════════
        // Sky gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H)
        skyGrad.addColorStop(0, '#0a0f1c')
        skyGrad.addColorStop(0.6, '#111827')
        skyGrad.addColorStop(1, '#1e293b')
        ctx.fillStyle = skyGrad
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

        // Parallax stars
        ctx.fillStyle = 'rgba(255,255,255,0.3)'
        for (let i = 0; i < 40; i++) {
            const sx = ((i * 127 + 50) % (WORLD_WIDTH * 0.6)) - newCam * 0.2
            const sy = (i * 73 + 30) % (CANVAS_H * 0.6)
            if (sx > -5 && sx < CANVAS_W + 5) {
                ctx.beginPath()
                ctx.arc(sx, sy, 1 + (i % 3) * 0.5, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Parallax mountains
        ctx.fillStyle = 'rgba(102, 126, 234, 0.06)'
        ctx.beginPath()
        ctx.moveTo(0, CANVAS_H)
        for (let x = 0; x <= CANVAS_W; x += 60) {
            const worldX = x + newCam * 0.3
            ctx.lineTo(x, CANVAS_H - 80 - Math.sin(worldX * 0.003) * 40 - Math.cos(worldX * 0.007) * 25)
        }
        ctx.lineTo(CANVAS_W, CANVAS_H)
        ctx.fill()

        // Platforms
        for (const plat of level.platforms) {
            const px = plat.x - newCam
            if (px > CANVAS_W + 20 || px + plat.width < -20) continue

            ctx.fillStyle = plat.color
            ctx.beginPath()
            ctx.roundRect(px, plat.y, plat.width, plat.height, plat.height > 20 ? 0 : 6)
            ctx.fill()

            // Platform label
            if (plat.label) {
                ctx.fillStyle = 'rgba(255,255,255,0.5)'
                ctx.font = '9px sans-serif'
                ctx.textAlign = 'center'
                ctx.fillText(plat.label, px + plat.width / 2, plat.y - 4)
            }

            // Neon edge glow
            if (plat.height <= 20) {
                ctx.shadowColor = plat.color
                ctx.shadowBlur = 8
                ctx.strokeStyle = plat.color
                ctx.lineWidth = 1
                ctx.strokeRect(px, plat.y, plat.width, plat.height)
                ctx.shadowBlur = 0
            }
        }

        // Collectibles
        for (const c of level.collectibles) {
            if (c.collected) continue
            const cx = c.x - newCam
            if (cx > CANVAS_W + 20 || cx < -20) continue

            const bobY = c.y + Math.sin(Date.now() * 0.004 + c.x) * 4

            // Glow
            ctx.shadowColor = c.color
            ctx.shadowBlur = 12
            ctx.fillStyle = c.color
            ctx.beginPath()
            ctx.roundRect(cx, bobY, c.size, c.size, 6)
            ctx.fill()
            ctx.shadowBlur = 0

            // Label
            ctx.fillStyle = '#000'
            ctx.font = 'bold 7px monospace'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(c.label, cx + c.size / 2, bobY + c.size / 2)
            ctx.textBaseline = 'alphabetic'
        }

        // Enemies
        for (const e of level.enemies) {
            if (!e.alive) continue
            const ex = e.x - newCam
            if (ex > CANVAS_W + 20 || ex < -20) continue

            ctx.font = `${e.width}px serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(e.emoji, ex + e.width / 2, e.y + e.height / 2)
            ctx.textBaseline = 'alphabetic'
        }

        // Player
        drawPlayer(ctx, p, newCam)

        // HUD
        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.beginPath()
        ctx.roundRect(8, 8, 180, 32, 8)
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 12px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(`⭐ ${scoreRef.current}`, 16, 28)
        ctx.fillStyle = '#60a5fa'
        ctx.fillText(`Skills: ${collectedRef.current}/${totalSkills}`, 80, 28)

        animRef.current = requestAnimationFrame(gameLoop)
    }, [drawPlayer, totalSkills, highScore])

    // ── Start / stop loop ──
    useEffect(() => {
        if (gameState === 'playing') {
            animRef.current = requestAnimationFrame(gameLoop)
        }
        return () => cancelAnimationFrame(animRef.current)
    }, [gameState, gameLoop])

    // ── Keyboard (skip when inside input/textarea) ──
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement)?.tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA') return
            keysRef.current.add(e.key)
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault()
        }
        const up = (e: KeyboardEvent) => keysRef.current.delete(e.key)
        window.addEventListener('keydown', down)
        window.addEventListener('keyup', up)
        return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
    }, [])

    // ── Touch controls ──
    const touchRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({ left: false, right: false, jump: false })
    const leftBtnRef = useRef<HTMLButtonElement>(null)
    const jumpBtnRef = useRef<HTMLButtonElement>(null)
    const rightBtnRef = useRef<HTMLButtonElement>(null)

    // Sync touch state to keys
    useEffect(() => {
        const interval = setInterval(() => {
            if (gameState !== 'playing') return
            const t = touchRef.current
            if (t.left) keysRef.current.add('ArrowLeft')
            else keysRef.current.delete('ArrowLeft')
            if (t.right) keysRef.current.add('ArrowRight')
            else keysRef.current.delete('ArrowRight')
            if (t.jump) { keysRef.current.add('ArrowUp'); t.jump = false }
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
        const onRightStart = (e: Event) => { e.preventDefault(); touchRef.current.right = true }
        const onRightEnd = (e: Event) => { e.preventDefault(); touchRef.current.right = false }
        const onCtx = (e: Event) => e.preventDefault()

        leftBtn?.addEventListener('touchstart', onLeftStart, opts)
        leftBtn?.addEventListener('touchend', onLeftEnd, opts)
        leftBtn?.addEventListener('contextmenu', onCtx)
        jumpBtn?.addEventListener('touchstart', onJumpStart, opts)
        jumpBtn?.addEventListener('contextmenu', onCtx)
        rightBtn?.addEventListener('touchstart', onRightStart, opts)
        rightBtn?.addEventListener('touchend', onRightEnd, opts)
        rightBtn?.addEventListener('contextmenu', onCtx)

        return () => {
            leftBtn?.removeEventListener('touchstart', onLeftStart)
            leftBtn?.removeEventListener('touchend', onLeftEnd)
            leftBtn?.removeEventListener('contextmenu', onCtx)
            jumpBtn?.removeEventListener('touchstart', onJumpStart)
            jumpBtn?.removeEventListener('contextmenu', onCtx)
            rightBtn?.removeEventListener('touchstart', onRightStart)
            rightBtn?.removeEventListener('touchend', onRightEnd)
            rightBtn?.removeEventListener('contextmenu', onCtx)
        }
    }, [])

    return (
        <div className="flex flex-col items-center w-full">
            <div
                className="relative rounded-xl overflow-hidden border border-blue-500/20 w-full max-w-[800px]"
                style={{ boxShadow: '0 0 40px rgba(102, 126, 234, 0.15)', aspectRatio: '2/1' }}
            >
                <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    className="w-full h-full"
                    style={{ imageRendering: 'pixelated' }}
                />

                {/* Menu overlay */}
                {gameState === 'menu' && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm">
                        <p className="text-3xl font-bold text-white mb-1">🏃 Skill Runner</p>
                        <p className="text-gray-400 text-sm mb-1">A Mario-style platformer</p>
                        <p className="text-blue-400 text-xs mb-5">Collect all {totalSkills} tech skills to win!</p>
                        <motion.button
                            onClick={startGame}
                            className="px-8 py-3 rounded-xl text-white font-bold text-lg"
                            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ▶ Play
                        </motion.button>
                        <div className="mt-4 text-gray-500 text-xs space-y-1 text-center">
                            <p>← → or A/D to move • ↑ or W or Space to jump</p>
                            <p>Stomp 🐛 bugs • Collect all skill icons • Don&apos;t fall!</p>
                            {highScore > 0 && <p className="text-purple-400">Best: ⭐ {highScore}</p>}
                        </div>
                    </div>
                )}

                {/* Death overlay */}
                {gameState === 'dead' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm"
                    >
                        <p className="text-2xl font-bold text-red-400 mb-1">💀 Game Over</p>
                        <p className="text-gray-400 text-sm mb-1">Score: ⭐ {score}</p>
                        <p className="text-blue-400 text-xs mb-4">Skills: {collected}/{totalSkills}</p>
                        <motion.button
                            onClick={startGame}
                            className="px-6 py-2.5 rounded-xl text-white font-bold"
                            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Try Again
                        </motion.button>
                    </motion.div>
                )}

                {/* Win overlay */}
                {gameState === 'won' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm"
                    >
                        <p className="text-3xl font-bold text-green-400 mb-1">🎉 You Win!</p>
                        <p className="text-white text-lg mb-1">All {totalSkills} skills collected!</p>
                        <p className="text-yellow-400 text-sm mb-4">Score: ⭐ {score}</p>
                        <motion.button
                            onClick={startGame}
                            className="px-6 py-2.5 rounded-xl text-white font-bold"
                            style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Play Again
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* Mobile touch controls */}
            <div className="flex gap-3 mt-4 md:hidden select-none" style={{ touchAction: 'none', WebkitUserSelect: 'none' }}>
                <button
                    ref={leftBtnRef}
                    className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 text-2xl flex items-center justify-center active:bg-blue-500/30 select-none"
                    style={{ touchAction: 'manipulation', WebkitUserSelect: 'none' }}
                >
                    ←
                </button>
                <button
                    ref={jumpBtnRef}
                    className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 text-2xl flex items-center justify-center active:bg-blue-500/30 select-none"
                    style={{ touchAction: 'manipulation', WebkitUserSelect: 'none' }}
                >
                    ↑
                </button>
                <button
                    ref={rightBtnRef}
                    className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 text-2xl flex items-center justify-center active:bg-blue-500/30 select-none"
                    style={{ touchAction: 'manipulation', WebkitUserSelect: 'none' }}
                >
                    →
                </button>
            </div>

            <p className="text-gray-500 text-xs mt-3 text-center">
                Arrow keys / WASD to move & jump • Stomp bugs for bonus points
            </p>
        </div>
    )
}

