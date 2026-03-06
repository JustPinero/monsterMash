import { Link } from 'react-router-dom'
import { Button } from '../components/shared'

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-[Creepster] text-horror-red mb-4">404</h1>
      <p className="text-xl text-horror-bone mb-2">This monster has escaped...</p>
      <p className="text-horror-mist mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="secondary">Return to the Crypt</Button>
      </Link>
    </div>
  )
}
