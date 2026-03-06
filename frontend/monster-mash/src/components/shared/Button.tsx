import { motion } from 'framer-motion'
import type { ReactNode, MouseEventHandler } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  variant?: ButtonVariant
  children: ReactNode
  disabled?: boolean
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-horror-red hover:bg-horror-blood text-white border-horror-red hover:border-horror-blood shadow-lg shadow-horror-red/20',
  secondary:
    'bg-horror-surface hover:bg-horror-shadow text-horror-cyan border-horror-cyan/30 hover:border-horror-cyan',
  ghost:
    'bg-transparent hover:bg-horror-surface text-horror-bone border-horror-bone/20 hover:border-horror-bone/40',
}

export function Button({ variant = 'primary', className = '', children, disabled, onClick, type = 'button' }: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`px-6 py-3 rounded-lg border font-semibold transition-colors cursor-pointer
        ${variantStyles[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  )
}
