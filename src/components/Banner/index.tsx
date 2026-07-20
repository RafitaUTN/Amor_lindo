'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import MessageSwitcher from '@/components/MessageSwitcher'
import bannerData from '@/data/banner.json'

export default function Banner() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-8 border border-[#2A2A2A] shadow-2xl shadow-black/25 bg-[#121212]">
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerData.background}
          alt={bannerData.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-[#1DB954]/15 blur-3xl z-10" />
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
