'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

interface Message {
    id: string
    text: string
    sender: 'bot' | 'user'
    timestamp: Date
}

const QUICK_REPLIES = [
    'What tech stack do you use?',
    'Tell me about your projects',
    'How can I contact you?',
    'What are your skills?',
    'Tell me a fun fact',
    'Who are you?',
]

const BOT_RESPONSES: Record<string, string> = {
    'what tech stack do you use?':
        '🚀 I work with a powerful tech stack!\n\n**Frontend:** React, Next.js, React Native, TypeScript, Tailwind CSS\n**Backend:** Node.js, Express, NestJS, PHP, Go\n**Databases:** MongoDB, MySQL, PostgreSQL, Redis\n**Cloud & DevOps:** AWS, Azure, GCP, Docker, Kubernetes, GitHub Actions\n\nI love building full-stack applications from scratch!',
    'tell me about your projects':
        '💼 Here are some highlights:\n\n🎓 **iDeiaCard** - Student management ecosystem with face recognition (Web + Mobile, on Play Store & App Store)\n🍕 **CampusCravings** - Full-stack food ordering app (MERN + React Native)\n⚡ **Productivity-OS** - Productivity suite built with MERN Stack\n🌐 **Portfolio** - This very website you\'re on!\n\nScroll down to the Projects section to see all of them!',
    'how can i contact you?':
        '📬 I\'d love to hear from you!\n\n📧 **Email:** rawatateeshay4002@gmail.com\n📱 **Phone:** +91 7078542610\n💬 **WhatsApp:** Just click the green button in the hero!\n\nOr scroll to the Contact section to send me a message directly!',
    'what are your skills?':
        '🎯 Here\'s a quick overview:\n\n💻 **Languages:** JavaScript, TypeScript, Go, PHP, Kotlin, C++\n🎨 **Frontend:** React, Next.js, React Native, Tailwind\n⚙️ **Backend:** Node.js, Express, NestJS, GraphQL\n🗄️ **Databases:** MongoDB, MySQL, PostgreSQL, Redis\n☁️ **Cloud:** AWS, Azure, GCP, DigitalOcean\n🛠️ **DevOps:** Docker, Kubernetes, CI/CD, GitHub Actions\n\nCheck the Skills section for the full list!',
    'tell me a fun fact':
        '🎉 Fun facts about me:\n\n🎮 I built mini-games into this portfolio — try finding them!\n☕ I debug best with coffee at 2 AM\n🚀 I once deployed 5 projects in a single week\n🐛 My favorite error message is "undefined is not a function"\n🎵 I code to lo-fi beats\n\nWant to know more? Just ask!',
    'who are you?':
        '👋 I\'m **Ateeshay Rawat**!\n\nA passionate Full Stack Developer & DevOps Specialist from Greater Noida, India. Currently pursuing B.Tech in CSE at Bennett University (graduating 2026).\n\nI build production-ready web and mobile apps and love automating deployments with modern DevOps practices.\n\nThis chatbot is one of the interactive features I built for my portfolio! 😄',
}

