'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Crosshair, Activity, MapPin, User, Clock, Rocket, FileText, Target, ArrowDown, Database, Cpu, Globe, Cloud, GitBranch, Layers } from 'lucide-react'
import { FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt } from 'react-icons/fa'
import { 
  SiNextdotjs, SiTypescript, SiGooglecloud, SiPostgresql, SiCplusplus, 
  SiPython, SiJavascript, SiPhp, SiGo, SiTailwindcss, SiExpress, 
  SiMongodb, SiMysql, SiRedis, SiFirebase, SiSocketdotio, SiMqtt,
  SiGooglegemini
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'

// Helper component for deep space background
const Starfield = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gray-50 dark:bg-[#05050f] transition-colors duration-500">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-gray-50 to-white dark:from-blue-900/10 dark:via-[#05050f] dark:to-[#020205] transition-colors duration-500"></div>
      
      {/* Distant Nebulae Orbs */}
      <motion.div 
        className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-blue-300/30 dark:bg-blue-900/10 blur-[150px] transition-colors duration-500"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-[0%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-violet-300/30 dark:bg-violet-900/10 blur-[120px] transition-colors duration-500"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
      
      {/* Generated CSS Stars */}
      {[...Array(100)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-600 dark:bg-white transition-colors duration-500"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5
            }}
          />
        );
      })}
    </div>
  )
}

interface OrbitingNodeProps {
  Icon: React.ElementType;
  color: string;
  darkColor?: string;
  orbit: number;
  speed: number;
  size: number;
  startAngle?: number;
  label: string;
}

