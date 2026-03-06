import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DateLoading } from './DateLoading'

describe('DateLoading', () => {
  it('renders a loading message', () => {
    render(<DateLoading />)
    expect(screen.getByText('Consulting the dark arts...')).toBeInTheDocument()
  })
})
