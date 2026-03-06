import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { MonsterDetail } from './MonsterDetail'
import { monsters } from '../../data/monsters'

const monster = monsters[0] // Dracula

function renderDetail() {
  return render(
    <MemoryRouter>
      <MonsterDetail monster={monster} />
    </MemoryRouter>
  )
}

describe('MonsterDetail', () => {
  it('shows monster name', () => {
    renderDetail()
    expect(screen.getByText(monster.name)).toBeInTheDocument()
  })

  it('shows bio', () => {
    renderDetail()
    expect(screen.getByText(monster.bio)).toBeInTheDocument()
  })

  it('shows catchphrase', () => {
    renderDetail()
    expect(screen.getByText(`"${monster.catchphrase}"`)).toBeInTheDocument()
  })

  it('shows all stat bars', () => {
    renderDetail()
    expect(screen.getByText('Fear')).toBeInTheDocument()
    expect(screen.getByText('Charm')).toBeInTheDocument()
    expect(screen.getByText('Wit')).toBeInTheDocument()
    expect(screen.getByText('Strength')).toBeInTheDocument()
    expect(screen.getByText('Chaos')).toBeInTheDocument()
  })

  it('shows likes and dislikes', () => {
    renderDetail()
    expect(screen.getByText(`+ ${monster.likes[0]}`)).toBeInTheDocument()
    expect(screen.getByText(`- ${monster.dislikes[0]}`)).toBeInTheDocument()
  })
})