// Component for orbiting tech nodes
const OrbitingNode = ({ Icon, color, darkColor, orbit, speed, size, startAngle = 0, label }: OrbitingNodeProps) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{
        width: orbit * 2,
        height: orbit * 2,
        x: '-50%',
        y: '-50%',
      }}
      initial={{ rotate: startAngle }}
      animate={{ rotate: startAngle + 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute top-0 left-1/2 pointer-events-auto"
        style={{ x: '-50%', y: '-50%' }}
        initial={{ rotate: -startAngle }}
        animate={{ rotate: -(startAngle + 360) }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative group flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-white dark:bg-[#0a0a1a] border border-cyan-200 dark:border-cyan-900/50 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.1)] dark:shadow-[0_0_15px_rgba(0,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all cursor-pointer backdrop-blur-md">
          {/* We handle Icon color dynamically based on theme if needed, but standard color is usually fine.
              For Next.js (black), darkColor would be white. Since we can't easily inline logic for dark mode without a hook, 
              we'll use a wrapper that applies text color via CSS variables or just relies on the primary color. */}
          <div className="hidden dark:flex"><Icon size={size} color={darkColor || color} /></div>
          <div className="flex dark:hidden"><Icon size={size} color={color} /></div>
          
          <div className="absolute top-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-cyan-700 dark:text-cyan-400 bg-white/95 dark:bg-black/90 px-3 py-1.5 rounded border border-cyan-300 dark:border-cyan-500/30 whitespace-nowrap z-50 shadow-xl pointer-events-none">
            {label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const handleDownloadResume = () => {
    const a = document.createElement('a')
    a.href = '/AteeshayRawat.pdf'
    a.download = 'AteeshayRawat.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  // Expanded tech stack configuration for orbits
  const techNodes = [
    // Ring 1 (Radius 130) - Languages
    { Icon: SiCplusplus, color: '#00599C', orbit: 130, speed: 30, size: 20, startAngle: 0, label: 'C++' },
    { Icon: SiPython, color: '#3776AB', orbit: 130, speed: 30, size: 20, startAngle: 60, label: 'Python' },
    { Icon: SiJavascript, color: '#F7DF1E', orbit: 130, speed: 30, size: 20, startAngle: 120, label: 'JavaScript' },
    { Icon: SiTypescript, color: '#3178C6', orbit: 130, speed: 30, size: 20, startAngle: 180, label: 'TypeScript' },
    { Icon: SiPhp, color: '#777BB4', orbit: 130, speed: 30, size: 20, startAngle: 240, label: 'PHP' },
    { Icon: SiGo, color: '#00ADD8', orbit: 130, speed: 30, size: 20, startAngle: 300, label: 'GOlang' },
    
    // Ring 2 (Radius 200) - Frontend & Backend
    { Icon: FaReact, color: '#61DAFB', orbit: 200, speed: 45, size: 22, startAngle: 0, label: 'React / Native' },
    { Icon: SiNextdotjs, color: '#000000', darkColor: '#FFFFFF', orbit: 200, speed: 45, size: 22, startAngle: 45, label: 'Next.js' },
    { Icon: SiTailwindcss, color: '#06B6D4', orbit: 200, speed: 45, size: 22, startAngle: 90, label: 'Tailwind / Nativewind' },
    { Icon: FaNodeJs, color: '#339933', orbit: 200, speed: 45, size: 22, startAngle: 135, label: 'Node.js' },
    { Icon: SiExpress, color: '#000000', darkColor: '#FFFFFF', orbit: 200, speed: 45, size: 22, startAngle: 180, label: 'Express.js' },
    { Icon: SiMongodb, color: '#47A248', orbit: 200, speed: 45, size: 22, startAngle: 225, label: 'MongoDB' },
    { Icon: SiMysql, color: '#4479A1', orbit: 200, speed: 45, size: 22, startAngle: 270, label: 'MySQL' },
    { Icon: SiRedis, color: '#DC382D', orbit: 200, speed: 45, size: 22, startAngle: 315, label: 'Redis' },

    // Ring 3 (Radius 270) - Realtime, AI, Tools
    { Icon: SiFirebase, color: '#FFCA28', orbit: 270, speed: 60, size: 24, startAngle: 0, label: 'Firebase' },
    { Icon: Database, color: '#F59E0B', orbit: 270, speed: 60, size: 24, startAngle: 36, label: 'ChromaDB' },
    { Icon: SiSocketdotio, color: '#010101', darkColor: '#FFFFFF', orbit: 270, speed: 60, size: 24, startAngle: 72, label: 'Socket.IO / WebSockets' },
    { Icon: SiMqtt, color: '#660066', orbit: 270, speed: 60, size: 24, startAngle: 108, label: 'MQTT' },
    { Icon: Globe, color: '#3B82F6', orbit: 270, speed: 60, size: 24, startAngle: 144, label: 'LangChain JS' },
    { Icon: SiGooglegemini, color: '#8E75B2', orbit: 270, speed: 60, size: 24, startAngle: 180, label: 'Gemini AI' },
    { Icon: Cpu, color: '#10B981', orbit: 270, speed: 60, size: 24, startAngle: 216, label: 'Vector Embeddings / RAG' },
    { Icon: Activity, color: '#EF4444', orbit: 270, speed: 60, size: 24, startAngle: 252, label: 'REST APIs / RTK Query' },
    { Icon: Layers, color: '#8B5CF6', orbit: 270, speed: 60, size: 24, startAngle: 288, label: 'System Design' },
    { Icon: Target, color: '#EC4899', orbit: 270, speed: 60, size: 24, startAngle: 324, label: 'Agile/Scrum' },

    // Ring 4 (Radius 340) - Cloud & Infra
    { Icon: FaAws, color: '#FF9900', orbit: 340, speed: 80, size: 26, startAngle: 0, label: 'AWS' },
    { Icon: VscAzure, color: '#0089D6', orbit: 340, speed: 80, size: 26, startAngle: 72, label: 'Azure' },
    { Icon: SiGooglecloud, color: '#4285F4', orbit: 340, speed: 80, size: 26, startAngle: 144, label: 'GCP' },
    { Icon: FaDocker, color: '#2496ED', orbit: 340, speed: 80, size: 26, startAngle: 216, label: 'Docker' },
    { Icon: FaGitAlt, color: '#F05032', orbit: 340, speed: 80, size: 26, startAngle: 288, label: 'Git / CI/CD' },
  ]

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden bg-gray-50 dark:bg-[#05050f] transition-colors duration-500"
    >
      <Starfield />

      <motion.div 
        style={{ opacity }} 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12"
      >
        
        {/* LEFT SIDE: Mission Control Briefing */}
        <motion.div 
          style={{ y: y1 }}
          className="flex-1 z-10 flex flex-col justify-center w-full lg:max-w-xl xl:max-w-2xl"
        >
          {/* Mission Label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2 mb-6"
          >
            <Crosshair className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />
            <span className="text-cyan-700 dark:text-cyan-500 font-mono text-sm tracking-[0.2em]">MISSION 001</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
          >
            Exploring the Frontier of <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">
              Software Engineering
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl"
          >
            I build scalable applications, cloud-native systems, and digital experiences that push beyond conventional boundaries.
          </motion.p>

          {/* Status Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 dark:bg-[#0a0a1a]/80 backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-2xl p-5 sm:p-6 mb-10 w-full max-w-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
            <div className="grid grid-cols-2 gap-y-5 gap-x-4 font-mono text-xs sm:text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-slate-500 mb-1.5 text-[10px] sm:text-xs">STATUS</span>
                <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></div>
                  <span className="font-semibold">ACTIVE</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-slate-500 mb-1.5 text-[10px] sm:text-xs">LOCATION</span>
                <span className="text-gray-900 dark:text-white flex items-center font-medium"><MapPin className="w-3 h-3 mr-1.5 text-cyan-600 dark:text-slate-400" /> EARTH ORBIT</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-slate-500 mb-1.5 text-[10px] sm:text-xs">ROLE</span>
                <span className="text-gray-900 dark:text-white flex items-center font-medium"><User className="w-3 h-3 mr-1.5 text-cyan-600 dark:text-slate-400" /> FULL STACK AI ENGINEER</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-slate-500 mb-1.5 text-[10px] sm:text-xs">MISSION YEARS</span>
                <span className="text-gray-900 dark:text-white flex items-center font-medium"><Clock className="w-3 h-3 mr-1.5 text-cyan-600 dark:text-slate-400" /> 2+</span>
              </div>
              <div className="flex flex-col col-span-2 mt-2 pt-4 border-t border-gray-200 dark:border-white/10">
                <span className="text-gray-500 dark:text-slate-500 mb-2 text-[10px] sm:text-xs flex justify-between font-medium">
                  <span>SYSTEMS DEPLOYED</span>
                  <span className="text-cyan-600 dark:text-cyan-400">5+ SUCCESSFUL</span>
                </span>
                <div className="w-full bg-gray-200 dark:bg-[#151525] h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '95%' }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="bg-cyan-500 w-[95%] h-full shadow-[0_0_10px_rgba(6,182,212,0.5)] dark:shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white dark:text-black font-bold px-8 py-4 rounded-xl flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              <Rocket className="w-5 h-5" />
              <span>Launch Mission</span>
            </button>
            <button 
              onClick={handleDownloadResume}
              className="bg-white dark:bg-[#0a0a1a] border border-cyan-400 dark:border-cyan-500/30 hover:border-cyan-500 dark:hover:border-cyan-400 text-cyan-600 dark:text-cyan-400 font-bold px-8 py-4 rounded-xl flex items-center justify-center space-x-2 transition-all hover:bg-cyan-50 dark:hover:bg-cyan-500/10"
            >
              <FileText className="w-5 h-5" />
              <span>View Mission Log</span>
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Spacecraft HUD */}
        <motion.div 
          style={{ y: y2 }}
          className="hidden lg:flex flex-1 z-10 items-center justify-center relative min-h-[600px] xl:min-h-[700px] w-full"
        >
          {/* The Solar System / Tech Radar */}
          <div className="relative w-[500px] h-[500px] xl:w-[680px] xl:h-[680px] flex items-center justify-center scale-75 xl:scale-100">
            
            {/* Concentric Radar Rings */}
            {[130, 200, 270, 340].map((radius, i) => (
              <div 
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300 dark:border-cyan-900/40 pointer-events-none border-dashed transition-colors duration-500"
                style={{ width: radius * 2, height: radius * 2 }}
              />
            ))}
            
            {/* Radar Sweep */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 w-[340px] h-[340px] origin-top-left pointer-events-none rounded-tl-full"
              style={{
                background: 'conic-gradient(from 180deg at 0 0, rgba(6, 182, 212, 0.15) 0deg, transparent 60deg)',
              }}
            />

            {/* Central Planet */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-cyan-400 dark:border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.3)] dark:shadow-[0_0_50px_rgba(0,255,255,0.15)] bg-gradient-to-br from-white to-blue-50 dark:from-[#020205] dark:to-blue-900/40 backdrop-blur-md flex items-center justify-center z-10 transition-colors duration-500">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-dashed border-cyan-500/50 dark:border-cyan-400/50"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-dotted border-blue-500/40 dark:border-blue-400/30"
              />
              <Activity className="text-cyan-600 dark:text-cyan-400 w-8 h-8 animate-pulse" />
            </div>

            {/* Tech Nodes */}
            {techNodes.map((node, i) => (
              <OrbitingNode key={i} {...node} />
            ))}

            {/* Current Mission Card Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-10 -right-4 bg-white/90 dark:bg-[#0a0a1a]/80 backdrop-blur-xl border border-cyan-300 dark:border-cyan-500/30 p-5 rounded-xl max-w-[280px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-20 group hover:border-cyan-400 dark:hover:border-cyan-400/60 transition-colors"
            >
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-500"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-500"></div>

              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:animate-ping" />
                <span className="text-[11px] font-mono tracking-widest text-cyan-700 dark:text-cyan-400 font-semibold">CURRENT MISSION</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed font-medium">
                Building scalable AI integrated web and mobile apps along with cloud infrastructure that serve thousands of users.
              </p>
            </motion.div>

          </div>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-600/70 dark:text-cyan-500/70 mb-2 uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-5 w-5 text-cyan-600/70 dark:text-cyan-500/70" />
        </motion.div>
      </motion.div>

    </section>
  )
}
