'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Send, CheckCircle, AlertCircle, Radio, Activity, Globe, Satellite } from 'lucide-react'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import { PERSONAL_INFO } from '@/utils/constants'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className || "h-5 w-5"} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
)

const CHANNELS = [
  { designation: 'PRIMARY COMMUNICATION FREQUENCY', type: 'EMAIL CHANNEL', value: PERSONAL_INFO.email, icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, status: 'ONLINE', color: 'text-blue-500' },
  { designation: 'DIRECT VOICE CHANNEL', type: 'SECURE AUDIO LINK', value: PERSONAL_INFO.phone, icon: Phone, href: `tel:${PERSONAL_INFO.phone}`, status: 'AVAILABLE', color: 'text-green-500' },
  { designation: 'REAL-TIME COMMUNICATION NODE', type: 'WHATSAPP RELAY', value: PERSONAL_INFO.phone, icon: WhatsAppIcon, href: `https://wa.me/${PERSONAL_INFO.phone.replace(/\D/g, '')}`, status: 'ACTIVE', color: 'text-[#25d366]' },
]

const CommunicationBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gray-50 dark:bg-[#020205] transition-colors duration-500 z-0">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-gray-50 to-white dark:from-blue-900/10 dark:via-[#05050f] dark:to-[#020205] transition-colors duration-500"></div>

    {/* Communication Grid Overlay */}
    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
         style={{ backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`, backgroundSize: '80px 80px' }}>
    </div>

    {/* Radar Rings */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-blue-200 dark:border-blue-500/10 rounded-full opacity-20" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-blue-200 dark:border-blue-500/10 rounded-full opacity-30 border-dashed animate-[spin_60s_linear_infinite]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] border border-blue-300 dark:border-blue-500/20 rounded-full opacity-40 animate-[spin_40s_linear_infinite_reverse]" />
  </div>
)

const MissionAvailability = () => (
  <div className="bg-white/60 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/30 rounded-2xl p-6 mb-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-none">
    <div className="flex items-center space-x-3 mb-6 border-b border-blue-200 dark:border-blue-900/50 pb-4">
      <Activity className="w-5 h-5 text-blue-600 dark:text-blue-500 animate-pulse" />
      <h3 className="text-sm font-mono text-blue-800 dark:text-blue-300 tracking-widest font-semibold">MISSION AVAILABILITY PANEL</h3>
    </div>
    
    <div className="space-y-4">
       <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-gray-500 dark:text-slate-400 tracking-widest uppercase">CURRENT STATUS</span>
          <span className="text-[10px] sm:text-xs font-mono text-green-600 dark:text-green-400 font-bold flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-2"/>OPEN FOR MISSIONS</span>
       </div>
       <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-gray-500 dark:text-slate-400 tracking-widest uppercase">LOCATION</span>
          <span className="text-[10px] sm:text-xs font-mono text-blue-700 dark:text-blue-400">EARTH ORBIT</span>
       </div>
       <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-gray-500 dark:text-slate-400 tracking-widest uppercase">RESPONSE TIME</span>
          <span className="text-[10px] sm:text-xs font-mono text-blue-700 dark:text-blue-400">&lt; 24 HOURS</span>
       </div>
       <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-gray-500 dark:text-slate-400 tracking-widest uppercase">COLLABORATION</span>
          <span className="text-[10px] sm:text-xs font-mono text-blue-700 dark:text-blue-400 text-right">ACCEPTING EXPEDITIONS</span>
       </div>
       <div className="flex justify-between items-center pt-2 border-t border-blue-100 dark:border-blue-900/50">
          <span className="text-[10px] font-mono text-gray-500 dark:text-slate-400 tracking-widest uppercase">SYSTEM HEALTH</span>
          <span className="text-xs font-mono text-green-600 dark:text-green-400 font-bold">100%</span>
       </div>
    </div>
  </div>
)

const TransmissionAnimation = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-white/95 dark:bg-[#050510]/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center rounded-3xl"
  >
    <div className="relative w-32 h-32 mb-8">
       {/* Orbital Path */}
       <svg className="w-full h-full animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-200 dark:text-blue-900/50" />
          <circle cx="50" cy="5" r="4" className="fill-blue-500 dark:fill-blue-400 shadow-[0_0_15px_#3b82f6]" />
       </svg>
       {/* Central Node */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-50 dark:bg-green-500/20 rounded-full flex items-center justify-center border border-green-200 dark:border-green-500/50">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
       </div>
    </div>
    
    <motion.p 
       initial={{ y: 20, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ delay: 0.3 }}
       className="text-lg font-mono font-bold text-green-600 dark:text-green-400 mb-2 tracking-widest text-center"
    >
       TRANSMISSION SUCCESSFUL
    </motion.p>
    <motion.p 
       initial={{ y: 20, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ delay: 0.6 }}
       className="text-[10px] font-mono text-gray-500 dark:text-slate-400 tracking-widest uppercase text-center max-w-xs"
    >
       MISSION COMMAND HAS RECEIVED YOUR SIGNAL. EXPECT RESPONSE SHORTLY.
    </motion.p>
  </motion.div>
)

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const onSubmit = async (data: FormData) => {
    try {
      setStatus('idle')

      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        setStatus('error')
        return
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_email: PERSONAL_INFO.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 6000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const inputClasses = "w-full px-4 py-3.5 bg-white/50 dark:bg-[#050510]/50 border border-blue-200 dark:border-blue-500/30 rounded-xl text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-colors"

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gray-50 dark:bg-[#020205] transition-colors duration-500 min-h-screen">
      <CommunicationBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Satellite className="w-4 h-4 text-blue-600 dark:text-blue-500 animate-[bounce_3s_infinite]" />
            <h2 className="text-[11px] font-mono tracking-[0.3em] text-blue-700 dark:text-blue-500 uppercase font-semibold">
              Deep Space Communication Terminal
            </h2>
          </div>
          <p className="text-xl md:text-3xl text-gray-900 dark:text-white font-mono tracking-tight font-bold max-w-2xl mx-auto">
            Establish Contact With Mission Command
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Transmission Console */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative bg-white/70 dark:bg-[#0a0a1a]/80 backdrop-blur-2xl border border-blue-200 dark:border-blue-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden min-h-[500px]">
               
               <AnimatePresence>
                 {status === 'success' && <TransmissionAnimation />}
               </AnimatePresence>

               {/* Scanning Overlay */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 dark:via-blue-400/10 to-transparent h-[200%] -translate-y-full animate-[scan_4s_linear_infinite] pointer-events-none" />

               {/* HUD Status Bar */}
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-blue-100 dark:border-blue-900/50 pb-5 mb-8 gap-4 relative z-10">
                  <div className="flex items-center space-x-3">
                     <Radio className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                     <h3 className="text-sm font-mono text-blue-800 dark:text-blue-300 tracking-widest font-bold">TRANSMISSION CONSOLE</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono tracking-widest">
                     <span className="text-green-600 dark:text-green-400 font-bold flex items-center"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />SIGNAL: EXCELLENT</span>
                     <span className="text-blue-600 dark:text-blue-400 flex items-center"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5" />UPLINK: ACTIVE</span>
                  </div>
               </div>

               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div>
                     <label className="block text-[10px] font-mono text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-semibold">CALL SIGN (NAME)</label>
                     <input 
                       {...register('name', { required: 'CALL SIGN IS REQUIRED' })} 
                       type="text" 
                       placeholder="Enter your Call Sign..."
                       className={inputClasses} 
                     />
                     {errors.name && <p className="text-red-500 text-[10px] font-mono mt-1.5">* {errors.name.message}</p>}
                  </div>
                  
                  <div>
                     <label className="block text-[10px] font-mono text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-semibold">COMMUNICATION FREQUENCY (EMAIL)</label>
                     <input 
                       {...register('email', {
                         required: 'FREQUENCY IS REQUIRED',
                         pattern: { value: /^\S+@\S+$/i, message: 'INVALID FREQUENCY FORMAT' },
                       })} 
                       type="email" 
                       placeholder="Enter your return frequency..."
                       className={inputClasses} 
                     />
                     {errors.email && <p className="text-red-500 text-[10px] font-mono mt-1.5">* {errors.email.message}</p>}
                  </div>

                  <div>
                     <label className="block text-[10px] font-mono text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-semibold">TRANSMISSION SUBJECT</label>
                     <input 
                       {...register('subject', { required: 'SUBJECT IS REQUIRED' })} 
                       type="text" 
                       placeholder="What is the nature of your transmission?"
                       className={inputClasses} 
                     />
                     {errors.subject && <p className="text-red-500 text-[10px] font-mono mt-1.5">* {errors.subject.message}</p>}
                  </div>

                  <div>
                     <label className="block text-[10px] font-mono text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-semibold">MISSION BRIEFING (MESSAGE)</label>
                     <textarea 
                       {...register('message', { required: 'BRIEFING IS REQUIRED' })} 
                       rows={5} 
                       placeholder="Detail your mission request here..."
                       className={`${inputClasses} resize-none`} 
                     />
                     {errors.message && <p className="text-red-500 text-[10px] font-mono mt-1.5">* {errors.message.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono text-[11px] sm:text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                     {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>TRANSMITTING DATA...</span>
                        </>
                     ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>INITIATE TRANSMISSION</span>
                        </>
                     )}
                  </button>

                  {status === 'error' && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400 text-[10px] sm:text-xs font-mono bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mt-4 border border-red-200 dark:border-red-900/50"
                     >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>TRANSMISSION FAILED. PLEASE RETRY OR USE ALTERNATIVE CHANNELS.</span>
                     </motion.div>
                  )}
               </form>
            </div>
          </motion.div>

          {/* Right Side: Communication Channels */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
             <MissionAvailability />

             <div className="space-y-4">
               <div className="mb-6 px-2">
                  <div className="inline-flex items-center space-x-2 mb-2">
                     <Globe className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white font-mono tracking-wide">ACTIVE CHANNELS</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-mono leading-relaxed">Mission Command remains available for collaboration requests, engineering discussions, and future expeditions.</p>
               </div>

               {CHANNELS.map((channel, index) => (
                  <motion.a 
                     key={channel.designation}
                     href={channel.href} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: index * 0.1 }}
                     className="block bg-white/70 dark:bg-[#0a0a1a]/80 backdrop-blur-xl border border-blue-100 dark:border-blue-500/20 rounded-2xl p-5 hover:border-blue-400 dark:hover:border-blue-400/60 transition-colors group shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none"
                  >
                     <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                           <div className={`p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 ${channel.color} group-hover:scale-110 transition-transform`}>
                              <channel.icon className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-[9px] font-mono text-gray-500 dark:text-slate-500 tracking-widest uppercase mb-1">{channel.type}</p>
                              <p className="text-sm font-bold font-mono text-gray-900 dark:text-slate-200 mb-1 tracking-wide">{channel.designation}</p>
                              <p className="text-[10px] sm:text-xs font-mono text-blue-600 dark:text-blue-400 truncate max-w-[150px] sm:max-w-[200px]">{channel.value}</p>
                           </div>
                        </div>
                        <div className="shrink-0 ml-2 hidden sm:block">
                           <span className="text-[8px] font-mono px-2 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded flex items-center tracking-widest font-semibold">
                             <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                             {channel.status}
                           </span>
                        </div>
                     </div>
                  </motion.a>
               ))}
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
