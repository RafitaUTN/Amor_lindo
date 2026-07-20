'use client'

import { motion } from 'framer-motion'
import MomentGrid from '@/components/MomentGrid'
import { useSearch } from '@/hooks/useSearch'
import momentsData from '@/data/moments.json'

export default function MomentsPage() {
  const { query, setQuery, results } = useSearch()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{momentsData.page.title}</h1>
        <p className="text-[#B3B3B3]">{momentsData.page.description}</p>
      </div>

      <div className="relative max-w-md">
        <input
          type="text"
          placeholder={momentsData.search.placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#2A2A2A] text-white text-sm rounded-full py-3 pl-10 pr-4 placeholder-[#B3B3B3] focus:outline-none focus:ring-1 focus:ring-[#1DB954] transition-all"
          aria-label="Buscar en momentos"
        />
      </div>

      <MomentGrid items={results.moments} />
    </motion.div>
  )
}