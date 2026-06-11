'use client'

import { motion } from 'framer-motion'
import MarioGame from '@/components/interactive/MarioGame'

export default function GameSection() {
    return (
        <section id="games" className="py-24 relative overflow-hidden bg-[#020205] border-t border-white/5">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#020205] to-[#020205]"></div>
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <h2 className="text-xs font-mono tracking-[0.3em] text-blue-500 uppercase font-semibold">
                            TECHNOLOGY EXPLORATION SIMULATOR
                        </h2>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans tracking-tight">
                        Navigate Through The <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Known Technology Galaxy
                        </span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-mono tracking-wide leading-relaxed">
                        &gt; MISSION PROTOCOL: Pilot the Autonomous Exploration Drone A-01. <br/>
                        &gt; OBJECTIVE: Discover all technology sectors and map the Galactic Systems Matrix.
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
