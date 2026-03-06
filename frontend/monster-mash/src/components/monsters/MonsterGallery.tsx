import { useMemo } from 'react'
import { useMonsterStore } from '../../store'
import { MonsterCard } from './MonsterCard'
import type { Species } from '../../types'

export function MonsterGallery() {
  const { monsters: allMonsters, speciesFilter, searchQuery, setSpeciesFilter, setSearchQuery, filteredMonsters } =
    useMonsterStore()

  const monsters = filteredMonsters()

  const speciesList = useMemo(() => {
    const set = new Set<Species>(allMonsters.map((m) => m.species))
    return [...set].sort()
  }, [allMonsters])

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search monsters..."
          aria-label="Search monsters"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-horror-surface border border-horror-red/20 rounded-lg text-horror-bone placeholder:text-horror-mist/50 focus:outline-none focus:border-horror-cyan/50"
        />
      </div>

      {/* Species filter */}
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by species">
        <button
          onClick={() => setSpeciesFilter(null)}
          aria-pressed={!speciesFilter}
          className={`px-3 py-1 rounded-full text-sm border transition-colors cursor-pointer ${
            !speciesFilter
              ? 'bg-horror-red text-white border-horror-red'
              : 'bg-horror-surface text-horror-mist border-horror-red/20 hover:border-horror-red/50'
          }`}
        >
          All
        </button>
        {speciesList.map((species) => (
          <button
            key={species}
            onClick={() => setSpeciesFilter(species === speciesFilter ? null : species)}
            aria-pressed={species === speciesFilter}
            className={`px-3 py-1 rounded-full text-sm border transition-colors cursor-pointer ${
              species === speciesFilter
                ? 'bg-horror-red text-white border-horror-red'
                : 'bg-horror-surface text-horror-mist border-horror-red/20 hover:border-horror-red/50'
            }`}
          >
            {species}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {monsters.map((monster, index) => (
          <MonsterCard key={monster.id} monster={monster} index={index} />
        ))}
      </div>

      {monsters.length === 0 && (
        <p className="text-center text-horror-mist py-12">No monsters found. Try a different search.</p>
      )}
    </div>
  )
}
