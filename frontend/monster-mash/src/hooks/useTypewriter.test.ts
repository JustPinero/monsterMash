import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useTypewriter } from './useTypewriter'

describe('useTypewriter', () => {
  it('starts with empty display text', () => {
    const { result } = renderHook(() =>
      useTypewriter({ text: 'Hello world', speed: 50 })
    )
    expect(result.current.displayText).toBe('')
    expect(result.current.isComplete).toBe(false)
  })

  it('reveals text over time', async () => {
    vi.useFakeTimers()
    const { result } = renderHook(() =>
      useTypewriter({ text: 'Hi', speed: 50 })
    )

    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current.displayText).toBe('H')

    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current.displayText).toBe('Hi')
    expect(result.current.isComplete).toBe(true)

    vi.useRealTimers()
  })

  it('skips to full text when skip is called', () => {
    const { result } = renderHook(() =>
      useTypewriter({ text: 'Hello world', speed: 100 })
    )

    act(() => { result.current.skip() })
    expect(result.current.displayText).toBe('Hello world')
    expect(result.current.isComplete).toBe(true)
  })
})
