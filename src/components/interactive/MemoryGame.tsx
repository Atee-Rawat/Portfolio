'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    SiReact, SiNextdotjs, SiNodedotjs, SiMongodb,
    SiDocker, SiTypescript, SiTailwindcss, SiPostgresql,
    SiRedis, SiGithubactions
} from 'react-icons/si'
import type { IconType } from 'react-icons'

interface Card {
    id: number
    icon: IconType
    label: string
    color: string
    isFlipped: boolean
    isMatched: boolean
}

const TECH_CARDS: { icon: IconType; label: string; color: string }[] = [
    { icon: SiReact, label: 'React', color: '#61DAFB' },
    { icon: SiNextdotjs, label: 'Next.js', color: '#FFFFFF' },
    { icon: SiNodedotjs, label: 'Node', color: '#3C873A' },
    { icon: SiMongodb, label: 'MongoDB', color: '#47A248' },
    { icon: SiDocker, label: 'Docker', color: '#2496ED' },
    { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
    { icon: SiTailwindcss, label: 'Tailwind', color: '#38BDF8' },
    { icon: SiPostgresql, label: 'PostgreSQL', color: '#336791' },
    { icon: SiRedis, label: 'Redis', color: '#DC382D' },
    { icon: SiGithubactions, label: 'GH Actions', color: '#2088FF' },
]

type Difficulty = 'easy' | 'medium' | 'hard'
const DIFFICULTY_CONFIG: Record<Difficulty, { pairs: number; cols: number }> = {
    easy: { pairs: 6, cols: 4 },
    medium: { pairs: 8, cols: 4 },
    hard: { pairs: 10, cols: 5 },
}

function shuffleArray<T>(arr: T[]): T[] {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export default function MemoryGame({ onClose }: { onClose: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty>('easy')
    const [cards, setCards] = useState<Card[]>([])
    const [flippedIds, setFlippedIds] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [matches, setMatches] = useState(0)
    const [timer, setTimer] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [bestTimes, setBestTimes] = useState<Record<Difficulty, number>>({
        easy: 0, medium: 0, hard: 0,
    })

    useEffect(() => {
        const saved = localStorage.getItem('memory-best')
        if (saved) setBestTimes(JSON.parse(saved))
    }, [])

    const initGame = useCallback((diff: Difficulty) => {
        const config = DIFFICULTY_CONFIG[diff]
        const selected = shuffleArray(TECH_CARDS).slice(0, config.pairs)
        const cardPairs: Card[] = shuffleArray(
            selected.flatMap((tech, i) => [
                { id: i * 2, icon: tech.icon, label: tech.label, color: tech.color, isFlipped: false, isMatched: false },
                { id: i * 2 + 1, icon: tech.icon, label: tech.label, color: tech.color, isFlipped: false, isMatched: false },
            ])
        )
        setCards(cardPairs)
        setFlippedIds([])
        setMoves(0)
        setMatches(0)
        setTimer(0)
        setIsPlaying(true)
        setIsComplete(false)
        setDifficulty(diff)
    }, [])

    // Timer
    useEffect(() => {
        if (!isPlaying || isComplete) return
        const t = setInterval(() => setTimer(prev => prev + 1), 1000)
        return () => clearInterval(t)
    }, [isPlaying, isComplete])

    // Check for match
    useEffect(() => {
        if (flippedIds.length !== 2) return

        const [id1, id2] = flippedIds
        const card1 = cards.find(c => c.id === id1)!
        const card2 = cards.find(c => c.id === id2)!

        if (card1.label === card2.label) {
            // Match!
            setTimeout(() => {
                setCards(prev => prev.map(c =>
                    c.id === id1 || c.id === id2 ? { ...c, isMatched: true, isFlipped: true } : c
                ))
                setMatches(prev => prev + 1)
                setFlippedIds([])
            }, 400)
        } else {
            // No match
            setTimeout(() => {
                setCards(prev => prev.map(c =>
                    c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c
                ))
                setFlippedIds([])
            }, 800)
        }
    }, [flippedIds, cards])

    // Check completion
    useEffect(() => {
        if (matches > 0 && matches === DIFFICULTY_CONFIG[difficulty].pairs) {
            setIsComplete(true)
            setIsPlaying(false)
            // Save best time
            const best = bestTimes[difficulty]
            if (!best || timer < best) {
                const newBest = { ...bestTimes, [difficulty]: timer }
                setBestTimes(newBest)
                localStorage.setItem('memory-best', JSON.stringify(newBest))
            }
        }
    }, [matches, difficulty, timer, bestTimes])

    const handleCardClick = (id: number) => {
        if (flippedIds.length >= 2) return
        const card = cards.find(c => c.id === id)
        if (!card || card.isFlipped || card.isMatched) return

        setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c))
        setFlippedIds(prev => [...prev, id])
        setMoves(prev => prev + 1)
    }

    const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

    const config = DIFFICULTY_CONFIG[difficulty]

    if (!isPlaying && !isComplete) {
        return (
            <div className="flex flex-col items-center space-y-6">
                <p className="text-xl font-bold text-white">🧠 Memory Match</p>
                <p className="text-gray-400 text-sm">Match tech stack icons!</p>
                <div className="flex gap-3">
                    {(['easy', 'medium', 'hard'] as Difficulty[]).map(diff => (
                        <motion.button
                            key={diff}
                            onClick={() => initGame(diff)}
                            className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm capitalize"
                            style={{
                                background: diff === 'easy'
                                    ? 'linear-gradient(135deg, #10b981, #059669)'
                                    : diff === 'medium'
                                        ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                                        : 'linear-gradient(135deg, #ef4444, #dc2626)',
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {diff} ({DIFFICULTY_CONFIG[diff].pairs * 2})
                        </motion.button>
                    ))}
                </div>
                {bestTimes.easy > 0 && (
                    <div className="text-xs text-gray-500 space-y-1">
                        {bestTimes.easy > 0 && <p>Easy best: {formatTime(bestTimes.easy)}</p>}
                        {bestTimes.medium > 0 && <p>Medium best: {formatTime(bestTimes.medium)}</p>}
                        {bestTimes.hard > 0 && <p>Hard best: {formatTime(bestTimes.hard)}</p>}
                    </div>
                )}
                <p className="text-gray-500 text-xs">ESC to exit</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center">
            {/* Stats */}
            <div className="flex justify-between w-full mb-4 px-1 text-sm">
                <span className="text-blue-400 font-mono">Moves: <span className="text-white font-bold">{moves}</span></span>
                <span className="text-purple-400 font-mono">Time: <span className="text-white font-bold">{formatTime(timer)}</span></span>
                <span className="text-green-400 font-mono">Matched: <span className="text-white font-bold">{matches}/{config.pairs}</span></span>
            </div>

            {/* Card Grid */}
            <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${config.cols}, 1fr)` }}
            >
                {cards.map(card => (
                    <motion.div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className="relative cursor-pointer"
                        style={{ width: 64, height: 72, perspective: '600px' }}
                        whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
                        whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                    >
                        <motion.div
                            className="w-full h-full relative"
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            {/* Back (hidden face) */}
                            <div
                                className="absolute inset-0 rounded-lg flex items-center justify-center backface-hidden border"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                                    borderColor: 'rgba(102, 126, 234, 0.3)',
                                    backfaceVisibility: 'hidden',
                                }}
                            >
                                <span className="text-2xl">❓</span>
                            </div>

                            {/* Front (revealed) */}
                            <div
                                className={`absolute inset-0 rounded-lg flex flex-col items-center justify-center border ${card.isMatched ? 'border-green-500/50' : 'border-slate-600/50'
                                    }`}
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)',
                                    background: card.isMatched
                                        ? 'rgba(16, 185, 129, 0.1)'
                                        : 'rgba(30, 41, 59, 0.8)',
                                }}
                            >
                                <card.icon size={28} color={card.color} />
                                <span className="text-[9px] text-gray-400 mt-1 font-mono">{card.label}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Complete overlay */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 text-center"
                    >
                        <p className="text-xl font-bold text-green-400 mb-1">🎉 You won!</p>
                        <p className="text-gray-400 text-sm mb-3">
                            {moves} moves in {formatTime(timer)}
                        </p>
                        <div className="flex gap-3 justify-center">
                            <motion.button
                                onClick={() => initGame(difficulty)}
                                className="px-5 py-2 rounded-lg text-white font-semibold text-sm"
                                style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Play Again
                            </motion.button>
                            <motion.button
                                onClick={() => { setIsPlaying(false); setIsComplete(false) }}
                                className="px-5 py-2 rounded-lg text-white font-semibold text-sm bg-slate-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Change Difficulty
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <p className="text-gray-500 text-xs mt-3">ESC to exit</p>
        </div>
    )
}
