'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Heart } from 'lucide-react'
import { Moment } from '@/types'

interface MomentLightboxProps {
  moments: Moment[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function MomentLightbox({ moments, currentIndex, onClose, onNavigate }: MomentLightboxProps) {
  const current = moments[currentIndex]
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + moments.length) % moments.length)
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % moments.length)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [currentIndex, moments.length, onClose, onNavigate])

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const delta = touchEndX - touchStartX.current
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        onNavigate((currentIndex - 1 + moments.length) % moments.length)
      } else {
        onNavigate((currentIndex + 1) % moments.length)
      }
    }
    touchStartX.current = null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl mx-4"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((currentIndex - 1 + moments.length) % moments.length)
            }}
            aria-label="Anterior"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/35 p-2 text-white/80 backdrop-blur-sm hover:bg-black/55 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((currentIndex + 1) % moments.length)
            }}
            aria-label="Siguiente"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/35 p-2 text-white/80 backdrop-blur-sm hover:bg-black/55 hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="grid gap-4 md:gap-6 rounded-3xl border border-[#2A2A2A] bg-[#121212] p-3 md:p-4 shadow-2xl shadow-black/40 md:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.75fr)]"
          >
            <div className="relative aspect-[4/3] md:aspect-[4/5] overflow-hidden rounded-2xl bg-[#1A1A1A]">
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[#2A2A2A] bg-[#181818] p-5 md:p-6">
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#B3B3B3]">
                    {currentIndex + 1} / {moments.length}
                  </span>
                  {current.favorite ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FF4F81]/15 px-3 py-1 text-xs text-[#FF8FB0]">
                      <Heart className="w-3.5 h-3.5" fill="currentColor" />
                      Favorito
                    </span>
                  ) : null}
                </div>

                <h3 className="text-2xl font-bold text-white">{current.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B3B3B3]">{current.description}</p>

                <div className="mt-5 space-y-3 text-sm text-[#D1D1D1]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1DB954]" />
                    <span>{current.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#2A2A2A] pt-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#535353]">Swipe o usa las flechas</p>
                <button
                  onClick={onClose}
                  aria-label="Cerrar vista de momento"
                  className="rounded-full bg-[#2A2A2A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3A3A3A]"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
