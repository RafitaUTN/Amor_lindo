'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moment } from '@/types'
import MomentCard from '@/components/MomentCard'
import MomentLightbox from '@/components/MomentLightbox'

interface MomentGridProps {
  items: Moment[]
}

export default function MomentGrid({ items }: MomentGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {items.map((moment, index) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <MomentCard moment={moment} onClick={() => setSelectedIndex(index)} />
          </motion.div>
        ))}
      </div>
      {selectedIndex !== null && (
        <MomentLightbox
          moments={items}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  )
}