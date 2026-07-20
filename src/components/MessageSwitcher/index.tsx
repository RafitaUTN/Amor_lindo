'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LetterModal from '@/components/LetterModal'
import messagesData from '@/data/messages.json'
import bannerData from '@/data/banner.json'

export default function MessageSwitcher() {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * messagesData.length))
  const [showLetter, setShowLetter] = useState(false)
  const [lastIndex, setLastIndex] = useState<number | null>(null)

  const changeMessage = useCallback(() => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * messagesData.length)
    } while (messagesData.length > 1 && (newIndex === lastIndex || newIndex === currentIndex))
    setCurrentIndex(newIndex)
    setLastIndex(newIndex)
  }, [currentIndex, lastIndex])

  return (
    <>
      <div className="mb-6 min-h-[72px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-base md:text-lg text-[#E5E5E5] leading-relaxed max-w-xl"
          >
            {messagesData[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={changeMessage}
          aria-label="Cambiar mensaje"
          className="px-6 py-2.5 bg-[#1DB954] text-black font-semibold rounded-full text-sm hover:bg-[#1ed760] transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {bannerData.buttons[0]?.label || 'Cambiar mensaje'}
        </button>
        <button
          onClick={() => setShowLetter(true)}
          aria-label="Ver carta"
          className="px-6 py-2.5 border border-white/20 text-white font-medium rounded-full text-sm hover:bg-white/10 transition-all duration-200"
        >
          {bannerData.buttons[1]?.label || 'Ver carta'}
        </button>
      </div>

      <LetterModal open={showLetter} onClose={() => setShowLetter(false)} />
    </>
  )
}
