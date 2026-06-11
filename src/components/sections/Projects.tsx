'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Database, Satellite, Radar } from 'lucide-react'

const MISSION_DATA = [
  {
    id: "001",
    designation: "IDEIACARD",
    classification: "STUDENT MANAGEMENT ECOSYSTEM",
    objective: "Develop a modern educational platform featuring authentication, student management workflows, and facial recognition capabilities.",
    sectors: ["Full Stack Engineering", "Biometric Authentication", "Mobile App Development", "Database Architecture"],
    status: "SUCCESSFULLY DEPLOYED",
    statusColor: "text-green-600 dark:text-green-400 border-green-500/30 bg-green-50 dark:bg-green-500/10",
    deployment: "https://ideiacard.com.br/",
    blueprint: "https://github.com/Atee-Rawat",
    outcome: "Delivered a centralized academic management system with advanced identification and authentication capabilities.",
    telemetry: [
      { label: "SYSTEM COMPLEXITY", value: 85 },
      { label: "OPERATIONAL READINESS", value: 100 },
      { label: "SCALABILITY INDEX", value: 92 },
      { label: "ACTIVE USERS", value: 78 }
    ]
  },
  {
    id: "002",
    designation: "PORTFOLIO",
    classification: "PERSONAL COMMAND INTERFACE",
    objective: "Design and deploy a personal mission control center showcasing projects, skills, technical capabilities, and future explorations.",
    sectors: ["Frontend Architecture", "UI/UX Design", "Animation Systems", "Responsive Layouts"],
    status: "ACTIVE TRANSMISSION",
    statusColor: "text-indigo-600 dark:text-indigo-400 border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10",
    deployment: "https://ateeshay-rawat.netlify.app/",
    blueprint: "https://github.com/Atee-Rawat/PortFolio",
    outcome: "Established a digital command hub for documenting technological expeditions.",
    telemetry: [
      { label: "SYSTEM COMPLEXITY", value: 65 },
      { label: "OPERATIONAL READINESS", value: 100 },
      { label: "SCALABILITY INDEX", value: 88 },
      { label: "MISSION DURATION", value: 45 }
    ]
  },
  {
    id: "003",
    designation: "CAMPUSCRAVINGS",
    classification: "DIGITAL FOOD DISTRIBUTION NETWORK",
    objective: "Build a scalable food ordering ecosystem optimized for university environments.",
    sectors: ["MERN Stack", "React Native", "Real-time Operations", "Payment Gateways"],
    status: "DEPLOYED ACROSS COLONY",
    statusColor: "text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/10",
    deployment: "https://campuscravings-1-bso7.onrender.com/admin/login",
    blueprint: "https://github.com/Atee-Rawat/CampusCravings",
    outcome: "Connected users with campus dining resources through a streamlined digital experience.",
    telemetry: [
      { label: "SYSTEM COMPLEXITY", value: 80 },
      { label: "OPERATIONAL READINESS", value: 95 },
      { label: "SCALABILITY INDEX", value: 85 },
      { label: "DATA PROCESSED", value: 60 }
    ]
  },
  {
    id: "004",
    designation: "PRODUCTIVITY OS",
    classification: "PERSONAL OPERATIONS PLATFORM",
    objective: "Create a unified productivity environment for planning, tracking, and executing operational goals.",
    sectors: ["MERN Stack", "State Management", "Workflow Automation", "API Integration"],
    status: "MISSION COMPLETE",
    statusColor: "text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-50 dark:bg-purple-500/10",
    deployment: "https://productivity-os.vercel.app/",
    blueprint: "https://github.com/Atee-Rawat",
    outcome: "Improved personal workflow management and operational efficiency.",
    telemetry: [
      { label: "SYSTEM COMPLEXITY", value: 75 },
      { label: "OPERATIONAL READINESS", value: 100 },
      { label: "SCALABILITY INDEX", value: 70 },
      { label: "MISSION DURATION", value: 55 }
    ]
  }
]

const MissionBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gray-50 dark:bg-[#05050f] transition-colors duration-500 z-0">
    {/* Deep Space Gradients */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-50/50 via-gray-50 to-white dark:from-indigo-900/10 dark:via-[#05050f] dark:to-[#020205] transition-colors duration-500"></div>

    {/* Holographic Navigation Grid */}
    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
         style={{ backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`, backgroundSize: '100px 100px' }}>
    </div>

    {/* Distant Nebulas / Planetary Silhouettes */}
    <motion.div 
      className="absolute top-[30%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-400/10 dark:bg-indigo-900/20 blur-[150px]"
      animate={{ opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div 
      className="absolute bottom-[20%] left-[-20%] w-[50vw] h-[50vw] rounded-full bg-purple-400/10 dark:bg-purple-900/20 blur-[120px]"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
    />
  </div>
)

const TelemetryBar = ({ label, value, delay }: { label: string, value: number, delay: number }) => (
  <div className="mb-4">
    <div className="flex justify-between items-end mb-1.5">
      <p className="text-[9px] font-mono text-gray-500 dark:text-slate-400 tracking-widest">{label}</p>
      <p className="text-[10px] font-mono text-indigo-700 dark:text-indigo-400 font-bold">{value}%</p>
    </div>
    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-indigo-500 dark:bg-indigo-500 shadow-[0_0_10px_#6366f1]"
        initial={{ width: '0%' }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
      />
    </div>
  </div>
)

const MissionDossier = ({ mission, index }: { mission: any, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative w-full max-w-6xl mx-auto mb-16 group"
    >
      {/* Container Background */}
      <div className="relative bg-white/70 dark:bg-[#0a0a1a]/80 backdrop-blur-2xl border border-indigo-200 dark:border-indigo-500/30 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:border-indigo-400 dark:hover:border-indigo-400/60 transition-colors">
        
        {/* Scanning Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-400/5 dark:via-indigo-400/10 to-transparent h-[200%] -translate-y-full group-hover:animate-[scan_3s_linear_infinite]" />

        {/* Top Header Bar */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-indigo-100 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-900/10">
           <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                 <div className="w-2 h-2 rounded-full bg-indigo-500/60 animate-pulse" />
                 <div className="w-2 h-2 rounded-full bg-indigo-500/30" />
                 <div className="w-2 h-2 rounded-full bg-indigo-500/30" />
              </div>
              <p className="text-[10px] font-mono text-indigo-800 dark:text-indigo-300 tracking-[0.2em] font-semibold">MISSION {mission.id}</p>
           </div>
           <p className="text-[9px] font-mono text-gray-500 dark:text-slate-500 tracking-widest hidden sm:block">SECURE CONNECTION ESTABLISHED</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
           
           {/* Left Column: Core Data */}
           <div className="lg:col-span-8 p-6 sm:p-10">
              <p className="text-[11px] font-mono text-gray-500 dark:text-slate-400 tracking-widest uppercase mb-1.5">DESIGNATION</p>
              <h3 className="text-3xl sm:text-4xl font-bold font-mono text-gray-900 dark:text-white tracking-tight mb-2 uppercase">{mission.designation}</h3>
              <p className="text-sm font-mono text-indigo-700 dark:text-indigo-400 tracking-widest mb-8 uppercase font-semibold">{mission.classification}</p>
              
              <div className="mb-8">
                <p className="text-[10px] text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2 font-semibold">MISSION OBJECTIVE</p>
                <p className="text-sm sm:text-base text-gray-800 dark:text-slate-300 leading-relaxed font-mono">{mission.objective}</p>
              </div>

              <div className="mb-8">
                <p className="text-[10px] text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-3 font-semibold">TECHNOLOGY SECTORS</p>
                <div className="flex flex-wrap gap-2">
                   {mission.sectors.map((sector: string) => (
                      <span key={sector} className="text-[10px] font-mono px-3 py-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-300 rounded uppercase tracking-wider">{sector}</span>
                   ))}
                </div>
              </div>

              <div className="mb-10 bg-indigo-50/80 dark:bg-indigo-900/20 border-l-2 border-indigo-500 p-4 rounded-r-lg">
                <p className="text-[10px] text-indigo-800 dark:text-indigo-400 uppercase tracking-widest mb-1.5 font-semibold">MISSION OUTCOME</p>
                <p className="text-[13px] sm:text-sm text-gray-800 dark:text-slate-300 italic font-mono leading-relaxed">"{mission.outcome}"</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                 {mission.deployment && (
                   <a href={mission.deployment} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-lg text-[11px] font-mono tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]">
                      <Satellite className="w-4 h-4" />
                      <span>VIEW ACTIVE DEPLOYMENT</span>
                   </a>
                 )}
                 {mission.blueprint && (
                   <a href={mission.blueprint} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-2 bg-white dark:bg-transparent border border-gray-300 dark:border-indigo-500/50 hover:border-indigo-500 dark:hover:border-indigo-400 text-gray-800 dark:text-indigo-300 px-6 py-3.5 rounded-lg text-[11px] font-mono tracking-widest uppercase transition-all hover:bg-gray-50 dark:hover:bg-indigo-900/10">
                      <Database className="w-4 h-4" />
                      <span>ACCESS MISSION BLUEPRINTS</span>
                   </a>
                 )}
              </div>
           </div>

           {/* Right Column: Telemetry & Status */}
           <div className="lg:col-span-4 p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-indigo-100 dark:border-indigo-500/20 bg-gray-50/50 dark:bg-[#050510]/50 relative overflow-hidden">
              {/* Radar background graphic */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 border border-indigo-200 dark:border-indigo-500/10 rounded-full opacity-30 pointer-events-none flex items-center justify-center">
                 <div className="w-48 h-48 border border-indigo-200 dark:border-indigo-500/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <div className="w-full h-px bg-indigo-500/50" />
                 </div>
                 <div className="absolute w-32 h-32 border border-indigo-200 dark:border-indigo-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed" />
              </div>

              <div className="relative z-10">
                 <p className="text-[10px] font-mono text-gray-500 dark:text-slate-500 tracking-widest uppercase mb-3 font-semibold">MISSION STATUS</p>
                 <div className={`inline-flex items-center px-3 py-1.5 border rounded-md mb-8 ${mission.statusColor}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-2" />
                    <span className="text-[10px] font-mono font-bold tracking-widest">{mission.status}</span>
                 </div>

                 {mission.deployment && (
                   <div className="mb-8">
                     <p className="text-[10px] font-mono text-gray-500 dark:text-slate-500 tracking-widest uppercase mb-1.5 font-semibold">DEPLOYMENT COORDINATES</p>
                     <p className="text-xs font-mono text-indigo-700 dark:text-indigo-400 truncate bg-white/50 dark:bg-black/30 px-2 py-1.5 rounded border border-indigo-100 dark:border-indigo-900/50">{mission.deployment.replace('https://', '').replace(/\/$/, '')}</p>
                   </div>
                 )}

                 <div className="mb-4">
                    <p className="text-[10px] font-mono text-gray-500 dark:text-slate-500 tracking-widest uppercase mb-5 font-semibold border-b border-indigo-200 dark:border-indigo-900/50 pb-2">MISSION TELEMETRY</p>
                    
                    {mission.telemetry.map((t: any, i: number) => (
                       <TelemetryBar key={t.label} label={t.label} value={t.value} delay={0.4 + (i * 0.1)} />
                    ))}
                 </div>
              </div>
           </div>

        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  
  return (
    <section ref={sectionRef} id="projects" className="py-24 relative overflow-hidden bg-gray-50 dark:bg-[#05050f] transition-colors duration-500 min-h-screen">
       <MissionBackground />
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center space-x-2 mb-4">
              <Radar className="w-4 h-4 text-indigo-600 dark:text-indigo-500 animate-[spin_4s_linear_infinite]" />
              <h2 className="text-[11px] font-mono tracking-[0.3em] text-indigo-700 dark:text-indigo-500 uppercase font-semibold">
                Mission Archives
              </h2>
            </div>
            <p className="text-xl md:text-3xl text-gray-900 dark:text-white font-mono tracking-tight font-bold max-w-2xl mx-auto">
              Documented Expeditions Across the Technological Frontier
            </p>
          </motion.div>

          {/* Dossiers */}
          <div className="space-y-4">
             {MISSION_DATA.map((mission, index) => (
                <MissionDossier key={mission.id} mission={mission} index={index} />
             ))}
          </div>

          {/* End of Archives marker */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 border-t border-indigo-200 dark:border-indigo-900/50 pt-8 max-w-sm mx-auto"
          >
            <p className="text-[10px] font-mono text-gray-500 dark:text-slate-500 tracking-widest uppercase">END OF MISSION ARCHIVES</p>
            <div className="w-1 h-8 bg-indigo-200 dark:bg-indigo-900/50 mx-auto mt-4 rounded-full" />
          </motion.div>

       </div>
    </section>
  )
}