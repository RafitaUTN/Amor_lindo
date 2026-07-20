'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Heart } from 'lucide-react'
import profileData from '@/data/profile.json'

interface ProfilePopoverProps {
  subtitle: string
}

export default function ProfilePopover({ subtitle }: ProfilePopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Perfil"
        className="flex items-center gap-3 hover:bg-[#2A2A2A] rounded-full p-1.5 pr-4 transition-colors text-left"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-[#1DB954]">
          <Image
            src={profileData.avatar}
            alt={profileData.displayName}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
        <div className="hidden sm:flex flex-col leading-tight min-w-0">
          <span className="text-sm text-white font-medium truncate">{profileData.displayName}</span>
          <span className="text-xs text-[#B3B3B3] truncate">{subtitle}</span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-72 bg-[#282828] rounded-xl border border-[#3E3E3E] shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-[#1DB954]">
                    <Image
                      src={profileData.avatar}
                      alt={profileData.displayName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{profileData.displayName}</p>
                    <p className="text-[#B3B3B3] text-xs">@yeyis</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-[#1DB954]" />
                    <div>
                      <p className="text-[#B3B3B3] text-xs">Desde</p>
                      <p className="text-white text-sm">{profileData.sinceLabel || profileData.since}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Heart className="w-4 h-4 text-[#FF4F81]" />
                    <div>
                      <p className="text-[#B3B3B3] text-xs">Juntos</p>
                      <p className="text-white text-sm">{profileData.togetherLabel || '11 meses y 23 días'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}