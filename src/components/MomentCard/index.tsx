'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Heart } from 'lucide-react'
import { Moment } from '@/types'

interface MomentCardProps {
  moment: Moment
  onClick: () => void
}

export default function MomentCard({ moment, onClick }: MomentCardProps) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-label={moment.title}
      className="group relative w-full aspect-square rounded-xl overflow-hidden bg-[#181818] border border-[#2A2A2A] cursor-pointer"
    >
      <div className="absolute inset-0">
        <Image
          src={moment.image}
          alt={moment.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF4F81]/15 via-transparent to-[#1DB954]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="w-full">
          <div className="flex items-center justify-between gap-2 mb-2">
            {moment.favorite ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                <Heart className="w-3 h-3 text-[#FF4F81]" fill="currentColor" />
                Favorito
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
                Recuerdo
              </span>
            )}
            <span className="inline-flex items-center rounded-full bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
              Ver detalle
            </span>
          </div>
          <p className="text-white text-sm font-medium line-clamp-2">{moment.title}</p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#D1D1D1]">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{moment.location}</span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
