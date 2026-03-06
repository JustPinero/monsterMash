import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = 'Summoning the spirits...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-12 h-12 border-4 border-horror-red/30 border-t-horror-red rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <p className="text-horror-mist text-sm animate-pulse">{message}</p>
    </div>
  )
}
