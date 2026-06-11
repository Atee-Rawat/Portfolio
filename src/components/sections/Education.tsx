'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Network, Rocket, Satellite, Zap } from 'lucide-react'
import { PERSONAL_INFO } from '@/utils/constants'

const EducationBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gray-50 dark:bg-[#05050f] transition-colors duration-500 z-0">
    {/* Deep Space Gradients */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-gray-50 to-white dark:from-blue-900/10 dark:via-[#05050f] dark:to-[#020205] transition-colors duration-500"></div>

    {/* Holographic Grid Overlay */}
    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
         style={{ backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
    </div>

    {/* Vertical telemetry lines */}
    <div className="absolute top-0 bottom-0 left-[10%] w-px bg-gradient-to-b from-transparent via-cyan-400/20 dark:via-cyan-500/10 to-transparent" />
    <div className="absolute top-0 bottom-0 right-[10%] w-px bg-gradient-to-b from-transparent via-cyan-400/20 dark:via-cyan-500/10 to-transparent" />

    {/* Nebulas */}
    <motion.div 
      className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-400/10 dark:bg-cyan-900/20 blur-[120px]"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ArchivePanel = ({ phase, title, institution, classification, designation, modules, outcome, performance, status, years, icon: Icon, align }: any) => {
  return (
    <div className={`relative flex items-center mb-16 ${align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
       
       {/* Timeline Node */}
       <motion.div 
         initial={{ scale: 0 }}
         whileInView={{ scale: 1 }}
         viewport={{ once: true }}
         transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
         className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full border-2 border-cyan-400 bg-white dark:bg-[#05050f] shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center"
       >
          <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
       </motion.div>
    
       {/* Panel */}
       <motion.div 
         initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6, delay: 0.3 }}
         className={`ml-20 md:ml-0 md:w-[45%] ${align === 'left' ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}`}
       >
          <div className="relative p-6 bg-white/70 dark:bg-[#0a0a1a]/80 backdrop-blur-xl border border-cyan-200 dark:border-cyan-500/30 rounded-2xl group hover:border-cyan-400 dark:hover:border-cyan-400/50 transition-colors overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
             
             {/* Scanning Overlay */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 dark:via-cyan-400/5 to-transparent h-[200%] -translate-y-full group-hover:animate-[scan_2s_linear_infinite]" />
             <style>{`
               @keyframes scan {
                 0% { transform: translateY(-100%); }
                 100% { transform: translateY(50%); }
               }
             `}</style>
             
             <div className="flex justify-between items-start mb-5 relative z-10 border-b border-cyan-100 dark:border-cyan-900/50 pb-4">
                <div>
                   <p className="text-[10px] font-mono text-cyan-700 dark:text-cyan-500 tracking-widest font-semibold">{phase}</p>
                   <h3 className="text-lg sm:text-xl font-bold font-mono text-gray-900 dark:text-white mt-1 tracking-wide">{title}</h3>
                </div>
                <div className="text-right shrink-0 ml-4">
                   <span className="text-[9px] font-mono px-2 py-1 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/50 rounded whitespace-nowrap">
                     {years}
                   </span>
                </div>
             </div>
    
             <div className="mb-4 relative z-10">
                <p className="text-[10px] text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-1">INSTITUTION</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">{institution}</p>
             </div>
    
             <div className="mb-4 relative z-10">
                <p className="text-[10px] text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-1">CLASSIFICATION</p>
                <p className="text-sm font-mono text-cyan-700 dark:text-cyan-400 font-medium">{classification}</p>
             </div>
    
             {designation && (
               <div className="mb-4 relative z-10">
                  <p className="text-[10px] text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-1">DESIGNATION</p>
                  <p className="text-sm text-gray-800 dark:text-slate-200 font-medium">{designation}</p>
               </div>
             )}
    
             {modules && (
               <div className="mb-5 relative z-10">
                  <p className="text-[10px] text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2">MODULES COMPLETED</p>
                  <div className="flex flex-wrap gap-2">
                     {modules.map((m: string) => <span key={m} className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-300 rounded">{m}</span>)}
                  </div>
               </div>
             )}
    
             <div className="mb-6 relative z-10 bg-cyan-50/50 dark:bg-cyan-900/10 p-3 rounded-lg border border-cyan-100 dark:border-cyan-900/30">
                <p className="text-[10px] text-cyan-800 dark:text-cyan-500 uppercase tracking-widest mb-1.5 font-semibold">MISSION OUTCOME</p>
                <p className="text-[13px] text-gray-700 dark:text-slate-300 italic border-l-2 border-cyan-400 pl-3">&quot;{outcome}&quot;</p>
             </div>
    
             <div className="flex justify-between items-end relative z-10 pt-4 border-t border-cyan-100 dark:border-cyan-900/50">
                {performance && (
                   <div>
                     <p className="text-[10px] text-gray-500 dark:text-slate-500 tracking-widest mb-1 uppercase">PERFORMANCE INDEX</p>
                     <p className="text-sm font-bold font-mono text-cyan-700 dark:text-cyan-400">{performance}</p>
                   </div>
                )}
                <div className={performance ? "text-right" : "w-full text-right"}>
                   <p className="text-[10px] text-gray-500 dark:text-slate-500 tracking-widest mb-1 uppercase">STATUS</p>
                   <span className="text-xs font-bold font-mono text-green-600 dark:text-green-400 flex items-center justify-end space-x-1 tracking-wider">
                     <span>{status}</span>
                   </span>
                </div>
             </div>
    
          </div>
       </motion.div>
    </div>
  )
}

const KnowledgeMap = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  const nodes = [
    { id: 1, title: 'Data Structures & Algorithms', classification: 'COMPUTATIONAL LOGIC', acquired: 'Algorithmic efficiency and data manipulation.', relevance: 'Optimizing mission-critical system performance.', x: 15, y: 20 },
    { id: 2, title: 'Object-Oriented Programming', classification: 'SYSTEM ARCHITECTURE', acquired: 'Modular design and code reusability.', relevance: 'Building scalable spacecraft software systems.', x: 45, y: 15 },
    { id: 3, title: 'Database Systems', classification: 'DATA PERSISTENCE', acquired: 'SQL/NoSQL databases and schema modeling.', relevance: 'Securely storing mission telemetry and archives.', x: 75, y: 25 },
    { id: 4, title: 'Computer Networks', classification: 'COMMUNICATION PROTOCOLS', acquired: 'TCP/IP, routing, and data transmission.', relevance: 'Establishing reliable deep-space communications.', x: 25, y: 55 },
    { id: 5, title: 'Software Engineering', classification: 'DEVELOPMENT LIFECYCLE', acquired: 'Agile methodologies and CI/CD pipelines.', relevance: 'Executing structured engineering missions.', x: 55, y: 50 },
    { id: 6, title: 'Cloud Computing', classification: 'INFRASTRUCTURE', acquired: 'Distributed systems and AWS/GCP architecture.', relevance: 'Deploying global, highly-available mission servers.', x: 85, y: 60 },
    { id: 7, title: 'Machine Learning', classification: 'ARTIFICIAL INTELLIGENCE', acquired: 'Predictive modeling and neural networks.', relevance: 'Powering autonomous navigation and analysis.', x: 35, y: 85 },
    { id: 8, title: 'System Design', classification: 'SCALABILITY', acquired: 'Microservices and high-availability architecture.', relevance: 'Architecting resilient planetary-scale applications.', x: 65, y: 80 },
  ]

  const connections = [
    [1, 2], [1, 4], [2, 3], [2, 5], [3, 6], [4, 5], [4, 7], [5, 8], [6, 8], [7, 8]
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-24"
    >
      <div className="mb-10 text-center">
         <div className="inline-flex items-center space-x-2 mb-3">
            <Network className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-mono tracking-wide">KNOWLEDGE MODULES UNLOCKED</h3>
         </div>
         <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-mono tracking-widest">NEURAL NETWORK CONSTELLATION MAP</p>
      </div>

      {/* DESKTOP SVG NETWORK */}
      <div className="hidden lg:block relative w-full h-[600px] bg-white/50 dark:bg-[#0a0a1a]/50 backdrop-blur-xl border border-cyan-200 dark:border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        
        {/* Background Grid inside Map */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #06b6d4 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(([a, b], idx) => {
            const nodeA = nodes.find(n => n.id === a)
            const nodeB = nodes.find(n => n.id === b)
            if (!nodeA || !nodeB) return null
            return (
              <motion.line 
                key={idx}
                x1={`${nodeA.x}%`} y1={`${nodeA.y}%`}
                x2={`${nodeB.x}%`} y2={`${nodeB.y}%`}
                stroke="currentColor" 
                className="text-cyan-300 dark:text-cyan-500/50"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: idx * 0.1 }}
              />
            )
          })}
        </svg>

        {nodes.map(node => (
          <div 
            key={node.id} 
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-crosshair z-10"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* The Node Dot */}
            <div className="relative flex items-center justify-center">
               <div className={`absolute w-12 h-12 rounded-full border border-cyan-400/40 dark:border-cyan-500/30 scale-150 transition-all duration-300 ${hoveredNode === node.id ? 'animate-spin border-cyan-400 dark:border-cyan-400 border-t-transparent' : ''}`} />
               <div className={`w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] transition-transform duration-300 ${hoveredNode === node.id ? 'scale-150' : ''}`} />
               
               {/* Label (always visible) */}
               <div className="absolute top-6 whitespace-nowrap text-[10px] font-mono text-cyan-800 dark:text-cyan-200 font-semibold bg-white/70 dark:bg-black/70 px-2 py-0.5 rounded backdrop-blur-md pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity border border-cyan-200 dark:border-cyan-500/30">
                 {node.title}
               </div>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
               {hoveredNode === node.id && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                   className={`absolute top-12 ${node.x > 70 ? 'right-0' : node.x < 30 ? 'left-0' : 'left-1/2 -translate-x-1/2'} w-64 bg-white/95 dark:bg-[#05050f]/95 backdrop-blur-xl border border-cyan-300 dark:border-cyan-500/50 p-4 rounded-xl shadow-[0_10px_40px_rgba(6,182,212,0.15)] dark:shadow-[0_10px_40px_rgba(6,182,212,0.3)] z-50 pointer-events-none`}
                 >
                   <p className="text-[9px] text-cyan-700 dark:text-cyan-500 font-mono tracking-widest mb-2 border-b border-cyan-100 dark:border-cyan-900/50 pb-1.5 font-semibold">{node.classification}</p>
                   
                   <div className="mb-3">
                     <p className="text-[9px] text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-1">Knowledge Acquired</p>
                     <p className="text-xs text-gray-800 dark:text-slate-200 font-medium leading-relaxed">{node.acquired}</p>
                   </div>
                   
                   <div>
                     <p className="text-[9px] text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-1">Operational Relevance</p>
                     <p className="text-xs text-cyan-800 dark:text-cyan-400 italic">&quot;{node.relevance}&quot;</p>
                   </div>
                 </motion.div>
               )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* MOBILE STACKED NETWORK */}
      <div className="lg:hidden flex flex-col gap-4">
         {nodes.map((node, i) => (
            <motion.div 
               key={node.id} 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="p-5 bg-white/70 dark:bg-[#0a0a1a]/80 backdrop-blur-xl border border-cyan-200 dark:border-cyan-500/30 rounded-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400" />
               <p className="text-[10px] font-mono text-cyan-700 dark:text-cyan-500 tracking-widest mb-1.5 font-semibold">{node.classification}</p>
               <h4 className="text-sm font-bold text-gray-900 dark:text-white font-mono tracking-wide mb-4">{node.title}</h4>
               
               <div className="space-y-3">
                 <div>
                   <p className="text-[9px] text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-1">KNOWLEDGE</p>
                   <p className="text-xs text-gray-800 dark:text-slate-300 leading-relaxed">{node.acquired}</p>
                 </div>
                 <div>
                   <p className="text-[9px] text-gray-500 dark:text-slate-500 uppercase tracking-wider mb-1">RELEVANCE</p>
                   <p className="text-xs text-cyan-700 dark:text-cyan-400 italic">&quot;{node.relevance}&quot;</p>
                 </div>
               </div>
            </motion.div>
         ))}
      </div>
    </motion.div>
  )
}

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Adjusted offset so the line illuminates fully as you scroll past the timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'center center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const phases = [
    {
      phase: 'TRAINING PHASE ALPHA',
      title: 'FOUNDATIONAL SCIENCE TRAINING',
      institution: 'Capt. Ganga Singh Rawat IC',
      classification: 'SECONDARY SCIENTIFIC PROTOCOLS',
      modules: ['Physics', 'Chemistry', 'Mathematics'],
      outcome: 'Established analytical thinking, scientific reasoning, and problem-solving foundations required for future engineering missions.',
      status: 'ARCHIVED ✓',
      years: '2020 – 2022',
      icon: Satellite,
      align: 'left'
    },
    {
      phase: 'TRAINING PHASE BETA',
      title: 'ADVANCED COMPUTING PROGRAM',
      institution: PERSONAL_INFO.university,
      classification: 'SOFTWARE ENGINEERING DIRECTIVE',
      designation: PERSONAL_INFO.degree,
      outcome: 'Specialized in software engineering, system architecture, cloud computing, and modern application development.',
      performance: '8.0 CGPA',
      status: 'MISSION QUALIFIED ✓',
      years: '2022 – 2026',
      icon: Rocket,
      align: 'right'
    }
  ]

  return (
    <section ref={sectionRef} id="education" className="py-24 relative overflow-hidden bg-gray-50 dark:bg-[#05050f] transition-colors duration-500 min-h-screen">
      <EducationBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-500" />
            <h2 className="text-[11px] font-mono tracking-[0.3em] text-cyan-700 dark:text-cyan-500 uppercase font-semibold">
              Astronaut Training Archives
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-slate-400 font-mono tracking-tight">
            Educational Formation Before Launch Authorization
          </p>
        </motion.div>

        {/* Mission Progress Corridor (Timeline) */}
        <div className="relative max-w-4xl mx-auto mb-16">
          
          {/* Central orbital line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-cyan-200/50 dark:bg-cyan-900/50 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-cyan-400 dark:bg-cyan-500 shadow-[0_0_15px_#06b6d4] rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          {phases.map((phase, index) => (
            <ArchivePanel key={index} {...phase} />
          ))}
          
        </div>

        {/* Knowledge Modules Unlocked (Neural Network) */}
        <KnowledgeMap />

      </div>
    </section>
  )
}
