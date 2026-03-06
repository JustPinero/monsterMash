import { motion } from 'framer-motion'

interface StatBarProps {
  label: string
  value: number
  max?: number
  color?: string
}

export function StatBar({ label, value, max = 10, color = 'bg-horror-red' }: StatBarProps) {
  const percentage = (value / max) * 100

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-horror-mist w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-horror-shadow rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="text-sm text-horror-bone w-6 text-right">{value}</span>
    </div>
  )
}
