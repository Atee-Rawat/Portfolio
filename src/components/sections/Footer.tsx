'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Mail, Phone, Terminal, ShieldAlert, Activity, Radar, Lock, Linkedin } from 'lucide-react'
import { PERSONAL_INFO } from '@/utils/constants'

const ClassifiedTerminal = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4"
    >
       <div className="absolute top-4 right-4 text-[10px] text-green-500 font-mono animate-pulse tracking-widest">CLASSIFIED CHANNEL ESTABLISHED</div>
       
       <div className="max-w-2xl w-full border border-green-500/30 bg-green-950/20 p-8 rounded shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
          
          <div className="flex items-center space-x-3 mb-8 border-b border-green-500/30 pb-4 relative z-10">
             <ShieldAlert className="w-6 h-6 text-green-500" />
             <h2 className="text-green-500 font-mono tracking-[0.2em] text-lg uppercase font-bold">MISSION COMMAND ACCESS GRANTED</h2>
          </div>

          <div className="space-y-4 font-mono text-green-400 text-sm relative z-10">
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>&gt; Welcome Commander.</motion.p>
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>&gt; Authenticating credentials...</motion.p>
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>&gt; Clearance Level: OMEGA</motion.p>
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}>&gt; Current Exploration Status:</motion.p>
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="pl-4 border-l-2 border-green-500/50 text-green-300 py-1">Expanding the technological frontier.</motion.p>
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5 }}>&gt; All systems nominal. Proceed with mission objectives.</motion.p>
          </div>

          <motion.button 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 7 }}
             onClick={onClose}
             className="mt-12 px-6 py-2.5 border border-green-500 text-green-500 font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-green-500 hover:text-black transition-colors relative z-10"
          >
             CLOSE TERMINAL
          </motion.button>
       </div>
    </motion.div>
  )
}

const FooterBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#020205] z-0">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#020205] to-[#010103] transition-colors duration-1000"></div>

    <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/5 blur-[150px] mix-blend-screen" />
    <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/5 blur-[150px] mix-blend-screen" />
    
    <div className="absolute inset-0 opacity-[0.03]" 
         style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '120px 120px' }}>
    </div>
  </div>
)

const NAV_LINKS = [
  { label: 'MISSION CONTROL', href: '#home' },
  { label: 'COMMANDER DOSSIER', href: '#about' },
  { label: 'SYSTEMS MATRIX', href: '#skills' },
  { label: 'TRAINING ARCHIVES', href: '#education' },
  { label: 'MISSION ARCHIVES', href: '#projects' },
  { label: 'COMMUNICATION TERMINAL', href: '#contact' }
]

const SOCIAL_SATELLITES = [
  { label: 'GITHUB SATELLITE', href: PERSONAL_INFO.github, icon: Github },
  { label: 'LINKEDIN RELAY', href: PERSONAL_INFO.linkedin || 'https://linkedin.com', icon: Linkedin },
  { label: 'EMAIL FREQUENCY', href: `mailto:${PERSONAL_INFO.email}`, icon: Mail }
]

