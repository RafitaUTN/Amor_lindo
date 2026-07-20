'use client'

import { useNavigation } from '@/hooks/useNavigation'
import { useSearch } from '@/hooks/useSearch'
import ProfilePopover from '@/components/ProfilePopover'
import SearchBar from '@/components/SearchBar'
import navItems from '@/data/navigation.json'
import profileData from '@/data/profile.json'

export default function Header() {
  const { currentPage } = useNavigation()
  const { query, setQuery } = useSearch()

  const currentNav = navItems.find(n => n.id === currentPage)
  const subtitle = currentNav?.subtitle || profileData.subtitle

  return (
    <header className="sticky top-0 z-20 bg-[#000000]/80 backdrop-blur-xl border-b border-[#2A2A2A]/50">
      <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-4 md:px-8 md:h-16">
        <div className="w-full md:flex-1 md:max-w-md">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Busca un detalle o momento"
            ariaLabel="Buscar"
          />
        </div>

        <div className="flex items-center justify-end gap-3 shrink-0 self-end md:self-auto">
          <ProfilePopover subtitle={subtitle} />
        </div>
      </div>
    </header>
  )
}
