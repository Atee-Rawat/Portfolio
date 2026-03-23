'use client'

import { motion } from 'framer-motion'
import MarioGame from '@/components/interactive/MarioGame'

export default function GameSection() {
    return (
        <section id="games" className="py-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Skill <span className="gradient-text">Runner</span> 🏃
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        A Mario-style platformer — run, jump, and collect all my tech skills!
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        Stomp 🐛 bugs for bonus points • Don&apos;t fall off the platforms!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <MarioGame />
                </motion.div>
            </div>
        </section>
    )
}