export default function Footer() {
  const [terminalOpen, setTerminalOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Changed to Ctrl+M to preserve game launcher functionality on Ctrl+G
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault()
        setTerminalOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <footer className="relative overflow-hidden bg-[#020205] pt-24 pb-8">
      <FooterBackground />

      <AnimatePresence>
         {terminalOpen && <ClassifiedTerminal onClose={() => setTerminalOpen(false)} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Terminal Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-[10px] font-mono tracking-[0.4em] text-red-500 uppercase font-semibold">
              MISSION TERMINAL
            </h2>
          </div>
          <p className="text-xl text-gray-400 font-mono tracking-widest uppercase">
            End of Transmission
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Left Panel: Commander Data */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-3">
              <Terminal className="w-4 h-4 text-blue-500" />
              <h3 className="text-xs font-mono text-white tracking-[0.2em] uppercase font-bold">Commander Profile</h3>
            </div>
            <div className="space-y-5">
               <div>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">MISSION DESIGNATION</p>
                  <p className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">ATEESHAY RAWAT</p>
               </div>
               <div>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">CURRENT ROLE</p>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-mono text-gray-300 uppercase tracking-wider">FULL STACK ENGINEER</p>
                    <p className="text-[10px] font-mono text-gray-300 uppercase tracking-wider">SYSTEMS ENGINEER</p>
                    <p className="text-[10px] font-mono text-gray-300 uppercase tracking-wider">AI EXPLORER</p>
                  </div>
               </div>
               <div>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">MISSION STATUS</p>
                  <p className="text-[10px] font-mono text-green-500 font-bold uppercase tracking-widest flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />ACTIVE</p>
               </div>
               <div>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">CURRENT LOCATION</p>
                  <p className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">EARTH ORBIT</p>
               </div>
               <div>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">MISSION OBJECTIVE</p>
                  <p className="text-[10px] font-mono text-gray-400 leading-relaxed italic border-l-2 border-white/10 pl-3">&quot;Building scalable digital systems for the next technological frontier.&quot;</p>
               </div>
            </div>
          </motion.div>

          {/* Center Panel: Navigation System */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-3">
              <Radar className="w-4 h-4 text-purple-500" />
              <h3 className="text-xs font-mono text-white tracking-[0.2em] uppercase font-bold">Navigation System</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {NAV_LINKS.map(link => (
                 <a key={link.label} href={link.href} className="group relative flex items-center py-2.5 px-3 hover:bg-white/5 border border-transparent hover:border-white/10 rounded transition-colors overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-purple-500 mr-3 transition-colors ml-1" />
                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-white uppercase tracking-widest relative z-10 transition-colors">{link.label}</span>
                    <div className="absolute right-3 opacity-0 group-hover:opacity-100 text-[8px] font-mono text-purple-400 tracking-widest transition-opacity">ORBIT LOCK</div>
                 </a>
              ))}
            </div>
          </motion.div>

          {/* Right Panel: Communication Array */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-3">
              <Activity className="w-4 h-4 text-green-500" />
              <h3 className="text-xs font-mono text-white tracking-[0.2em] uppercase font-bold">Communication Array</h3>
            </div>
            <div className="space-y-5">
              <div>
                 <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">PRIMARY COMMUNICATION FREQUENCY</p>
                 <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[10px] sm:text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center bg-white/5 px-3 py-2 rounded border border-white/5 hover:border-blue-500/30"><Mail className="w-3 h-3 mr-2 shrink-0" /><span className="truncate">{PERSONAL_INFO.email}</span></a>
              </div>
              <div>
                 <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">VOICE CHANNEL</p>
                 <a href={`tel:${PERSONAL_INFO.phone}`} className="text-[10px] sm:text-xs font-mono text-gray-300 hover:text-white transition-colors flex items-center bg-white/5 px-3 py-2 rounded border border-white/5 hover:border-gray-400/30"><Phone className="w-3 h-3 mr-2 shrink-0" />{PERSONAL_INFO.phone}</a>
              </div>
              <div>
                 <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">WHATSAPP RELAY</p>
                 <a href={`https://wa.me/${PERSONAL_INFO.phone.replace(/\D/g, '')}`} className="text-[10px] sm:text-xs font-mono text-[#25d366] hover:text-[#25d366]/80 transition-colors flex items-center bg-white/5 px-3 py-2 rounded border border-white/5 hover:border-[#25d366]/30">WHATSAPP CONNECTION LINK</a>
              </div>
              
              <div className="pt-4 border-t border-white/10 mt-6 bg-white/5 p-4 rounded-lg">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">NETWORK STATUS</span>
                    <span className="text-[10px] font-mono text-green-500 font-bold tracking-widest">ONLINE</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">SIGNAL QUALITY</span>
                    <span className="text-[10px] font-mono text-blue-400 tracking-widest">EXCELLENT</span>
                 </div>
              </div>
              
              <div className="pt-2">
                <p className="text-[9px] font-mono text-gray-500 tracking-[0.2em] flex flex-col sm:flex-row sm:items-center">
                   <span className="flex items-center mb-1.5 sm:mb-0"><Lock className="w-3 h-3 mr-1.5" /> PRESS</span>
                   <kbd className="mx-0 sm:mx-1.5 px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-300 inline-block w-fit mb-1.5 sm:mb-0">CTRL+M</kbd> 
                   <span>FOR CLASSIFIED ACCESS</span>
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Mission Summary Console */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 border border-white/10 p-6 rounded-xl mt-16 backdrop-blur-md"
        >
           <div className="text-center p-2">
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">MISSIONS COMPLETED</p>
              <p className="text-xl sm:text-2xl font-mono text-white font-bold">10+</p>
           </div>
           <div className="text-center p-2">
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">TECHNOLOGY SECTORS</p>
              <p className="text-xl sm:text-2xl font-mono text-blue-400 font-bold">20+</p>
           </div>
           <div className="text-center p-2">
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">ACTIVE DEPLOYMENTS</p>
              <p className="text-xl sm:text-2xl font-mono text-purple-400 font-bold">3</p>
           </div>
           <div className="text-center p-2">
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">SYSTEM STATUS</p>
              <p className="text-xl sm:text-2xl font-mono text-green-500 font-bold">NOMINAL</p>
           </div>
        </motion.div>

        {/* Social Satellites */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-10 sm:gap-16 mt-20"
        >
           {SOCIAL_SATELLITES.map(sat => (
              <a key={sat.label} href={sat.href} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center">
                 <div className="absolute inset-0 w-16 h-16 -m-3 border border-dashed border-gray-800 rounded-full group-hover:animate-[spin_4s_linear_infinite] group-hover:border-blue-500/50 transition-colors" />
                 <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <sat.icon className="w-4 h-4" />
                 </div>
                 <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity absolute top-full whitespace-nowrap bg-black/90 border border-blue-500/30 px-3 py-2 rounded flex flex-col items-center shadow-xl">
                    <p className="text-[8px] font-mono text-blue-400 tracking-widest font-bold mb-1">SIGNAL LOCK ACQUIRED</p>
                    <p className="text-[7px] font-mono text-gray-400 tracking-widest uppercase">{sat.label}</p>
                 </div>
              </a>
           ))}
        </motion.div>

        {/* Bottom Terminal Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left"
        >
           <div className="flex flex-col space-y-1.5">
              <p className="text-[10px] font-mono text-red-500 uppercase tracking-[0.2em] font-bold">MISSION LOG CLOSED</p>
              <p className="text-[8px] sm:text-[9px] font-mono text-gray-500 uppercase tracking-widest">COMMANDER: ATEESHAY RAWAT • SPACE EXPLORATION PORTFOLIO</p>
           </div>
           <div className="flex flex-col space-y-1.5 sm:text-right items-center sm:items-end">
              <p className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em] font-bold">TRANSMISSION TERMINATED</p>
              <p className="text-[8px] sm:text-[9px] font-mono text-gray-500 uppercase tracking-widest flex items-center">
                 <span className="w-1 h-1 bg-gray-500 rounded-full mr-2" />
                 FINAL SIGNAL RECEIVED FROM EARTH ORBIT
              </p>
           </div>
        </motion.div>

      </div>
    </footer>
  )
}
