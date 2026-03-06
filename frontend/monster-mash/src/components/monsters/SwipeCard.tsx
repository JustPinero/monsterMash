import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { Monster } from '../../types'
import { Badge } from '../shared'
import { useMonsterImage } from '../../hooks/useMonsterImage'

interface SwipeCardProps {
  monster: Monster
  onSwipe: (direction: 'left' | 'right') => void
  isTop?: boolean
}

const SWIPE_THRESHOLD = 80
const VELOCITY_THRESHOLD = 400

export function SwipeCard({ monster, onSwipe, isTop = false }: SwipeCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const likeOpacity = useTransform(x, [0, 80], [0, 1])
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0])
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95])
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('right')

  const imageSrc = useMonsterImage(monster)

  return (
    <motion.div
      className="absolute inset-0 touch-none select-none cursor-grab active:cursor-grabbing"
      style={{
        x,
        rotate,
        scale: isTop ? scale : undefined,
        zIndex: isTop ? 10 : 0,
        willChange: 'transform',
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      onDragEnd={(_, info) => {
        if (
          Math.abs(info.offset.x) > SWIPE_THRESHOLD ||
          Math.abs(info.velocity.x) > VELOCITY_THRESHOLD
        ) {
          const dir = info.offset.x > 0 ? 'right' : 'left'
          setExitDirection(dir)
          onSwipe(dir)
        }
      }}
      animate={isTop ? undefined : { scale: 0.95, y: 10 }}
      exit={{
        x: exitDirection === 'right' ? 300 : -300,
        opacity: 0,
        rotate: exitDirection === 'right' ? 15 : -15,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
    >
      <div className="bg-horror-surface rounded-2xl overflow-hidden border border-horror-red/20 h-full shadow-2xl">
        {/* LIKE overlay */}
        <motion.div
          className="absolute top-6 left-6 z-20 border-4 border-green-500 text-green-500 text-3xl sm:text-4xl font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-lg rotate-[-20deg]"
          style={{ opacity: likeOpacity }}
        >
          LIKE
        </motion.div>

        {/* NOPE overlay */}
        <motion.div
          className="absolute top-6 right-6 z-20 border-4 border-horror-red text-horror-red text-3xl sm:text-4xl font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-lg rotate-[20deg]"
          style={{ opacity: nopeOpacity }}
        >
          NOPE
        </motion.div>

        {/* Image */}
        <div className="h-[55%] sm:h-2/3 bg-horror-shadow overflow-hidden">
          <img
            src={imageSrc}
            alt={monster.name}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
            onError={(e) => { e.currentTarget.src = '/monsters/placeholder.svg' }}
          />
        </div>

        {/* Info */}
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-horror-bone">{monster.name}</h2>
          <p className="text-sm sm:text-base text-horror-mist">{monster.movie} ({monster.year})</p>
          <div className="flex flex-wrap gap-1 mt-2 sm:mt-3">
            <Badge variant="species">{monster.species}</Badge>
            {monster.traits.slice(0, 3).map((trait) => (
              <Badge key={trait}>{trait}</Badge>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-horror-mist mt-2 sm:mt-3 italic line-clamp-1">"{monster.catchphrase}"</p>
        </div>
      </div>
    </motion.div>
  )
}
