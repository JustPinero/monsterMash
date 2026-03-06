import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatBar } from './StatBar'

describe('StatBar', () => {
  it('renders label and value', () => {
    render(<StatBar label="Fear" value={8} />)
    expect(screen.getByText('Fear')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
  })
})
