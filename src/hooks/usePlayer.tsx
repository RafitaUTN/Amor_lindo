'use client'

import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from 'react'
import { PlaylistItem } from '@/types'
import playlistData from '@/data/playlist.json'
import playerData from '@/data/player.json'

interface PlayerContextType {
  currentTrack: PlaylistItem | null
  playing: boolean
  volume: number
  progress: number
  duration: number
  shuffle: boolean
  repeat: boolean
  playlist: PlaylistItem[]
  play: (track?: PlaylistItem) => void
  pause: () => void
  togglePlay: () => void
  next: () => void
  previous: () => void
  setVolume: (v: number) => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  seek: (time: number) => void
  toggleFavorite: (trackId: number) => void
  isFavorite: (trackId: number) => boolean
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const playlist: PlaylistItem[] = playlistData.playlist
  const initialTrackIndex = Math.max(0, (playerData.currentTrack || 1) - 1)

  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex)
  const [playing, setPlaying] = useState(playerData.playing)
  const [volume, setVolumeState] = useState(playerData.volume)
  const [progress, setProgress] = useState(playerData.progress)
  const [duration, setDuration] = useState(0)
  const [shuffle, setShuffle] = useState(playerData.shuffle)
  const [repeat, setRepeat] = useState(playerData.repeat)
  const [favorites, setFavorites] = useState<number[]>([1])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentTrack = playlist[currentTrackIndex] || null

  useEffect(() => {
    audioRef.current = new Audio()
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    audio.src = currentTrack.audio
    audio.load()
    if (playing) {
      audio.play().catch(() => {})
    }
  }, [currentTrackIndex, currentTrack, playing])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [playing])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume / 100
  }, [volume])

  const play = useCallback(
    (track?: PlaylistItem) => {
      if (track) {
        const idx = playlist.findIndex(t => t.id === track.id)
        if (idx !== -1) setCurrentTrackIndex(idx)
      }
      setPlaying(true)
    },
    [playlist]
  )

  const pause = useCallback(() => setPlaying(false), [])

  const togglePlay = useCallback(() => {
    setPlaying(prev => !prev)
  }, [])

  const next = useCallback(() => {
    setCurrentTrackIndex(prev => {
      if (shuffle) {
        let nextIdx
        do {
          nextIdx = Math.floor(Math.random() * playlist.length)
        } while (nextIdx === prev && playlist.length > 1)
        return nextIdx
      }
      return (prev + 1) % playlist.length
    })
    setProgress(0)
  }, [playlist.length, shuffle])

  const previous = useCallback(() => {
    setCurrentTrackIndex(prev => (prev - 1 + playlist.length) % playlist.length)
    setProgress(0)
  }, [playlist.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const updateProgress = () => setProgress(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnd = () => {
      if (repeat) {
        audio.currentTime = 0
        audio.play().catch(() => {})
      } else {
        next()
      }
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnd)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnd)
    }
  }, [next, repeat])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
  }, [])

  const toggleShuffleFn = useCallback(() => setShuffle(prev => !prev), [])
  const toggleRepeat = useCallback(() => setRepeat(prev => !prev), [])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }, [])

  const toggleFavorite = useCallback((trackId: number) => {
    setFavorites(prev =>
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    )
  }, [])

  const isFavorite = useCallback(
    (trackId: number) => {
      return favorites.includes(trackId)
    },
    [favorites]
  )

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playing,
        volume,
        progress,
        duration,
        shuffle,
        repeat,
        playlist,
        play,
        pause,
        togglePlay,
        next,
        previous,
        setVolume,
        toggleShuffle: toggleShuffleFn,
        toggleRepeat,
        seek,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer must be used within PlayerProvider')
  return context
}