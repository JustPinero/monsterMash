import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import { MonsterGallery } from './MonsterGallery'
import { useMonsterStore } from '../../store'

function renderGallery() {
  return render(
    <MemoryRouter>
      <MonsterGallery />
    </MemoryRouter>
  )
}

describe('MonsterGallery', () => {
  beforeEach(() => {
    useMonsterStore.setState({ speciesFilter: null, searchQuery: '' })
  })

  it('renders monster cards', () => {
    renderGallery()
    expect(screen.getByText('Count Dracula')).toBeInTheDocument()
  })

  it('filters by species when clicking filter button', async () => {
    renderGallery()
    await userEvent.click(screen.getByRole('button', { name: 'Vampire' }))

    expect(screen.getByText('Count Dracula')).toBeInTheDocument()
    expect(screen.getByText('Count Orlok')).toBeInTheDocument()
    expect(screen.queryByText('Xenomorph')).not.toBeInTheDocument()
  })

  it('filters by search query', async () => {
    renderGallery()
    const input = screen.getByPlaceholderText('Search monsters...')
    await userEvent.type(input, 'dracula')

    expect(screen.getByText('Count Dracula')).toBeInTheDocument()
    expect(screen.queryByText('Xenomorph')).not.toBeInTheDocument()
  })

  it('shows "All" filter as active by default', () => {
    renderGallery()
    const allButton = screen.getByText('All')
    expect(allButton.className).toContain('bg-horror-red')
  })
})
