'use client'

import { useNavigation } from '@/hooks/useNavigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Player from '@/components/Player'
import Inicio from '@/components/pages/Inicio'
import Playlist from '@/components/pages/Playlist'
import Momentos from '@/components/pages/Momentos'

export default function MainLayout() {
  const { currentPage } = useNavigation()

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 md:ml-[280px] min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-[100px]">
          {currentPage === 'inicio' && <Inicio />}
          {currentPage === 'playlist' && <Playlist />}
          {currentPage === 'moments' && <Momentos />}
        </main>
      </div>
      <Player />
    </div>
  )
}