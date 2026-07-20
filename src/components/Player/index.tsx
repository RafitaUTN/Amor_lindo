'use client'

import Image from 'next/image'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { usePlayer } from '@/hooks/usePlayer'
import ProgressBar from '@/components/ProgressBar'

export default function Player() {
  const {
    currentTrack,
    playing,
    volume,
    progress,
    duration,
    shuffle,
    repeat,
    togglePlay,
    next,
    previous,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    seek,
    toggleFavorite,
    isFavorite,
  } = usePlayer()

  if (!currentTrack) return null

  const favorite = isFavorite(currentTrack.id)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#2A2A2A] bg-[#181818]/95 px-3 py-3 backdrop-blur-xl md:px-4 md:py-0 md:h-[82px]">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 md:h-full md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex items-center gap-3 md:w-[280px]">
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[#282828] flex-shrink-0 border border-white/5">
            <Image
              src={currentTrack.cover}
              alt={currentTrack.title}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-[#B3B3B3] text-xs truncate">{currentTrack.artist}</p>
          </div>
          <button
            onClick={() => toggleFavorite(currentTrack.id)}
            aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            className="ml-auto inline-flex md:hidden"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorite ? 'text-[#1DB954] fill-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 max-w-[680px]">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={toggleShuffle}
              aria-label="Aleatorio"
              className={`hidden md:inline-flex transition-colors ${shuffle ? 'text-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={previous}
              aria-label="Anterior"
              className="text-[#B3B3B3] transition-colors hover:text-white"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pausar' : 'Reproducir'}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform hover:scale-105"
            >
              {playing ? (
                <Pause className="h-5 w-5 text-black" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 text-black" />
              )}
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="text-[#B3B3B3] transition-colors hover:text-white"
            >
              <SkipForward className="w-6 h-6" />
            </button>
            <button
              onClick={toggleRepeat}
              aria-label="Repetir"
              className={`hidden md:inline-flex transition-colors ${repeat ? 'text-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'}`}
            >
              <Repeat className="w-4 h-4" />
            </button>
            <button
              onClick={toggleShuffle}
              aria-label="Aleatorio"
              className={`inline-flex md:hidden transition-colors ${shuffle ? 'text-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={toggleRepeat}
              aria-label="Repetir"
              className={`inline-flex md:hidden transition-colors ${repeat ? 'text-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'}`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          <ProgressBar progress={progress} duration={duration} onSeek={seek} />
        </div>

        <div className="hidden md:flex items-center gap-3 w-[200px] justify-end">
          <button
            onClick={() => toggleFavorite(currentTrack.id)}
            aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorite ? 'text-[#1DB954] fill-[#1DB954]' : 'text-[#B3B3B3] hover:text-white'
              }`}
            />
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setVolume(volume === 0 ? 100 : 0)}
              aria-label={volume === 0 ? 'Activar volumen' : 'Silenciar'}
              className="text-[#B3B3B3] hover:text-white transition-colors"
            >
              {volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <div
              className="w-20 h-1 bg-[#535353] rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                setVolume(Math.round((x / rect.width) * 100))
              }}
            >
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${volume}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
