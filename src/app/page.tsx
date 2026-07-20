'use client'

import { useState } from 'react'
import { PlayerProvider } from '@/hooks/usePlayer'
import { NavigationProvider } from '@/hooks/useNavigation'
import { SearchProvider, useSearch } from '@/hooks/useSearch'
import SplashScreen from '@/components/SplashScreen'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import FooterPlayer from '@/components/FooterPlayer'
import { motion } from 'framer-motion'
import { useNavigation } from '@/hooks/useNavigation'
import Banner from '@/components/Banner'
import QuickAccessCard from '@/components/QuickAccessCard'
import SearchBar from '@/components/SearchBar'
import PlaylistGrid from '@/components/PlaylistGrid'
import MomentGrid from '@/components/MomentGrid'

function Content() {
  const { currentPage, navigate } = useNavigation()
  const { query, setQuery, results } = useSearch()

  const handlePlaylistClick = () => navigate('playlist')
  const handleMomentsClick = () => navigate('moments')

  if (currentPage === 'inicio') {
    return (
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 overflow-y-auto pb-[100px] md:pb-[90px] px-4 md:px-8"
      >
        <Banner />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
          <QuickAccessCard
            title="Nuestra Lista"
            description="Escucha las canciones que marcan nuestra historia"
            icon="music"
            onClick={handlePlaylistClick}
          />
          <QuickAccessCard
            title="Nuestros Momentos"
            description="Revive las fotografías de nuestro camino juntos"
            icon="image"
            onClick={handleMomentsClick}
          />
        </div>
      </motion.main>
    )
  }

  if (currentPage === 'playlist') {
    return (
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 overflow-y-auto pb-[100px] md:pb-[90px] px-4 md:px-8"
      >
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Nuestra lista romántica
          </h1>
          <p className="text-[#B3B3B3]">
            Las canciones y recuerdos más importantes de nuestra historia.
          </p>
        </div>
        <div className="max-w-md mb-6">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Busca un detalle o momento"
            ariaLabel="Buscar en playlist"
          />
        </div>
        <PlaylistGrid items={results.playlist} />
      </motion.main>
    )
  }

  if (currentPage === 'moments') {
    return (
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 overflow-y-auto pb-[100px] md:pb-[90px] px-4 md:px-8"
      >
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Momentos especiales
          </h1>
          <p className="text-[#B3B3B3]">
            Cada fotografía guarda una parte de nuestra historia.
          </p>
        </div>
        <MomentGrid items={results.moments} />
      </motion.main>
    )
  }

  return null
}

export default function Home() {
  const [splashDone, setSplashDone] = useState(false)

  if (!splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} />
  }

  return (
    <PlayerProvider>
      <SearchProvider>
        <NavigationProvider>
          <div className="relative flex h-screen w-full overflow-hidden bg-black">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-0 md:ml-[280px]">
              <Header />
              <Content />
            </div>
            <FooterPlayer />
          </div>
        </NavigationProvider>
      </SearchProvider>
    </PlayerProvider>
  )
}