'use client'

import { motion } from 'framer-motion'
import MomentGrid from '@/components/MomentGrid'
import { useSearch } from '@/hooks/useSearch'
import SearchBar from '@/components/SearchBar'
import momentsData from '@/data/moments.json'

export default function Momentos() {
  const { query, setQuery, results } = useSearch()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto w-full"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{momentsData.page.title}</h1>
        <p className="text-[#B3B3B3]">{momentsData.page.description}</p>
      </div>

      <div className="max-w-md mb-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={momentsData.search?.placeholder || 'Busca un detalle o momento'}
          ariaLabel="Buscar en los momentos"
        />
      </div>

      <MomentGrid items={results.moments} />
    </motion.div>
  )
}