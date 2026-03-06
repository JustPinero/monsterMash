import { useState, useRef, useEffect } from 'react'
import type { Monster } from '../../types'
import { monsters } from '../../data/monsters'

interface MonsterPickerProps {
  selectedMonster: Monster | null
  excludeId?: string
  onSelect: (monster: Monster) => void
  label: string
}

export function MonsterPicker({ selectedMonster, excludeId, onSelect, label }: MonsterPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const filtered = monsters.filter(
    (m) =>
      m.id !== excludeId &&
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.movie.toLowerCase().includes(search.toLowerCase()))
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearch('')
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={ref} className="relative">
      <p className="text-sm text-horror-mist mb-2">{label}</p>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="w-full p-4 bg-horror-surface border border-horror-red/20 rounded-xl text-left hover:border-horror-red/50 transition-colors cursor-pointer"
      >
        {selectedMonster ? (
          <div>
            <p className="font-bold text-horror-bone">{selectedMonster.name}</p>
            <p className="text-sm text-horror-mist">{selectedMonster.movie}</p>
          </div>
        ) : (
          <p className="text-horror-mist">Choose a monster...</p>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-horror-surface border border-horror-red/30 rounded-xl shadow-2xl max-h-64 overflow-hidden">
          <div className="p-2 border-b border-horror-red/10">
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search monsters"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-horror-bg text-horror-bone rounded-lg text-sm focus:outline-none placeholder:text-horror-mist/50"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto max-h-48" role="listbox">
            {filtered.map((monster) => (
              <button
                role="option"
                aria-selected={selectedMonster?.id === monster.id}
                key={monster.id}
                onClick={() => {
                  onSelect(monster)
                  setIsOpen(false)
                  setSearch('')
                }}
                className="w-full p-3 text-left hover:bg-horror-red/10 transition-colors cursor-pointer"
              >
                <p className="font-medium text-horror-bone text-sm">{monster.name}</p>
                <p className="text-xs text-horror-mist">{monster.species} &middot; {monster.movie}</p>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="p-3 text-sm text-horror-mist text-center">No monsters found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
