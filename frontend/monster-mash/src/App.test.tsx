import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Layout } from './components/layout'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages'

function renderWithRouter(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('App', () => {
  it('renders header with branding', () => {
    renderWithRouter()
    const elements = screen.getAllByText('Monster Mash')
    expect(elements.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the landing page hero CTA', () => {
    renderWithRouter()
    expect(screen.getByText('Start Swiping')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderWithRouter()
    expect(screen.getByText('Browse')).toBeInTheDocument()
    expect(screen.getByText('Date Night')).toBeInTheDocument()
  })

  it('renders the footer', () => {
    renderWithRouter()
    expect(screen.getByText(/Powered by dark magic/)).toBeInTheDocument()
  })
})
