'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Target, Cpu, Layers, Activity, Cloud } from 'lucide-react'

const AboutBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gray-50 dark:bg-[#05050f] transition-colors duration-500">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-gray-50 to-white dark:from-blue-900/10 dark:via-[#05050f] dark:to-[#020205] transition-colors duration-500"></div>

      {/* Planetary Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
        }}
      />

      {/* Orbital Trajectory Lines */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] border border-cyan-200/50 dark:border-cyan-900/30 rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] border border-cyan-200/30 dark:border-cyan-900/20 rounded-full translate-x-1/3 -translate-y-1/3" />

      {/* Floating Data Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500/50 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}

interface MissionModuleProps {
  id: string
  title: string
  icon: React.ElementType
  skills: string[]
  delay: number
}

const scanVariants = {
  initial: { top: '0%', opacity: 0 },
  hover: { 
    top: ['0%', '100%', '0%'], 
    opacity: 1,
    transition: { 
      top: { duration: 3, repeat: Infinity, ease: 'linear' }, 
      opacity: { duration: 0.3 } 
    }
  }
}

const MissionModule = ({ id, title, icon: Icon, skills, delay }: MissionModuleProps) => {
  return (
    <motion.div
      initial="initial"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      variants={{
        initial: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } }
      }}
      className="relative p-5 bg-white/60 dark:bg-[#0a0a1a]/60 backdrop-blur-md border border-cyan-200 dark:border-cyan-500/20 rounded-xl overflow-hidden group hover:border-cyan-400 dark:hover:border-cyan-400/50 transition-colors"
    >
      {/* Scanning animation line */}
      <motion.div 
        variants={scanVariants}
        className="absolute left-0 right-0 h-[1px] bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] z-10 pointer-events-none"
      />
      
      {/* Subtle corner borders for HUD feel */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex justify-between items-start mb-5 relative z-20">
         <div className="flex items-center space-x-3">
            <span className="flex items-center justify-center w-8 h-8 rounded bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-800/50 group-hover:border-cyan-400 transition-colors">
              <Icon className="w-4 h-4" />
            </span>
            <div>
               <p className="text-[9px] font-mono text-gray-500 dark:text-slate-500">{id}</p>
               <h4 className="text-sm font-bold text-gray-900 dark:text-white font-mono tracking-wide">{title}</h4>
            </div>
         </div>
         {/* Status indicator */}
         <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse mt-1" />
      </div>

      <div className="space-y-2 relative z-20">
         {skills.map((skill, idx) => (
           <div key={idx} className="flex items-center space-x-2">
             <span className="w-1 h-1 bg-cyan-400 rounded-full" />
             <span className="text-[13px] text-gray-700 dark:text-slate-300 font-mono">{skill}</span>
           </div>
         ))}
      </div>

      {/* Holographic glow on hover */}
      <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-colors pointer-events-none" />
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const modules = [
    {
      id: 'MODULE 01',
      title: 'AI EXPLORATION',
      icon: Cpu,
      skills: ['RAG Systems', 'Semantic Search', 'Vector Embeddings', 'LangChain', 'Gemini AI'],
      delay: 0.2
    },
    {
      id: 'MODULE 02',
      title: 'FULL STACK SYSTEMS',
      icon: Layers,
      skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
      delay: 0.3
    },
    {
      id: 'MODULE 03',
      title: 'REAL-TIME COMM',
      icon: Activity,
      skills: ['WebSockets', 'Socket.IO', 'MQTT'],
      delay: 0.4
    },
    {
      id: 'MODULE 04',
      title: 'CLOUD OPERATIONS',
      icon: Cloud,
      skills: ['AWS', 'Azure', 'GCP', 'CI/CD'],
      delay: 0.5
    }
  ]

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden bg-gray-50 dark:bg-[#05050f] transition-colors duration-500"
    >
      <AboutBackground />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Target className="w-4 h-4 text-cyan-600 dark:text-cyan-500" />
            <h2 className="text-[11px] font-mono tracking-[0.3em] text-cyan-700 dark:text-cyan-500 uppercase font-semibold">
              About The Commander
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-slate-400 font-mono tracking-tight">
            Mission Profile & Technical Journey
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">
          
          {/* LEFT SIDE: Holographic Commander Profile Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-[#0a0a1a]/80 backdrop-blur-xl border border-cyan-200 dark:border-cyan-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
               
               <div className="flex justify-between items-start mb-8 border-b border-gray-200 dark:border-cyan-900/50 pb-5">
                  <div>
                     <p className="text-[10px] font-mono text-cyan-700 dark:text-cyan-500 mb-2 tracking-widest font-semibold">COMMANDER PROFILE</p>
                     <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-mono tracking-wide">
                        MISSION DESIGNATION: <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">ATEESHAY RAWAT</span>
                     </h3>
                  </div>
                  <div className="hidden sm:flex w-12 h-12 rounded-full border-2 border-dashed border-cyan-400 items-center justify-center animate-[spin_15s_linear_infinite]">
                     <Target className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />
                  </div>
               </div>
               
               <div className="mb-8">
                  <p className="text-[10px] font-mono text-gray-500 dark:text-slate-500 mb-1.5 tracking-widest">ROLE</p>
                  <p className="text-sm font-semibold text-cyan-800 dark:text-cyan-400 font-mono tracking-tight">Full Stack Engineer • DevOps Engineer • AI Systems Builder</p>
               </div>

               <div className="mb-10">
                  <p className="text-[10px] font-mono text-gray-500 dark:text-slate-500 mb-2 tracking-widest">MISSION STATEMENT</p>
                  <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed italic border-l-2 border-cyan-500 pl-4 font-medium">
                    &quot;Designing scalable systems, intelligent applications, and cloud infrastructure that transform ambitious ideas into real-world products.&quot;
                  </p>
               </div>

               <div className="space-y-4">
                  <p className="text-[10px] font-mono text-cyan-700 dark:text-cyan-500 mb-3 tracking-widest font-semibold">MISSION LOGS</p>
                  
                  <div className="bg-gray-50/50 dark:bg-[#05050f]/80 p-4 rounded-lg border border-gray-200 dark:border-white/5 relative group hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-colors">
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top rounded-l-lg"></div>
                     <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold tracking-wider">LOG 01</span>
                     <p className="text-sm text-gray-800 dark:text-slate-300 mt-1.5">Building high-performance web and mobile platforms.</p>
                  </div>

                  <div className="bg-gray-50/50 dark:bg-[#05050f]/80 p-4 rounded-lg border border-gray-200 dark:border-white/5 relative group hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-colors">
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top rounded-l-lg"></div>
                     <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold tracking-wider">LOG 02</span>
                     <p className="text-sm text-gray-800 dark:text-slate-300 mt-1.5">Engineering cloud-native systems and deployment pipelines.</p>
                  </div>

                  <div className="bg-gray-50/50 dark:bg-[#05050f]/80 p-4 rounded-lg border border-gray-200 dark:border-white/5 relative group hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-colors">
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top rounded-l-lg"></div>
                     <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold tracking-wider">LOG 03</span>
                     <p className="text-sm text-gray-800 dark:text-slate-300 mt-1.5">Exploring AI-powered applications, real-time architectures, and next-generation user experiences.</p>
                  </div>
               </div>

               <div className="mt-10 pt-6 border-t border-gray-200 dark:border-cyan-900/50 bg-cyan-50/50 dark:bg-transparent -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
                  <p className="text-sm text-cyan-800 dark:text-cyan-200 font-semibold font-mono text-center leading-relaxed">
                    &quot;I don&apos;t just write code. I design systems capable of scaling beyond today&apos;s challenges.&quot;
                  </p>
               </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Futuristic Mission Modules */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4 lg:mt-0">
             {modules.map((module) => (
                <MissionModule key={module.id} {...module} />
             ))}
          </div>

        </div>
      </div>
    </section>
  )
}
