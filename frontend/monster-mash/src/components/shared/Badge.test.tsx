import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders text content', () => {
    render(<Badge>Vampire</Badge>)
    expect(screen.getByText('Vampire')).toBeInTheDocument()
  })

  it('applies species variant style', () => {
    render(<Badge variant="species">Alien</Badge>)
    expect(screen.getByText('Alien').className).toContain('text-horror-red')
  })

  it('applies trait variant style by default', () => {
    render(<Badge>Romantic</Badge>)
    expect(screen.getByText('Romantic').className).toContain('text-horror-cyan')
  })
})
