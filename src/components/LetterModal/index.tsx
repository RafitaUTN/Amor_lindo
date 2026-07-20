'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart } from 'lucide-react'
import letterData from '@/data/letter.json'

interface LetterModalProps {
  open: boolean
  onClose: () => void
}

export default function LetterModal({ open, onClose }: LetterModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50 bg-[#121212] rounded-2xl border border-[#2A2A2A] shadow-2xl overflow-hidden max-h-[85vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A] bg-gradient-to-r from-[#181818] to-[#121212]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#1DB954]/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-[#1DB954]" fill="currentColor" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-white truncate">{letterData.letter.title}</h2>
                  <p className="text-xs text-[#B3B3B3] truncate">{letterData.letter.author}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar carta"
                className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#3E3E3E] transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {letterData.letter.date ? (
                <p className="text-xs uppercase tracking-[0.22em] text-[#535353] mb-5">
                  {letterData.letter.date}
                </p>
              ) : null}
              {letterData.letter.content.map((paragraph, index) => (
                <p key={index} className="text-[#B3B3B3] text-sm leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
              {letterData.letter.footer.showSignature && (
                <p className="text-white font-medium text-sm mt-6">
                  {letterData.letter.footer.signature}
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
