'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const CELL_SIZE = 20
const GRID_W = 20
const GRID_H = 15
const INITIAL_SPEED = 120

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Point = { x: number; y: number }

const TECH_EMOJIS = ['⚛️', '🟢', '📦', '🐳', '☁️', '🔧', '🧩', '⚡️', '🎯', '💎']

export default function SnakeGame({ onClose }: { onClose: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [started, setStarted] = useState(false)

    const snakeRef = useRef<Point[]>([{ x: 10, y: 7 }])
    const dirRef = useRef<Direction>('RIGHT')
    const nextDirRef = useRef<Direction>('RIGHT')
    const foodRef = useRef<Point>({ x: 15, y: 7 })
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const scoreRef = useRef(0)

    useEffect(() => {
        const saved = localStorage.getItem('snake-highscore')
        if (saved) setHighScore(parseInt(saved))
    }, [])

    const spawnFood = useCallback(() => {
        const snake = snakeRef.current
        let pos: Point
        do {
            pos = { x: Math.floor(Math.random() * GRID_W), y: Math.floor(Math.random() * GRID_H) }
        } while (snake.some(s => s.x === pos.x && s.y === pos.y))
        foodRef.current = pos
    }, [])

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const w = GRID_W * CELL_SIZE
        const h = GRID_H * CELL_SIZE

        // Background
        ctx.fillStyle = '#0a0f1c'
        ctx.fillRect(0, 0, w, h)

        // Grid
        ctx.strokeStyle = 'rgba(102, 126, 234, 0.06)'
        ctx.lineWidth = 0.5
        for (let x = 0; x <= GRID_W; x++) {
            ctx.beginPath(); ctx.moveTo(x * CELL_SIZE, 0); ctx.lineTo(x * CELL_SIZE, h); ctx.stroke()
        }
        for (let y = 0; y <= GRID_H; y++) {
            ctx.beginPath(); ctx.moveTo(0, y * CELL_SIZE); ctx.lineTo(w, y * CELL_SIZE); ctx.stroke()
        }

        // Snake
        const snake = snakeRef.current
        snake.forEach((seg, i) => {
            const ratio = 1 - i / snake.length
            const r = Math.round(102 + (96 - 102) * ratio)
            const g = Math.round(126 + (165 - 126) * ratio)
            const b = Math.round(234 + (250 - 234) * ratio)
            ctx.fillStyle = `rgb(${r},${g},${b})`

            const pad = i === 0 ? 1 : 2
            ctx.beginPath()
            ctx.roundRect(seg.x * CELL_SIZE + pad, seg.y * CELL_SIZE + pad, CELL_SIZE - pad * 2, CELL_SIZE - pad * 2, 4)
            ctx.fill()

            // Glow on head
            if (i === 0) {
                ctx.shadowColor = '#667eea'
                ctx.shadowBlur = 15
                ctx.fill()
                ctx.shadowBlur = 0
            }
        })

        // Food
        const food = foodRef.current
        ctx.font = `${CELL_SIZE - 4}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(
            TECH_EMOJIS[scoreRef.current % TECH_EMOJIS.length],
            food.x * CELL_SIZE + CELL_SIZE / 2,
            food.y * CELL_SIZE + CELL_SIZE / 2
        )
    }, [])

    const gameLoop = useCallback(() => {
        if (gameOver || isPaused) return

        dirRef.current = nextDirRef.current
        const snake = [...snakeRef.current]
        const head = { ...snake[0] }

        switch (dirRef.current) {
            case 'UP': head.y--; break
            case 'DOWN': head.y++; break
            case 'LEFT': head.x--; break
            case 'RIGHT': head.x++; break
        }

        // Wall collision
        if (head.x < 0 || head.x >= GRID_W || head.y < 0 || head.y >= GRID_H) {
            setGameOver(true)
            if (scoreRef.current > highScore) {
                setHighScore(scoreRef.current)
                localStorage.setItem('snake-highscore', scoreRef.current.toString())
            }
            return
        }

        // Self collision
        if (snake.some(s => s.x === head.x && s.y === head.y)) {
            setGameOver(true)
            if (scoreRef.current > highScore) {
                setHighScore(scoreRef.current)
                localStorage.setItem('snake-highscore', scoreRef.current.toString())
            }
            return
        }

        snake.unshift(head)

        // Eat food
        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
            scoreRef.current++
            setScore(scoreRef.current)
            spawnFood()
        } else {
            snake.pop()
        }

        snakeRef.current = snake
        draw()
    }, [gameOver, isPaused, highScore, spawnFood, draw])

    const startGame = useCallback(() => {
        snakeRef.current = [{ x: 10, y: 7 }]
        dirRef.current = 'RIGHT'
        nextDirRef.current = 'RIGHT'
        scoreRef.current = 0
        setScore(0)
        setGameOver(false)
        setIsPaused(false)
        setStarted(true)
        spawnFood()
        draw()

        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(gameLoop, INITIAL_SPEED)
    }, [spawnFood, draw, gameLoop])

    // Re-create interval when gameLoop changes
    useEffect(() => {
        if (started && !gameOver && !isPaused) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            const speed = Math.max(60, INITIAL_SPEED - scoreRef.current * 3)
            intervalRef.current = setInterval(gameLoop, speed)
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [started, gameOver, isPaused, gameLoop])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement)?.tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA') return

            const dir = dirRef.current
            switch (e.key) {
                case 'ArrowUp': case 'w': case 'W':
                    e.preventDefault()
                    if (dir !== 'DOWN') nextDirRef.current = 'UP'; break
                case 'ArrowDown': case 's': case 'S':
                    e.preventDefault()
                    if (dir !== 'UP') nextDirRef.current = 'DOWN'; break
                case 'ArrowLeft': case 'a': case 'A':
                    e.preventDefault()
                    if (dir !== 'RIGHT') nextDirRef.current = 'LEFT'; break
                case 'ArrowRight': case 'd': case 'D':
                    e.preventDefault()
                    if (dir !== 'LEFT') nextDirRef.current = 'RIGHT'; break
                case ' ':
                    e.preventDefault()
                    if (gameOver) startGame()
                    else setIsPaused(p => !p)
                    break
                case 'Escape':
                    onClose(); break
            }
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [gameOver, startGame, onClose])

    // Touch controls
    const touchStartRef = useRef<Point | null>(null)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartRef.current) return
        const dx = e.changedTouches[0].clientX - touchStartRef.current.x
        const dy = e.changedTouches[0].clientY - touchStartRef.current.y
        const dir = dirRef.current

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 30 && dir !== 'LEFT') nextDirRef.current = 'RIGHT'
            else if (dx < -30 && dir !== 'RIGHT') nextDirRef.current = 'LEFT'
        } else {
            if (dy > 30 && dir !== 'UP') nextDirRef.current = 'DOWN'
            else if (dy < -30 && dir !== 'DOWN') nextDirRef.current = 'UP'
        }
        touchStartRef.current = null
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-3 px-1">
                <span className="text-blue-400 font-mono text-sm">Score: <span className="text-white font-bold">{score}</span></span>
                <span className="text-purple-400 font-mono text-sm">Best: <span className="text-white font-bold">{highScore}</span></span>
            </div>

            <div
                className="relative rounded-lg overflow-hidden border border-blue-500/20"
                style={{ boxShadow: '0 0 30px rgba(102, 126, 234, 0.15)' }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <canvas
                    ref={canvasRef}
                    width={GRID_W * CELL_SIZE}
                    height={GRID_H * CELL_SIZE}
                />

                {/* Overlays */}
                {!started && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                        <p className="text-xl font-bold text-white mb-2">🐍 Snake</p>
                        <p className="text-gray-400 text-sm mb-4">Collect tech icons!</p>
                        <motion.button
                            onClick={startGame}
                            className="px-6 py-2 rounded-lg text-white font-semibold text-sm"
                            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Game
                        </motion.button>
                        <p className="text-gray-500 text-xs mt-3">WASD / Arrows to move • Space to pause</p>
                    </div>
                )}

                {gameOver && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center"
                    >
                        <p className="text-xl font-bold text-red-400 mb-1">Game Over!</p>
                        <p className="text-gray-400 text-sm mb-4">Score: {score}</p>
                        <motion.button
                            onClick={startGame}
                            className="px-6 py-2 rounded-lg text-white font-semibold text-sm"
                            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Play Again
                        </motion.button>
                    </motion.div>
                )}

                {isPaused && !gameOver && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <p className="text-xl font-bold text-yellow-400">⏸ Paused</p>
                    </div>
                )}
            </div>

            <p className="text-gray-500 text-xs mt-3">Swipe on mobile • ESC to exit</p>
        </div>
    )
}
