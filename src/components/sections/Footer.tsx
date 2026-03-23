'use client'

import { motion } from 'framer-motion'
import { Github, Mail, Phone, Heart } from 'lucide-react'
import { PERSONAL_INFO } from '@/utils/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { href: PERSONAL_INFO.github, icon: Github, label: 'GitHub' },
    { href: `mailto:${PERSONAL_INFO.email}`, icon: Mail, label: 'Email' },
    { href: `tel:${PERSONAL_INFO.phone}`, icon: Phone, label: 'Phone' },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Wave divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
          <path
            d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,0 L0,0 Z"
            fill="currentColor"
            className="text-gray-900/5 dark:text-white/5"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text">Ateeshay Rawat</h3>
            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              Full Stack Developer & DevOps Specialist building production‑ready web and mobile apps.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Home', 'About', 'Skills', 'Education', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ x: 5, color: '#667eea' }}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  data-cursor="pointer"
                >
                  → {item}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-2">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors text-sm">
                <Mail className="h-4 w-4" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors text-sm">
                <Phone className="h-4 w-4" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            {/* Easter egg hint */}
            <p className="text-gray-600 text-xs mt-4">
              🎮 Try <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-400 text-xs">Ctrl+G</kbd> for a surprise!
            </p>
          </motion.div>
        </div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-4 pt-8 mt-8 border-t border-white/5"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.2, rotate: 5, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              data-cursor="pointer"
            >
              <link.icon className="h-5 w-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center pt-6 mt-6"
        >
          <p className="text-gray-500 text-sm flex items-center justify-center space-x-1">
            <span>© {currentYear} Ateeshay Rawat • Built with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 inline mx-1" fill="currentColor" />
            <span>and too much coffee ☕</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
