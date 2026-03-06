import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import { SwipeStack } from './SwipeStack'
import { useMonsterStore } from '../../store'

function renderStack() {
  return render(
    <MemoryRouter>
      <SwipeStack />
    </MemoryRouter>
  )
}

describe('SwipeStack', () => {
  beforeEach(() => {
    useMonsterStore.setState({ swipeIndex: 0, speciesFilter: null, searchQuery: '' })
  })

  it('renders the top monster card', () => {
    renderStack()
    expect(screen.getByText('Count Dracula')).toBeInTheDocument()
  })

  it('shows empty state when all cards swiped', () => {
    const count = useMonsterStore.getState().monsters.length
    useMonsterStore.setState({ swipeIndex: count })
    renderStack()
    expect(screen.getByText('No more monsters to swipe!')).toBeInTheDocument()
  })
})
