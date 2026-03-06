import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout'
import { Home } from '../pages/Home'
import { Browse } from '../pages/Browse'
import { MonsterProfile } from '../pages/MonsterProfile'
import { DatePage } from '../pages/DatePage'
import { History } from '../pages/History'
import { NotFound } from '../pages/NotFound'
import { useMonsterStore, useDateStore } from '../store'
import { monsters } from '../data/monsters'
import type { DateScenario } from '../types'

function renderApp(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/monster/:id" element={<MonsterProfile />} />
          <Route path="/date" element={<DatePage />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('Integration: Full Navigation Flow', () => {
  beforeEach(() => {
    useMonsterStore.setState({
      selectedSlot1: null,
      selectedSlot2: null,
      speciesFilter: null,
      searchQuery: '',
      swipeIndex: 0,
    })
    useDateStore.setState({
      status: 'idle',
      currentDate: null,
      history: [],
      error: null,
    })
  })

  it('navigates from home to browse via CTA', async () => {
    renderApp('/')
    expect(screen.getByText('Start Swiping')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Start Swiping'))
    expect(screen.getByText('Browse Monsters')).toBeInTheDocument()
  })

  it('navigates to browse via header link', async () => {
    renderApp('/')
    await userEvent.click(screen.getByText('Browse'))
    expect(screen.getByText('Browse Monsters')).toBeInTheDocument()
  })

  it('navigates to date page via header link', async () => {
    renderApp('/')
    await userEvent.click(screen.getByText('Date Night'))
    expect(screen.getAllByText('Date Night').length).toBeGreaterThanOrEqual(1)
  })

  it('renders browse page with monster cards', () => {
    renderApp('/browse')
    expect(screen.getByText('Count Dracula')).toBeInTheDocument()
    expect(screen.getByText('Browse Monsters')).toBeInTheDocument()
  })

  it('renders monster profile from direct URL', () => {
    renderApp('/monster/dracula')
    expect(screen.getByText('Count Dracula')).toBeInTheDocument()
    expect(screen.getByText(/The original charmer/)).toBeInTheDocument()
  })

  it('shows 404 for unknown monster', () => {
    renderApp('/monster/nonexistent')
    expect(screen.getByText('Monster Not Found')).toBeInTheDocument()
  })

  it('shows 404 for unknown routes', () => {
    renderApp('/unknown-page')
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('toggles between gallery and swipe views on browse', async () => {
    renderApp('/browse')
    expect(screen.getByText('Swipe View')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Swipe View'))
    expect(screen.getByText('Gallery View')).toBeInTheDocument()
  })

  it('date page shows setup with disabled button when no monsters selected', () => {
    renderApp('/date')
    expect(screen.getByText('Arrange the Date')).toBeDisabled()
  })

  it('history page shows empty state when no dates', () => {
    renderApp('/history')
    expect(screen.getByText('No dates yet...')).toBeInTheDocument()
    expect(screen.getByText('Arrange a Date')).toBeInTheDocument()
  })

  it('history page shows past dates', () => {
    const scenario: DateScenario = {
      monster1: monsters[0],
      monster2: monsters[1],
      story: 'A test date story',
      highlights: ['Highlight 1'],
      compatibilityScore: 75,
      verdict: 'Great match!',
      location: 'Dark Castle',
    }
    useDateStore.setState({ history: [scenario] })

    renderApp('/history')
    expect(screen.getByText(`${monsters[0].name} & ${monsters[1].name}`)).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
    expect(screen.getByText('"Great match!"')).toBeInTheDocument()
  })

  it('navigates to history page via header link', async () => {
    renderApp('/')
    await userEvent.click(screen.getByText('History'))
    expect(screen.getByText('Date History')).toBeInTheDocument()
  })
})
