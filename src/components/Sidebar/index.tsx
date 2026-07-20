'use client'

import { Home, ListMusic, Heart } from 'lucide-react'
import { SiSpotify } from 'react-icons/si'
import { useNavigation } from '@/hooks/useNavigation'
import navItems from '@/data/navigation.json'
import appData from '@/data/app.json'
import { NavItem } from '@/types'

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  'list-music': ListMusic,
  heart: Heart,
}

export default function Sidebar() {
  const { currentPage, navigate } = useNavigation()

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 bg-black z-30 w-[280px] border-r border-[#2A2A2A]">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center shadow-lg shadow-[#1DB954]/20">
          <SiSpotify className="w-6 h-6 text-black" />
        </div>
        <div className="min-w-0">
          <span className="block text-white font-bold text-lg truncate">{appData.name}</span>
          <span className="block text-xs text-[#B3B3B3] truncate">{appData.tagline}</span>
        </div>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item: NavItem) => {
            const Icon = iconMap[item.icon] || Home
            const isActive = currentPage === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.id)}
                  aria-label={item.title}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#282828] text-white'
                      : 'text-[#B3B3B3] hover:text-white hover:bg-[#1A1A1A]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#B3B3B3]'}`} />
                  <span>{item.title}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-6 py-4 border-t border-[#2A2A2A]">
        <p className="text-xs text-[#535353]">Hecho con amor ❤️</p>
      </div>
    </aside>
  )
}
