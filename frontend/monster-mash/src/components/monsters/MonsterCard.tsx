import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Monster } from '../../types'
import { Badge } from '../shared'
import { useMonsterImage } from '../../hooks/useMonsterImage'

interface MonsterCardProps {
  monster: Monster
  index?: number
}

export function MonsterCard({ monster, index = 0 }: MonsterCardProps) {
  const imageSrc = useMonsterImage(monster)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: '0 0 20px rgba(204, 0, 0, 0.3)' }}
      className="bg-horror-surface rounded-xl overflow-hidden border border-horror-red/10 hover:border-horror-red/40 transition-colors"
    >
      <Link to={`/monster/${monster.id}`} className="block">
        <div className="aspect-[3/4] bg-horror-shadow overflow-hidden">
          <img
            src={imageSrc}
            alt={monster.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/monsters/placeholder.svg' }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-horror-bone truncate">{monster.name}</h3>
          <p className="text-sm text-horror-mist truncate">{monster.movie} ({monster.year})</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <Badge variant="species">{monster.species}</Badge>
            {monster.traits.slice(0, 2).map((trait) => (
              <Badge key={trait}>{trait}</Badge>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
