import { useMonsterStore, useDateStore } from '../store'
import { DateSetup, DateLoading, DateStory } from '../components/date'
import { generateDateStory } from '../services/claude'
import { Button } from '../components/shared'

export function DatePage() {
  const { selectedSlot1, selectedSlot2, clearSelections } = useMonsterStore()
  const { status, currentDate, error, setLoading, setDateResult, setError, reset } = useDateStore()

  const handleArrangeDate = async () => {
    if (!selectedSlot1 || !selectedSlot2) return
    if (status === 'loading') return

    setLoading()
    try {
      const scenario = await generateDateStory(selectedSlot1, selectedSlot2)
      setDateResult(scenario)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const handleReset = () => {
    reset()
    clearSelections()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-[Creepster] text-horror-red mb-8 text-center">Date Night</h1>

      {status === 'idle' && <DateSetup onArrangeDate={handleArrangeDate} />}

      {status === 'loading' && <DateLoading />}

      {status === 'success' && currentDate && (
        <>
          <DateStory scenario={currentDate} />
          <div className="text-center mt-8">
            <Button variant="secondary" onClick={handleReset}>
              Arrange Another Date
            </Button>
          </div>
        </>
      )}

      {status === 'error' && (
        <div className="text-center py-12">
          <p className="text-horror-red text-xl mb-4">The spirits are unresponsive...</p>
          <p className="text-horror-mist mb-4">Something went wrong generating the date story.</p>
          {error && <p className="text-horror-mist/60 text-sm mb-8 font-mono">{error}</p>}
          <Button variant="secondary" onClick={reset}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}
