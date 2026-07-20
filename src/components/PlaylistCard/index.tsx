'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Play } from 'lucide-react'
import { PlaylistItem } from '@/types'
import { usePlayer } from '@/hooks/usePlayer'

interface PlaylistCardProps {
  item: PlaylistItem
}

export default function PlaylistCard({ item }: PlaylistCardProps) {
  const { play, toggleFavorite, isFavorite } = usePlayer()
  const favorite = isFavorite(item.id)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative bg-[#181818] rounded-xl overflow-hidden border border-[#2A2A2A] transition-all duration-300 hover:bg-[#282828] hover:border-[#1DB954]/30 hover:shadow-xl hover:shadow-black/30 cursor-pointer"
      onClick={() => play(item)}
    >
      <div className="relative aspect-square overflow-hidden bg-[#282828]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <Image
          src={item.cover}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/18 via-transparent to-[#FF4F81]/12" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 z-20">
          <div className="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg shadow-[#1DB954]/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 text-black ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm truncate group-hover:text-[#1DB954] transition-colors">
              {item.title}
            </h3>
            <p className="text-[#B3B3B3] text-xs mt-1 line-clamp-2">{item.description}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(item.id)
            }}
            aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            className="ml-2 flex-shrink-0"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorite ? 'text-[#1DB954] fill-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#2A2A2A]">
          <span className="text-xs text-[#535353]">{item.artist}</span>
          <span className="text-xs text-[#535353]">{item.duration}</span>
        </div>
      </div>
    </motion.div>
  )
}
