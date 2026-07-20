'use client'

import { motion } from 'framer-motion'
import MessageSwitcher from '@/components/MessageSwitcher'
import bannerData from '@/data/banner.json'

export default function Banner() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-8 border border-[#2A2A2A] shadow-2xl shadow-black/25 bg-[#121212]">
      <div className="absolute inset-0 z-0 bg-[#0B0B0B]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(29,185,84,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,79,129,0.14),transparent_32%),linear-gradient(135deg,#050505_0%,#101010_46%,#050505_100%)]" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_24%,rgba(255,255,255,0)_76%,rgba(255,255,255,0.035)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_26%,rgba(255,255,255,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 z-10 bg-[linear-gradient(0deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_26%,rgba(255,255,255,0)_100%)]" />
      <div className="absolute left-0 top-0 h-full w-1/2 z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_70%)]" />
      <div className="absolute right-0 top-0 h-full w-1/2 z-10 bg-[linear-gradient(270deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_70%)]" />
      <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-[#1DB954]/12 blur-3xl z-10" />
      <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#FF4F81]/10 blur-3xl z-10" />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-20 min-h-[320px] md:min-h-[400px] flex items-center"
      >
        <div className="px-6 py-10 md:px-10 md:py-12 max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#B3B3B3] mb-5 backdrop-blur-sm">
            Playlist privada
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-xl">
            {bannerData.title}
          </h1>
          <MessageSwitcher />
        </div>
      </motion.div>
    </div>
  )
}
