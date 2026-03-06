import { useParams, Link } from 'react-router-dom'
import { MonsterDetail } from '../components/monsters'
import { monsters } from '../data/monsters'
import { Button } from '../components/shared'

export function MonsterProfile() {
  const { id } = useParams<{ id: string }>()
  const monster = monsters.find((m) => m.id === id)

  if (!monster) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-[Creepster] text-horror-red mb-4">Monster Not Found</h1>
        <p className="text-horror-mist mb-8">This creature has escaped into the night...</p>
        <Link to="/browse">
          <Button variant="secondary">Back to Browse</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/browse" className="text-horror-cyan hover:text-horror-bone transition-colors mb-6 inline-block">
        &larr; Back to Browse
      </Link>
      <MonsterDetail monster={monster} />
    </div>
  )
}
