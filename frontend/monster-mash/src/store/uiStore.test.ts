import { describe, it, expect, beforeEach } from 'vitest'
import { useUIStore } from './uiStore'

describe('useUIStore', () => {
  beforeEach(() => {
    useUIStore.setState({ viewMode: 'gallery' })
  })

  it('defaults to gallery view', () => {
    expect(useUIStore.getState().viewMode).toBe('gallery')
  })

  it('sets view mode', () => {
    useUIStore.getState().setViewMode('swipe')
    expect(useUIStore.getState().viewMode).toBe('swipe')
  })

  it('toggles view mode', () => {
    useUIStore.getState().toggleViewMode()
    expect(useUIStore.getState().viewMode).toBe('swipe')

    useUIStore.getState().toggleViewMode()
    expect(useUIStore.getState().viewMode).toBe('gallery')
  })
})
