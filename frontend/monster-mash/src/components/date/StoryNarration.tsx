import { useTypewriter } from '../../hooks/useTypewriter'
import { Button } from '../shared'

interface StoryNarrationProps {
  text: string
  onComplete?: () => void
}

export function StoryNarration({ text, onComplete }: StoryNarrationProps) {
  const { displayText, isComplete, skip } = useTypewriter({
    text,
    speed: 20,
    onComplete,
  })

  return (
    <div className="relative">
      <p className="text-horror-bone leading-relaxed whitespace-pre-wrap">{displayText}</p>
      {!isComplete && (
        <div className="mt-4">
          <Button variant="ghost" onClick={skip} className="text-sm">
            Skip
          </Button>
        </div>
      )}
    </div>
  )
}
