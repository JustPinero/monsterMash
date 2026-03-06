import { useMonsterStore } from '../../store'
import { MonsterPicker } from './MonsterPicker'
import { Button } from '../shared'

interface DateSetupProps {
  onArrangeDate: () => void
}

export function DateSetup({ onArrangeDate }: DateSetupProps) {
  const { selectedSlot1, selectedSlot2, selectSlot1, selectSlot2 } = useMonsterStore()

  const bothSelected = selectedSlot1 !== null && selectedSlot2 !== null

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        {/* Slot 1 */}
        <MonsterPicker
          selectedMonster={selectedSlot1}
          excludeId={selectedSlot2?.id}
          onSelect={selectSlot1}
          label="Monster #1"
        />

        {/* VS Divider */}
        <div className="text-3xl font-[Creepster] text-horror-red pt-6">VS</div>

        {/* Slot 2 */}
        <MonsterPicker
          selectedMonster={selectedSlot2}
          excludeId={selectedSlot1?.id}
          onSelect={selectSlot2}
          label="Monster #2"
        />
      </div>

      <div className="text-center mt-8">
        <Button
          variant="primary"
          disabled={!bothSelected}
          onClick={onArrangeDate}
          className="text-lg px-8 py-4"
        >
          Arrange the Date
        </Button>
      </div>
    </div>
  )
}
