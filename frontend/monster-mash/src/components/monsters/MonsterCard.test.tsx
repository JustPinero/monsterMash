import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { MonsterCard } from './MonsterCard'
import { monsters } from '../../data/monsters'

function renderCard(monsterIndex = 0) {
  return render(
    <MemoryRouter>
      <MonsterCard monster={monsters[monsterIndex]} />
    </MemoryRouter>
  )
}

describe('MonsterCard', () => {
  it('renders monster name', () => {
    renderCard()
    expect(screen.getByText(monsters[0].name)).toBeInTheDocument()
  })

  it('renders movie and year', () => {
    renderCard()
    expect(screen.getByText(`${monsters[0].movie} (${monsters[0].year})`)).toBeInTheDocument()
  })

  it('renders species badge', () => {
    renderCard()
    expect(screen.getByText(monsters[0].species)).toBeInTheDocument()
  })

  it('renders trait badges', () => {
    renderCard()
    expect(screen.getByText(monsters[0].traits[0])).toBeInTheDocument()
  })

  it('links to monster profile', () => {
    renderCard()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/monster/${monsters[0].id}`)
  })
})
