import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LoadingSpinner } from '../shared'

const loadingMessages = [
  'Consulting the dark arts...',
  'Reading the bones...',
  'Summoning the matchmaker...',
  'Brewing a love potion...',
  'Gazing into the crystal ball...',
  'Channeling the spirits...',
]

export function DateLoading() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner message="" />
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          className="text-horror-mist text-lg mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {loadingMessages[messageIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
