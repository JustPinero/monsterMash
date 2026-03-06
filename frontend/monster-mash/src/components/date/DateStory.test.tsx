import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DateStory } from './DateStory'
import { monsters } from '../../data/monsters'
import type { DateScenario } from '../../types'

const mockScenario: DateScenario = {
  monster1: monsters[0],
  monster2: monsters[1],
  story: 'It was a dark and stormy night.',
  highlights: ['They shared a laugh', 'Things got weird'],
  compatibilityScore: 75,
  verdict: 'A match made in the crypt!',
  location: 'Castle Transylvania',
}

describe('DateStory', () => {
  it('displays monster names', () => {
    render(<DateStory scenario={mockScenario} />)
    expect(screen.getByText(monsters[0].name)).toBeInTheDocument()
    expect(screen.getByText(monsters[1].name)).toBeInTheDocument()
  })

  it('displays compatibility score', () => {
    render(<DateStory scenario={mockScenario} />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('displays verdict', () => {
    render(<DateStory scenario={mockScenario} />)
    expect(screen.getByText('"A match made in the crypt!"')).toBeInTheDocument()
  })

  it('displays location', () => {
    render(<DateStory scenario={mockScenario} />)
    expect(screen.getByText('Castle Transylvania')).toBeInTheDocument()
  })

  it('displays highlights', () => {
    render(<DateStory scenario={mockScenario} />)
    expect(screen.getByText('They shared a laugh')).toBeInTheDocument()
    expect(screen.getByText('Things got weird')).toBeInTheDocument()
  })
})
