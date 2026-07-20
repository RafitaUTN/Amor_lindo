'use client'

import { motion } from 'framer-motion'
import PlaylistGrid from '@/components/PlaylistGrid'
import { useSearch } from '@/hooks/useSearch'
import playlistData from '@/data/playlist.json'

export default function Playlist() {
  const { query, setQuery, results } = useSearch()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto w-full"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{playlistData.page.title}</h1>
        <p className="text-[#B3B3B3]">{playlistData.page.description}</p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder={playlistData.search.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#2A2A2A] text-white text-sm rounded-full py-3 pl-10 pr-4 placeholder-[#B3B3B3] focus:outline-none focus:ring-1 focus:ring-[#1DB954] transition-all"
            aria-label="Buscar en la playlist"
          />
        </div>
      </div>

      <PlaylistGrid items={results.playlist} />
    </motion.div>
  )
}