import { useState, useCallback } from 'react'

export type SwipeDirection = 'left' | 'right' | null

interface UseSwipeOptions {
  threshold?: number
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

interface UseSwipeReturn {
  direction: SwipeDirection
  offset: number
  onDragEnd: (offsetX: number, velocityX: number) => void
  reset: () => void
}

export function useSwipe({
  threshold = 100,
  onSwipeLeft,
  onSwipeRight,
}: UseSwipeOptions = {}): UseSwipeReturn {
  const [direction, setDirection] = useState<SwipeDirection>(null)
  const [offset, setOffset] = useState(0)

  const onDragEnd = useCallback(
    (offsetX: number, velocityX: number) => {
      if (Math.abs(offsetX) > threshold || Math.abs(velocityX) > 500) {
        if (offsetX > 0) {
          setDirection('right')
          onSwipeRight?.()
        } else {
          setDirection('left')
          onSwipeLeft?.()
        }
      }
      setOffset(0)
    },
    [threshold, onSwipeLeft, onSwipeRight]
  )

  const reset = useCallback(() => {
    setDirection(null)
    setOffset(0)
  }, [])

  return { direction, offset, onDragEnd, reset }
}
