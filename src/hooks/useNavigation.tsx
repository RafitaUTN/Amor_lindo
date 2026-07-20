'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface NavigationContextType {
  currentPage: string
  navigate: (page: string) => void
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState('inicio')

  const navigate = useCallback((page: string) => {
    setCurrentPage(page)
  }, [])

  return (
    <NavigationContext.Provider value={{ currentPage, navigate }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) throw new Error('useNavigation must be used within NavigationProvider')
  return context
}