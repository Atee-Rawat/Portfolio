'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, X } from 'lucide-react'
import SnakeGame from './SnakeGame'
import MemoryGame from './MemoryGame'

type GameType = 'none' | 'snake' | 'memory'

export default function GameLauncher() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeGame, setActiveGame] = useState<GameType>('none')

    const close = useCallback(() => {
        setActiveGame('none')
        setIsOpen(false)
    }, [])

    // Keyboard shortcut: Ctrl/Cmd + G
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
                e.preventDefault()
                setIsOpen(prev => !prev)
                setActiveGame('none')
            }
            if (e.key === 'Escape' && isOpen) {
                close()
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [isOpen, close])

    // Konami code easter egg
    useEffect(() => {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
        let konamiIndex = 0

        const handleKonami = (e: KeyboardEvent) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++
                if (konamiIndex === konamiCode.length) {
                    setIsOpen(true)
                    setActiveGame('none')
                    konamiIndex = 0
                }
            } else {
                konamiIndex = 0
            }
        }

        window.addEventListener('keydown', handleKonami)
        return () => window.removeEventListener('keydown', handleKonami)
    }, [])

    return (
        <>
            {/* Fixed game launcher button */}
            <motion.button
                onClick={() => { setIsOpen(true); setActiveGame('none') }}
                className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                }}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                title="Play Games (Ctrl+G)"
                data-cursor="pointer"
            >
                <Gamepad2 className="w-5 h-5 text-white" />
            </motion.button>

            {/* Game Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                        style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)' }}
                        onClick={(e) => { if (e.target === e.currentTarget) close() }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                            style={{
                                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.98))',
                                border: '1px solid rgba(148, 163, 184, 0.15)',
                            }}
                        >
                            {/* Close button */}
                            <button
                                onClick={close}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Game selection or active game */}
                            {activeGame === 'none' ? (
                                <div className="text-center">
                                    <motion.div
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                    >
                                        <Gamepad2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                                        <h2 className="text-2xl font-bold text-white mb-1">Game Center</h2>
                                        <p className="text-gray-400 text-sm mb-6">Take a break and have some fun! 🎮</p>
                                    </motion.div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <motion.button
                                            onClick={() => setActiveGame('snake')}
                                            className="p-6 rounded-xl text-left transition-colors"
                                            style={{
                                                background: 'rgba(102, 126, 234, 0.1)',
                                                border: '1px solid rgba(102, 126, 234, 0.2)',
                                            }}
                                            whileHover={{ scale: 1.03, borderColor: 'rgba(102, 126, 234, 0.5)' }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <span className="text-3xl mb-2 block">🐍</span>
                                            <h3 className="text-white font-bold text-lg">Snake</h3>
                                            <p className="text-gray-400 text-xs mt-1">Collect tech icons! Classic snake game with a twist.</p>
                                        </motion.button>

                                        <motion.button
                                            onClick={() => setActiveGame('memory')}
                                            className="p-6 rounded-xl text-left transition-colors"
                                            style={{
                                                background: 'rgba(168, 85, 247, 0.1)',
                                                border: '1px solid rgba(168, 85, 247, 0.2)',
                                            }}
                                            whileHover={{ scale: 1.03, borderColor: 'rgba(168, 85, 247, 0.5)' }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <span className="text-3xl mb-2 block">🧠</span>
                                            <h3 className="text-white font-bold text-lg">Memory Match</h3>
                                            <p className="text-gray-400 text-xs mt-1">Match tech stack icons. 3 difficulty levels!</p>
                                        </motion.button>
                                    </div>

                                    <p className="text-gray-600 text-xs mt-4">Press ESC to close • Try the Konami Code! 🕹️</p>
                                </div>
                            ) : activeGame === 'snake' ? (
                                <div>
                                    <button
                                        onClick={() => setActiveGame('none')}
                                        className="text-gray-400 hover:text-white text-sm mb-4 flex items-center space-x-1 transition-colors"
                                    >
                                        <span>← Back</span>
                                    </button>
                                    <SnakeGame onClose={close} />
                                </div>
                            ) : (
                                <div>
                                    <button
                                        onClick={() => setActiveGame('none')}
                                        className="text-gray-400 hover:text-white text-sm mb-4 flex items-center space-x-1 transition-colors"
                                    >
                                        <span>← Back</span>
                                    </button>
                                    <MemoryGame onClose={close} />
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
