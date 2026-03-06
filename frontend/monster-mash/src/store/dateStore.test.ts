import { describe, it, expect, beforeEach } from 'vitest'
import { useDateStore } from './dateStore'
import { monsters } from '../data/monsters'
import type { DateScenario } from '../types'

const mockScenario: DateScenario = {
  monster1: monsters[0],
  monster2: monsters[1],
  story: 'A great date',
  highlights: ['Funny moment'],
  compatibilityScore: 75,
  verdict: 'Perfect match',
  location: 'A dark castle',
}

describe('useDateStore', () => {
  beforeEach(() => {
    useDateStore.setState({
      status: 'idle',
      currentDate: null,
      history: [],
      error: null,
    })
  })

  it('starts in idle state', () => {
    expect(useDateStore.getState().status).toBe('idle')
  })

  it('transitions to loading', () => {
    useDateStore.getState().setLoading()
    expect(useDateStore.getState().status).toBe('loading')
  })

  it('sets date result and adds to history', () => {
    useDateStore.getState().setDateResult(mockScenario)

    const state = useDateStore.getState()
    expect(state.status).toBe('success')
    expect(state.currentDate).toEqual(mockScenario)
    expect(state.history).toHaveLength(1)
  })

  it('sets error state', () => {
    useDateStore.getState().setError('Something went wrong')

    const state = useDateStore.getState()
    expect(state.status).toBe('error')
    expect(state.error).toBe('Something went wrong')
  })

  it('resets to idle', () => {
    useDateStore.getState().setDateResult(mockScenario)
    useDateStore.getState().reset()

    const state = useDateStore.getState()
    expect(state.status).toBe('idle')
    expect(state.currentDate).toBeNull()
    expect(state.history).toHaveLength(1) // history preserved
  })

  it('accumulates multiple dates in history', () => {
    useDateStore.getState().setDateResult(mockScenario)
    useDateStore.getState().setDateResult({ ...mockScenario, story: 'Second date' })
    useDateStore.getState().setDateResult({ ...mockScenario, story: 'Third date' })

    expect(useDateStore.getState().history).toHaveLength(3)
  })

  it('setLoading clears previous error', () => {
    useDateStore.getState().setError('Previous error')
    expect(useDateStore.getState().error).toBe('Previous error')

    useDateStore.getState().setLoading()
    expect(useDateStore.getState().error).toBeNull()
    expect(useDateStore.getState().status).toBe('loading')
  })

  it('error-then-retry flow works correctly', () => {
    useDateStore.getState().setLoading()
    useDateStore.getState().setError('Network error')
    expect(useDateStore.getState().status).toBe('error')

    useDateStore.getState().reset()
    expect(useDateStore.getState().status).toBe('idle')
    expect(useDateStore.getState().error).toBeNull()

    useDateStore.getState().setLoading()
    useDateStore.getState().setDateResult(mockScenario)
    expect(useDateStore.getState().status).toBe('success')
    expect(useDateStore.getState().history).toHaveLength(1)
  })
})
