'use client'

import { createContext, createElement, useContext, useMemo, useState, ReactNode } from 'react'
import { PlaylistItem, Moment } from '@/types'
import playlistData from '@/data/playlist.json'
import momentsData from '@/data/moments.json'

interface SearchResult {
  playlist: PlaylistItem[]
  moments: Moment[]
}

interface SearchContextType {
  query: string
  setQuery: (value: string) => void
  results: SearchResult
}

const SearchContext = createContext<SearchContextType | null>(null)

function getResults(query: string): SearchResult {
  if (!query.trim()) {
    return { playlist: playlistData.playlist, moments: momentsData.moments }
  }

  const q = query.toLowerCase()
  return {
    playlist: playlistData.playlist.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    ),
    moments: momentsData.moments.filter(
      moment =>
        moment.title.toLowerCase().includes(q) ||
        moment.description.toLowerCase().includes(q)
    ),
  }
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => getResults(query), [query])

  return createElement(SearchContext.Provider, { value: { query, setQuery, results } }, children)
}

export function useSearch() {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }

  return context
}
