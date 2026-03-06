import { motion } from 'framer-motion'
import type { DateScenario } from '../../types'
import { Badge } from '../shared'
import { StoryNarration } from './StoryNarration'
import { useMonsterImage } from '../../hooks/useMonsterImage'

interface DateStoryProps {
  scenario: DateScenario
}

export function DateStory({ scenario }: DateStoryProps) {
  const { monster1, monster2, story, highlights, compatibilityScore, verdict, location } = scenario
  const monster1Image = useMonsterImage(monster1)
  const monster2Image = useMonsterImage(monster2)

  const scoreColor =
    compatibilityScore >= 70
      ? 'text-green-500'
      : compatibilityScore >= 40
        ? 'text-yellow-500'
        : 'text-horror-red'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      {/* Monster Portraits */}
      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-horror-surface border-2 border-horror-red/30 overflow-hidden mx-auto">
            <img
              src={monster1Image}
              alt={monster1.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/monsters/placeholder.svg' }}
            />
          </div>
          <p className="mt-2 font-bold text-horror-bone text-sm">{monster1.name}</p>
        </div>

        <span className="text-3xl font-[Creepster] text-horror-red">&hearts;</span>

        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-horror-surface border-2 border-horror-red/30 overflow-hidden mx-auto">
            <img
              src={monster2Image}
              alt={monster2.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/monsters/placeholder.svg' }}
            />
          </div>
          <p className="mt-2 font-bold text-horror-bone text-sm">{monster2.name}</p>
        </div>
      </div>

      {/* Compatibility Score */}
      <div className="text-center">
        <p className="text-horror-mist text-sm">Compatibility Score</p>
        <p className={`text-5xl font-[Creepster] ${scoreColor}`}>{compatibilityScore}%</p>
        <p className="text-horror-bone italic mt-2">"{verdict}"</p>
      </div>

      {/* Location */}
      <div className="text-center">
        <Badge variant="species">{location}</Badge>
      </div>

      {/* Story */}
      <div className="bg-horror-surface rounded-xl p-6 border border-horror-red/10">
        <h2 className="text-2xl font-[Creepster] text-horror-red mb-4">The Date</h2>
        <StoryNarration text={story} />
      </div>

      {/* Highlights */}
      <div>
        <h2 className="text-xl font-[Creepster] text-horror-cyan mb-3">Highlights</h2>
        <ul className="space-y-2">
          {highlights.map((highlight, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-start gap-2 text-horror-mist"
            >
              <span className="text-horror-red shrink-0">&#9830;</span>
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
