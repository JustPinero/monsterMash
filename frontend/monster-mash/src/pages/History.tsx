import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useDateStore } from '../store'
import { useMonsterImage } from '../hooks/useMonsterImage'
import { Button } from '../components/shared'
import { PageTransition } from '../components/shared'
import type { DateScenario } from '../types'

function HistoryCard({ scenario, index }: { scenario: DateScenario; index: number }) {
  const img1 = useMonsterImage(scenario.monster1)
  const img2 = useMonsterImage(scenario.monster2)

  const scoreColor =
    scenario.compatibilityScore >= 70
      ? 'text-green-500'
      : scenario.compatibilityScore >= 40
        ? 'text-yellow-500'
        : 'text-horror-red'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-horror-surface border border-horror-red/10 rounded-xl p-6 hover:border-horror-red/30 transition-colors"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-horror-shadow border-2 border-horror-red/20 overflow-hidden shrink-0">
          <img src={img1} alt={scenario.monster1.name} className="w-full h-full object-cover" />
        </div>
        <span className="text-horror-red font-[Creepster] text-xl">&hearts;</span>
        <div className="w-14 h-14 rounded-full bg-horror-shadow border-2 border-horror-red/20 overflow-hidden shrink-0">
          <img src={img2} alt={scenario.monster2.name} className="w-full h-full object-cover" />
        </div>
        <div className="ml-2 flex-1 min-w-0">
          <p className="font-bold text-horror-bone text-sm truncate">
            {scenario.monster1.name} & {scenario.monster2.name}
          </p>
          <p className="text-xs text-horror-mist truncate">{scenario.location}</p>
        </div>
        <p className={`text-2xl font-[Creepster] ${scoreColor} shrink-0`}>
          {scenario.compatibilityScore}%
        </p>
      </div>

      <p className="text-sm text-horror-bone italic mb-3">"{scenario.verdict}"</p>

      <details className="group">
        <summary className="text-horror-cyan text-sm cursor-pointer hover:text-horror-bone transition-colors">
          Read the full story...
        </summary>
        <div className="mt-3 pt-3 border-t border-horror-red/10">
          <p className="text-sm text-horror-mist leading-relaxed whitespace-pre-wrap">{scenario.story}</p>
          <ul className="mt-3 space-y-1">
            {scenario.highlights.map((h, i) => (
              <li key={i} className="text-xs text-horror-mist flex gap-2">
                <span className="text-horror-red">&#9830;</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </details>
    </motion.div>
  )
}

export function History() {
  const { history } = useDateStore()

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-[Creepster] text-horror-red mb-8 text-center">Date History</h1>

        {history.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-horror-mist mb-2">No dates yet...</p>
            <p className="text-horror-mist/60 mb-8">Arrange a monster date to see it here.</p>
            <Link to="/date">
              <Button variant="primary">Arrange a Date</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {[...history].reverse().map((scenario, i) => (
              <HistoryCard
                key={`${scenario.monster1.id}-${scenario.monster2.id}-${i}`}
                scenario={scenario}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