function getBotResponse(input: string): string {
    const lower = input.toLowerCase().trim()

    // Direct match
    if (BOT_RESPONSES[lower]) return BOT_RESPONSES[lower]

    // Keyword matching
    if (lower.includes('tech') || lower.includes('stack') || lower.includes('technology'))
        return BOT_RESPONSES['what tech stack do you use?']
    if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio'))
        return BOT_RESPONSES['tell me about your projects']
    if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach'))
        return BOT_RESPONSES['how can i contact you?']
    if (lower.includes('skill') || lower.includes('know') || lower.includes('experience'))
        return BOT_RESPONSES['what are your skills?']
    if (lower.includes('fun') || lower.includes('joke') || lower.includes('interesting'))
        return BOT_RESPONSES['tell me a fun fact']
    if (lower.includes('who') || lower.includes('about') || lower.includes('intro') || lower.includes('yourself'))
        return BOT_RESPONSES['who are you?']
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey'))
        return '👋 Hey there! I\'m Ateeshay\'s portfolio bot. Ask me about his skills, projects, tech stack, or just say "tell me a fun fact"!'
    if (lower.includes('game') || lower.includes('play'))
        return '🎮 Want to play a game? Press **Ctrl+G** (or ⌘+G on Mac) or look for the 🎮 icon to launch the game center! I\'ve got Snake and Memory Match!'
    if (lower.includes('thank'))
        return '😊 You\'re welcome! Feel free to reach out to Ateeshay anytime. Happy to help!'
    if (lower.includes('hire') || lower.includes('job') || lower.includes('opportunity'))
        return '💼 Ateeshay is open to exciting opportunities!\n\n📧 Email him at rawatateeshay4002@gmail.com\n📱 Or call/WhatsApp: +91 7078542610\n\nHe\'d love to discuss how he can contribute to your team!'

    return '🤔 I\'m not sure about that, but I can tell you about Ateeshay\'s **projects**, **skills**, **tech stack**, or **contact info**. You can also ask for a **fun fact**!'
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '👋 Hey! I\'m Ateeshay\'s portfolio assistant. Ask me anything about his projects, skills, or experience!',
            sender: 'bot',
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const sendMessage = useCallback(
        (text: string) => {
            if (!text.trim()) return

            const userMsg: Message = {
                id: Date.now().toString(),
                text: text.trim(),
                sender: 'user',
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, userMsg])
            setInput('')
            setIsTyping(true)

            // Simulate typing delay
            setTimeout(() => {
                const botResponse = getBotResponse(text)
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    text: botResponse,
                    sender: 'bot',
                    timestamp: new Date(),
                }
                setMessages((prev) => [...prev, botMsg])
                setIsTyping(false)
            }, 800 + Math.random() * 800)
        },
        []
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage(input)
    }

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={isOpen ? {} : { y: [0, -8, 0] }}
                transition={isOpen ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                data-cursor="pointer"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notification dot */}
                {!isOpen && (
                    <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.98))',
                            border: '1px solid rgba(148, 163, 184, 0.15)',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        {/* Header */}
                        <div
                            className="px-4 py-3 flex items-center space-x-3"
                            style={{
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                                borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                            }}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-slate-900" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Ateeshay&apos;s Bot</p>
                                <p className="text-green-400 text-xs">Online — Ask me anything!</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-3" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, x: msg.sender === 'user' ? 10 : -10 }}
                                    animate={{ opacity: 1, y: 0, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                                            : 'bg-slate-800/80 text-gray-200 rounded-bl-md border border-slate-700/50'
                                            }`}
                                        style={{ whiteSpace: 'pre-line' }}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-slate-800/80 rounded-2xl rounded-bl-md px-4 py-3 border border-slate-700/50">
                                        <div className="flex space-x-1.5">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
                                            <div className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
                                            <div className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length <= 2 && (
                            <div className="px-4 pb-2">
                                <div className="flex flex-wrap gap-1.5">
                                    {QUICK_REPLIES.slice(0, 4).map((reply) => (
                                        <button
                                            key={reply}
                                            onClick={() => sendMessage(reply)}
                                            className="text-xs px-3 py-1.5 rounded-full border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-colors"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-3 flex items-center space-x-2"
                            style={{ borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-slate-800/60 text-white text-sm rounded-xl px-4 py-2.5 outline-none border border-slate-700/50 focus:border-blue-500/50 transition-colors placeholder-gray-500"
                            />
                            <motion.button
                                type="submit"
                                disabled={!input.trim()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-30 transition-opacity"
                                style={{
                                    background: input.trim()
                                        ? 'linear-gradient(135deg, #667eea, #764ba2)'
                                        : 'rgba(100,116,139,0.3)',
                                }}
                            >
                                <Send className="w-4 h-4 text-white" />
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
