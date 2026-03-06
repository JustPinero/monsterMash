import { create } from 'zustand'
import type { Monster, Species } from '../types'
import { monsters as allMonsters } from '../data/monsters'

interface MonsterStore {
  monsters: Monster[]
  selectedSlot1: Monster | null
  selectedSlot2: Monster | null
  speciesFilter: Species | null
  searchQuery: string
  swipeIndex: number

  setSpeciesFilter: (species: Species | null) => void
  setSearchQuery: (query: string) => void
  selectSlot1: (monster: Monster | null) => void
  selectSlot2: (monster: Monster | null) => void
  clearSelections: () => void
  advanceSwipe: () => void
  resetSwipe: () => void
  filteredMonsters: () => Monster[]
}

export const useMonsterStore = create<MonsterStore>((set, get) => ({
  monsters: allMonsters,
  selectedSlot1: null,
  selectedSlot2: null,
  speciesFilter: null,
  searchQuery: '',
  swipeIndex: 0,

  setSpeciesFilter: (species) => set({ speciesFilter: species, swipeIndex: 0 }),
  setSearchQuery: (query) => set({ searchQuery: query, swipeIndex: 0 }),

  selectSlot1: (monster) => set({ selectedSlot1: monster }),
  selectSlot2: (monster) => set({ selectedSlot2: monster }),
  clearSelections: () => set({ selectedSlot1: null, selectedSlot2: null }),

  advanceSwipe: () => set((state) => ({ swipeIndex: state.swipeIndex + 1 })),
  resetSwipe: () => set({ swipeIndex: 0 }),

  filteredMonsters: () => {
    const { monsters, speciesFilter, searchQuery } = get()
    let result = monsters

    if (speciesFilter) {
      result = result.filter((m) => m.species === speciesFilter)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.movie.toLowerCase().includes(q) ||
          m.species.toLowerCase().includes(q)
      )
    }

    return result
  },
}))
