'use client'

import { motion } from 'framer-motion'

interface QuickAccessCardProps {
  title: string
  description: string
  icon: 'music' | 'image'
  onClick: () => void
}

export default function QuickAccessCard({ title, description, icon, onClick }: QuickAccessCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-label={title}
      className="relative group w-full bg-[#181818] rounded-2xl border border-[#2A2A2A] p-6 text-left overflow-hidden transition-all duration-300 hover:border-[#1DB954]/50 hover:shadow-lg hover:shadow-[#1DB954]/5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#1DB954]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon === 'music' ? (
            <svg className="w-6 h-6 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-[#FF4F81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        <h3 className="text-white font-semibold text-base group-hover:text-[#1DB954] transition-colors">
          {title}
        </h3>
        <p className="text-[#B3B3B3] text-xs mt-1">{description}</p>
      </div>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <div className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg shadow-[#1DB954]/20">
          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </motion.button>
  )
}
