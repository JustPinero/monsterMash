interface BadgeProps {
  children: string
  variant?: 'trait' | 'species'
}

export function Badge({ children, variant = 'trait' }: BadgeProps) {
  const styles =
    variant === 'species'
      ? 'bg-horror-red/20 text-horror-red border-horror-red/30'
      : 'bg-horror-cyan/10 text-horror-cyan border-horror-cyan/30'

  return (
    <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${styles}`}>
      {children}
    </span>
  )
}
