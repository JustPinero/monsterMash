import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useSwipe } from './useSwipe'

describe('useSwipe', () => {
  it('starts with null direction', () => {
    const { result } = renderHook(() => useSwipe())
    expect(result.current.direction).toBeNull()
  })

  it('detects right swipe when offset exceeds threshold', () => {
    const onSwipeRight = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeRight }))

    act(() => {
      result.current.onDragEnd(150, 0)
    })

    expect(result.current.direction).toBe('right')
    expect(onSwipeRight).toHaveBeenCalledOnce()
  })

  it('detects left swipe when offset exceeds threshold', () => {
    const onSwipeLeft = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeLeft }))

    act(() => {
      result.current.onDragEnd(-150, 0)
    })

    expect(result.current.direction).toBe('left')
    expect(onSwipeLeft).toHaveBeenCalledOnce()
  })

  it('detects swipe based on velocity', () => {
    const onSwipeRight = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeRight }))

    act(() => {
      result.current.onDragEnd(50, 600) // small offset but high velocity
    })

    expect(onSwipeRight).toHaveBeenCalledOnce()
  })

  it('does not trigger swipe below threshold', () => {
    const onSwipeLeft = vi.fn()
    const onSwipeRight = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeLeft, onSwipeRight }))

    act(() => {
      result.current.onDragEnd(30, 100)
    })

    expect(result.current.direction).toBeNull()
    expect(onSwipeLeft).not.toHaveBeenCalled()
    expect(onSwipeRight).not.toHaveBeenCalled()
  })

  it('resets direction', () => {
    const { result } = renderHook(() => useSwipe())

    act(() => {
      result.current.onDragEnd(150, 0)
    })
    expect(result.current.direction).toBe('right')

    act(() => {
      result.current.reset()
    })
    expect(result.current.direction).toBeNull()
  })
})
