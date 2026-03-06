import { AnimatePresence } from 'framer-motion'
import { useMonsterStore } from '../../store'
import { SwipeCard } from './SwipeCard'
import { Button } from '../shared'
import { useSfx } from '../../hooks/useAudio'

export function SwipeStack() {
  const { filteredMonsters, swipeIndex, advanceSwipe, resetSwipe } = useMonsterStore()
  const { playSwipe } = useSfx()
  const monsters = filteredMonsters()

  const visibleMonsters = monsters.slice(swipeIndex, swipeIndex + 3)

  const handleSwipe = (direction: 'left' | 'right') => {
    playSwipe(direction)
    advanceSwipe()
  }

  if (visibleMonsters.length === 0) {
    return (
      <div className="text-center py-20 text-horror-mist">
        <p className="text-xl mb-2">No more monsters to swipe!</p>
        <p className="mb-6">You've seen them all.</p>
        <Button variant="secondary" onClick={resetSwipe}>
          Start Over
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[340px] sm:max-w-sm mx-auto h-[460px] sm:h-[520px]">
        <AnimatePresence>
          {visibleMonsters.map((monster, i) => (
            <SwipeCard
              key={monster.id}
              monster={monster}
              isTop={i === 0}
              onSwipe={handleSwipe}
            />
          ))}
        </AnimatePresence>
      </div>
      <p className="text-horror-mist/50 text-sm">
        {swipeIndex + 1} / {monsters.length}
      </p>
    </div>
  )
}
