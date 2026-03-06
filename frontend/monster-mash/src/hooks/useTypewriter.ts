import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  onComplete?: () => void
}

export function useTypewriter({ text, speed = 30, onComplete }: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    setDisplayText('')
    setIsComplete(false)
    let index = 0
    const timer = setInterval(() => {
      index++
      setDisplayText(text.slice(0, index))
      if (index >= text.length) {
        clearInterval(timer)
        setIsComplete(true)
        onCompleteRef.current?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  const skip = useCallback(() => {
    setDisplayText(text)
    setIsComplete(true)
    onCompleteRef.current?.()
  }, [text])

  return { displayText, isComplete, skip }
}
