'use client'

import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  ariaLabel: string
  className?: string
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className = '',
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`.trim()}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B3B3B3]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#2A2A2A] text-white text-sm rounded-full py-2.5 pl-10 pr-4 placeholder-[#B3B3B3] focus:outline-none focus:ring-1 focus:ring-[#1DB954] transition-all"
        aria-label={ariaLabel}
      />
    </div>
  )
}