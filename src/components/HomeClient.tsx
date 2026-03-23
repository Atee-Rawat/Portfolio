'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from '@/components/ui/Loader'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Education from '@/components/sections/Education'
import Projects from '@/components/sections/Projects'
import GameSection from '@/components/sections/GameSection'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import Chatbot from '@/components/interactive/Chatbot'
import GameLauncher from '@/components/interactive/GameLauncher'

export default function HomeClient() {
    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
            setMounted(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <Loader key="loader" />}
            </AnimatePresence>

            {mounted && (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-black transition-all duration-500">
                    <ScrollProgress />
                    <Navbar />
                    <main className="relative overflow-x-hidden">
                        <Hero />
                        <About />
                        <Skills />
                        <Education />
                        <Projects />
                        <GameSection />
                        <Contact />
                    </main>
                    <Footer />
                    <Chatbot />
                    <GameLauncher />
                </div>
            )}
        </>
    )
}
