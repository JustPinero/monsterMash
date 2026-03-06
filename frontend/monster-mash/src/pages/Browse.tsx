import { MonsterGallery, SwipeStack } from '../components/monsters'
import { useUIStore } from '../store'

export function Browse() {
  const { viewMode, toggleViewMode } = useUIStore()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-[Creepster] text-horror-red">Browse Monsters</h1>
        <button
          onClick={toggleViewMode}
          className="px-4 py-2 bg-horror-surface border border-horror-cyan/30 text-horror-cyan rounded-lg hover:border-horror-cyan transition-colors cursor-pointer"
        >
          {viewMode === 'gallery' ? 'Swipe View' : 'Gallery View'}
        </button>
      </div>

      {viewMode === 'gallery' ? <MonsterGallery /> : <SwipeStack />}
    </div>
  )
}
