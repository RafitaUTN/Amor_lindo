'use client'

import { motion } from 'framer-motion'
import { PlaylistItem } from '@/types'
import PlaylistCard from '@/components/PlaylistCard'

interface PlaylistGridProps {
  items: PlaylistItem[]
}

export default function PlaylistGrid({ items }: PlaylistGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <PlaylistCard item={item} />
        </motion.div>
      ))}
    </div>
  )
}
