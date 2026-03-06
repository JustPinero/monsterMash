import type { MonsterStats as MonsterStatsType } from '../../types'
import { StatBar } from '../shared'

interface MonsterStatsProps {
  stats: MonsterStatsType
}

const statColors: Record<string, string> = {
  fear: 'bg-horror-red',
  charm: 'bg-pink-500',
  wit: 'bg-horror-cyan',
  strength: 'bg-amber-500',
  chaos: 'bg-purple-500',
}

export function MonsterStats({ stats }: MonsterStatsProps) {
  return (
    <div className="space-y-2">
      {Object.entries(stats).map(([key, value]) => (
        <StatBar
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          color={statColors[key] ?? 'bg-horror-red'}
        />
      ))}
    </div>
  )
}
