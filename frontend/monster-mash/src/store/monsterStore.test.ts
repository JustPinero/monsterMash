import { describe, it, expect, beforeEach } from 'vitest'
import { useMonsterStore } from './monsterStore'

describe('useMonsterStore', () => {
  beforeEach(() => {
    useMonsterStore.setState({
      selectedSlot1: null,
      selectedSlot2: null,
      speciesFilter: null,
      searchQuery: '',
      swipeIndex: 0,
    })
  })

  it('has monsters loaded', () => {
    const { monsters } = useMonsterStore.getState()
    expect(monsters.length).toBeGreaterThan(0)
  })

  it('selects monsters into slots', () => {
    const { monsters, selectSlot1, selectSlot2 } = useMonsterStore.getState()
    selectSlot1(monsters[0])
    selectSlot2(monsters[1])

    const state = useMonsterStore.getState()
    expect(state.selectedSlot1?.id).toBe(monsters[0].id)
    expect(state.selectedSlot2?.id).toBe(monsters[1].id)
  })

  it('clears selections', () => {
    const { monsters, selectSlot1, selectSlot2 } = useMonsterStore.getState()
    selectSlot1(monsters[0])
    selectSlot2(monsters[1])
    useMonsterStore.getState().clearSelections()

    const state = useMonsterStore.getState()
    expect(state.selectedSlot1).toBeNull()
    expect(state.selectedSlot2).toBeNull()
  })

  it('filters by species', () => {
    const { setSpeciesFilter } = useMonsterStore.getState()
    setSpeciesFilter('Vampire')

    const filtered = useMonsterStore.getState().filteredMonsters()
    expect(filtered.every((m) => m.species === 'Vampire')).toBe(true)
    expect(filtered.length).toBeGreaterThan(0)
  })

  it('filters by search query', () => {
    const { setSearchQuery } = useMonsterStore.getState()
    setSearchQuery('dracula')

    const filtered = useMonsterStore.getState().filteredMonsters()
    expect(filtered.some((m) => m.id === 'dracula')).toBe(true)
  })

  it('advances and resets swipe index', () => {
    const { advanceSwipe } = useMonsterStore.getState()
    advanceSwipe()
    advanceSwipe()
    expect(useMonsterStore.getState().swipeIndex).toBe(2)

    useMonsterStore.getState().resetSwipe()
    expect(useMonsterStore.getState().swipeIndex).toBe(0)
  })
})
