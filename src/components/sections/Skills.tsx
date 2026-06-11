'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Cpu, Globe, Database, Cloud, Radio, Rocket, Activity, Network, Brain, Search, Zap } from 'lucide-react'
import { FaReact, FaNodeJs, FaAws, FaDocker, FaPhp } from 'react-icons/fa'
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress, SiGo, SiSocketdotio, SiMqtt, SiGooglecloud, SiMongodb, SiMysql, SiRedis, SiFirebase, SiGooglegemini } from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'

const SpacecraftBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gray-50 dark:bg-[#05050f] transition-colors duration-500">
    {/* Gradients */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-gray-50 to-white dark:from-blue-900/10 dark:via-[#05050f] dark:to-[#020205] transition-colors duration-500"></div>

    {/* Star map overlay */}
    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
         style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #06b6d4 1px, transparent 0)`, backgroundSize: '32px 32px' }}>
    </div>

    {/* Radar Sweep Effect */}
    <motion.div 
      className="absolute top-1/2 left-1/2 w-[150vw] h-[150vw] rounded-full border-t border-cyan-400/10 dark:border-cyan-400/5"
      style={{ x: '-50%', y: '-50%', background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(6, 182, 212, 0.05) 360deg)' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    />
  </div>
)

const OrbitingNode = ({ radius, speed, delay, icon: Icon, color, size = 20 }: any) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ width: radius * 2, height: radius * 2, x: '-50%', y: '-50%' }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear', delay }}
    >
      <motion.div
        className={`absolute top-0 left-1/2 flex items-center justify-center bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full border border-gray-200 dark:border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] ${color === 'currentColor' ? 'text-gray-900 dark:text-white' : ''}`}
        style={{ 
           width: size, 
           height: size, 
           x: '-50%', 
           y: '-50%', 
           ...(color !== 'currentColor' ? { color } : {}) 
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear', delay }}
      >
        <Icon className="w-1/2 h-1/2" />
      </motion.div>
    </motion.div>
  )
}

const MissionModule = ({ module, align }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative flex flex-col p-5 bg-white/70 dark:bg-[#0a0a1a]/80 backdrop-blur-xl border border-cyan-200 dark:border-cyan-500/30 rounded-2xl group hover:border-cyan-400 dark:hover:border-cyan-400/50 transition-all z-10 w-full`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
           <p className="text-[10px] font-mono text-cyan-600 dark:text-cyan-500 mb-1 tracking-widest">{module.id}</p>
           <h3 className="text-sm font-bold text-gray-900 dark:text-white font-mono tracking-wide">{module.title}</h3>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-2">
             <span className="text-[9px] font-mono text-green-600 dark:text-green-400 font-semibold">{module.status}</span>
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="flex items-center space-x-1.5 mt-1.5">
            <span className="text-[8px] font-mono text-gray-400 dark:text-slate-500">PWR</span>
            <div className="w-8 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden flex">
              <motion.div 
                 className="h-full bg-cyan-500" 
                 animate={{ width: ['70%', '100%', '70%'] }} 
                 transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-gray-600 dark:text-slate-400 mb-5 leading-relaxed">{module.description}</p>

      {/* Orbits & Techs */}
      <div className="flex items-center gap-5 mt-auto">
         <div className="relative w-16 h-16 shrink-0">
            {/* Center Module Icon */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
               <div className="w-8 h-8 rounded-full bg-cyan-50 dark:bg-cyan-900/40 flex items-center justify-center border border-cyan-200 dark:border-cyan-500/50">
                  <module.icon className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
               </div>
            </div>
            {/* Orbital Rings */}
            <div className="absolute inset-0 border border-cyan-200/50 dark:border-cyan-500/20 rounded-full" />
            <div className="absolute -inset-2.5 border border-dashed border-cyan-200/30 dark:border-cyan-500/10 rounded-full" />
            
            {/* Orbiting Icons */}
            {module.techIcons.map((t: any, i: number) => (
               <OrbitingNode key={i} {...t} />
            ))}
         </div>
         
         {/* Tech list */}
         <div className="flex-1 flex flex-wrap gap-1.5">
            {module.technologies.map((tech: string, i: number) => (
               <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-800/50 whitespace-nowrap">
                  {tech}
               </span>
            ))}
         </div>
      </div>
    </motion.div>
  )
}

const MissionReadiness = () => {
  const systems = [
    { name: 'Frontend Systems', status: 'ONLINE' },
    { name: 'Backend Systems', status: 'ONLINE' },
    { name: 'AI Systems', status: 'ONLINE' },
    { name: 'Cloud Infrastructure', status: 'ONLINE' },
    { name: 'Realtime Communications', status: 'ONLINE' },
    { name: 'Deployment Pipeline', status: 'ONLINE' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto mb-16 p-6 rounded-2xl bg-white/60 dark:bg-[#0a0a1a]/80 backdrop-blur-xl border border-cyan-200 dark:border-cyan-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-20 relative"
    >
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-cyan-100 dark:border-cyan-900/50 pb-5 mb-5">
        <div className="text-center md:text-left">
           <p className="text-[10px] font-mono text-cyan-600 dark:text-cyan-500 tracking-widest mb-1 font-semibold">SYSTEM STATUS</p>
           <h3 className="text-xl sm:text-2xl font-bold font-mono text-gray-900 dark:text-white tracking-wide">MISSION READINESS</h3>
        </div>
        <div className="mt-4 md:mt-0 px-4 py-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg flex items-center space-x-2">
           <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
           <span className="text-sm font-mono font-bold text-green-700 dark:text-green-400 tracking-wider">MISSION READY</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
         {systems.map((s, i) => (
           <div key={i} className="flex items-center justify-between sm:justify-start sm:space-x-3 bg-gray-50/50 dark:bg-transparent p-2 sm:p-0 rounded-md">
             <div className="flex items-center space-x-2">
               <CheckCircle2 className="w-4 h-4 text-green-500" />
               <span className="text-xs font-mono text-gray-700 dark:text-slate-300">{s.name}</span>
             </div>
             <span className="text-[10px] font-mono text-green-600 dark:text-green-400 font-semibold">{s.status}</span>
           </div>
         ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const modules = [
    {
      id: 'MODULE 01',
      title: 'NAVIGATION SYSTEMS',
      status: 'ONLINE',
      icon: Globe,
      description: 'Building user interfaces and digital experiences.',
      technologies: ['React', 'Next.js', 'TypeScript', 'React Native', 'Tailwind CSS'],
      techIcons: [
        { icon: FaReact, color: '#61DAFB', radius: 32, speed: 6, delay: 0 },
        { icon: SiNextdotjs, color: 'currentColor', radius: 32, speed: 6, delay: 3 },
        { icon: SiTypescript, color: '#3178C6', radius: 42, speed: 8, delay: 0 },
        { icon: SiTailwindcss, color: '#06B6D4', radius: 42, speed: 8, delay: 4 },
      ]
    },
    {
      id: 'MODULE 02',
      title: 'MISSION CONTROL',
      status: 'OPERATIONAL',
      icon: Cpu,
      description: 'Application logic and backend operations.',
      technologies: ['Node.js', 'Express.js', 'PHP', 'Go'],
      techIcons: [
        { icon: FaNodeJs, color: '#339933', radius: 32, speed: 7, delay: 0 },
        { icon: SiExpress, color: 'currentColor', radius: 32, speed: 7, delay: 3.5 },
        { icon: FaPhp, color: '#777BB4', radius: 42, speed: 9, delay: 1 },
        { icon: SiGo, color: '#00ADD8', radius: 42, speed: 9, delay: 5.5 },
      ]
    },
    {
      id: 'MODULE 03',
      title: 'AI RESEARCH LAB',
      status: 'ACTIVE',
      icon: Brain,
      description: 'Intelligent systems and semantic knowledge engines.',
      technologies: ['LangChain JS', 'Gemini AI', 'RAG', 'Vector Embeddings', 'Semantic Search', 'ChromaDB'],
      techIcons: [
        { icon: SiGooglegemini, color: '#8E75B2', radius: 32, speed: 6, delay: 0 },
        { icon: Network, color: '#10B981', radius: 32, speed: 6, delay: 3 },
        { icon: Search, color: '#3B82F6', radius: 42, speed: 10, delay: 0 },
        { icon: Database, color: '#F59E0B', radius: 42, speed: 10, delay: 5 },
      ]
    },
    {
      id: 'MODULE 04',
      title: 'COMMUNICATION ARRAY',
      status: 'OPTIMIZED',
      icon: Radio,
      description: 'Real-time data transmission across systems.',
      technologies: ['WebSockets', 'Socket.IO', 'MQTT'],
      techIcons: [
        { icon: SiSocketdotio, color: 'currentColor', radius: 32, speed: 5, delay: 0 },
        { icon: SiMqtt, color: '#660066', radius: 32, speed: 5, delay: 2.5 },
        { icon: Activity, color: '#EF4444', radius: 42, speed: 8, delay: 0 },
      ]
    },
    {
      id: 'MODULE 05',
      title: 'PROPULSION CORE',
      status: 'ONLINE',
      icon: Cloud,
      description: 'Cloud infrastructure and deployment systems.',
      technologies: ['AWS', 'Azure', 'GCP', 'CI/CD'],
      techIcons: [
        { icon: FaAws, color: '#FF9900', radius: 32, speed: 7, delay: 0 },
        { icon: VscAzure, color: '#0089D6', radius: 32, speed: 7, delay: 3.5 },
        { icon: SiGooglecloud, color: '#4285F4', radius: 42, speed: 9, delay: 0 },
        { icon: Rocket, color: '#10B981', radius: 42, speed: 9, delay: 4.5 },
      ]
    },
    {
      id: 'MODULE 06',
      title: 'DATA STORAGE',
      status: 'OPERATIONAL',
      icon: Database,
      description: 'Knowledge storage and persistence systems.',
      technologies: ['MongoDB', 'MySQL', 'Redis', 'Firebase'],
      techIcons: [
        { icon: SiMongodb, color: '#47A248', radius: 32, speed: 6, delay: 0 },
        { icon: SiMysql, color: '#4479A1', radius: 32, speed: 6, delay: 3 },
        { icon: SiRedis, color: '#DC382D', radius: 42, speed: 8, delay: 0 },
        { icon: SiFirebase, color: '#FFCA28', radius: 42, speed: 8, delay: 4 },
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-gray-50 dark:bg-[#05050f] transition-colors duration-500 min-h-screen flex flex-col justify-center">
      <SpacecraftBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-500" />
            <h2 className="text-[11px] font-mono tracking-[0.3em] text-cyan-700 dark:text-cyan-500 uppercase font-semibold">
              Spacecraft Systems
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-slate-400 font-mono tracking-tight">
            Core technologies powering every mission.
          </p>
        </motion.div>

        {/* Mission Readiness Panel */}
        <MissionReadiness />

        {/* Central Schematic Layout */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 xl:gap-12 mt-12">
          
          {/* Data Transmission Lines (Desktop Only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            {/* Horizontal connection line */}
            <div className="absolute top-1/2 left-1/4 right-1/4 h-px border-t border-dashed border-cyan-300/40 dark:border-cyan-500/30" />
            
            {/* Diagonal lines mapping roughly to top and bottom modules */}
            <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
              {/* Left Side Connectors */}
              <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
              <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
              
              {/* Right Side Connectors */}
              <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite_reverse]" />
              <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite_reverse]" />
            </svg>
            <style>{`
              @keyframes dash { to { stroke-dashoffset: -1000; } }
            `}</style>
          </div>

          {/* Left Column (3 Modules) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 z-10">
             <MissionModule module={modules[0]} />
             <MissionModule module={modules[1]} />
             <MissionModule module={modules[2]} />
          </div>

          {/* Central Mission Core (Desktop) */}
          <div className="hidden lg:flex w-full lg:w-1/4 justify-center py-12 lg:py-0 z-10 relative">
             <motion.div 
               initial={{ scale: 0, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
               className="w-48 h-48 rounded-full border border-cyan-300 dark:border-cyan-500/30 flex items-center justify-center relative bg-white/10 dark:bg-transparent backdrop-blur-sm"
             >
                {/* Core Ripple Rings */}
                <div className="absolute inset-0 rounded-full border border-cyan-300/40 dark:border-cyan-500/10 scale-[1.3]" />
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 dark:border-cyan-500/20 scale-[1.6] animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-0 rounded-full border border-cyan-300/20 dark:border-cyan-500/5 scale-[1.9]" />
                
                {/* Core Orb */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-100 to-blue-50 dark:from-cyan-900/50 dark:to-blue-900/30 backdrop-blur-xl border-2 border-cyan-400 dark:border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.4)] dark:shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col items-center justify-center relative overflow-hidden group">
                   
                   {/* Inner glowing pulse */}
                   <div className="absolute inset-0 bg-cyan-400/20 dark:bg-cyan-400/10 animate-pulse" />
                   
                   <Rocket className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-2 relative z-10 group-hover:-translate-y-1 transition-transform" />
                   <span className="text-xs font-mono font-bold text-cyan-800 dark:text-cyan-200 relative z-10">MISSION CORE</span>
                </div>
             </motion.div>
          </div>

          {/* Right Column (3 Modules) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 z-10">
             <MissionModule module={modules[3]} />
             <MissionModule module={modules[4]} />
             <MissionModule module={modules[5]} />
          </div>

        </div>
      </div>
    </section>
  )
}
