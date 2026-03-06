import { motion } from 'framer-motion'
import type { Monster } from '../../types'
import { Badge } from '../shared'
import { MonsterStats } from './MonsterStats'
import { useMonsterImage } from '../../hooks/useMonsterImage'

interface MonsterDetailProps {
  monster: Monster
}

export function MonsterDetail({ monster }: MonsterDetailProps) {
  const imageSrc = useMonsterImage(monster)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid md:grid-cols-2 gap-8"
    >
      {/* Image */}
      <div className="aspect-[3/4] bg-horror-shadow rounded-xl overflow-hidden">
        <img
          src={imageSrc}
          alt={monster.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = '/monsters/placeholder.svg' }}
        />
      </div>

      {/* Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-[Creepster] text-horror-red">{monster.name}</h1>
          <p className="text-horror-mist mt-1">
            {monster.movie} ({monster.year})
          </p>
          <Badge variant="species">{monster.species}</Badge>
        </div>

        <p className="text-horror-bone leading-relaxed">{monster.bio}</p>

        <blockquote className="border-l-4 border-horror-red/50 pl-4 italic text-horror-mist">
          "{monster.catchphrase}"
        </blockquote>

        {/* Stats */}
        <div>
          <h2 className="text-xl font-bold text-horror-bone mb-3">Stats</h2>
          <MonsterStats stats={monster.stats} />
        </div>

        {/* Traits */}
        <div>
          <h2 className="text-xl font-bold text-horror-bone mb-2">Traits</h2>
          <div className="flex flex-wrap gap-2">
            {monster.traits.map((trait) => (
              <Badge key={trait}>{trait}</Badge>
            ))}
          </div>
        </div>

        {/* Likes */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-bold text-green-500 mb-2">Likes</h2>
            <ul className="space-y-1 text-sm text-horror-mist">
              {monster.likes.map((like) => (
                <li key={like}>+ {like}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-horror-red mb-2">Dislikes</h2>
            <ul className="space-y-1 text-sm text-horror-mist">
              {monster.dislikes.map((dislike) => (
                <li key={dislike}>- {dislike}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
