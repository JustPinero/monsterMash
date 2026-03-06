import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MonsterPicker } from './MonsterPicker'
import { monsters } from '../../data/monsters'

describe('MonsterPicker', () => {
  const defaultProps = {
    selectedMonster: null,
    onSelect: vi.fn(),
    label: 'Monster 1',
  }

  it('renders trigger button with placeholder text', () => {
    render(<MonsterPicker {...defaultProps} />)
    expect(screen.getByText('Choose a monster...')).toBeInTheDocument()
  })

  it('shows selected monster name when one is selected', () => {
    render(<MonsterPicker {...defaultProps} selectedMonster={monsters[0]} />)
    expect(screen.getByText(monsters[0].name)).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    render(<MonsterPicker {...defaultProps} />)
    await userEvent.click(screen.getByText('Choose a monster...'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('shows search input when open', async () => {
    render(<MonsterPicker {...defaultProps} />)
    await userEvent.click(screen.getByText('Choose a monster...'))
    expect(screen.getByLabelText('Search monsters')).toBeInTheDocument()
  })

  it('filters monsters by search text', async () => {
    render(<MonsterPicker {...defaultProps} />)
    await userEvent.click(screen.getByText('Choose a monster...'))
    await userEvent.type(screen.getByLabelText('Search monsters'), 'Dracula')

    expect(screen.getByText('Count Dracula')).toBeInTheDocument()
    expect(screen.queryByText('Xenomorph')).not.toBeInTheDocument()
  })

  it('excludes monster specified by excludeId', async () => {
    render(<MonsterPicker {...defaultProps} excludeId="dracula" />)
    await userEvent.click(screen.getByText('Choose a monster...'))

    const options = screen.getAllByRole('option')
    const draculaOption = options.find((o) => o.textContent?.includes('Count Dracula'))
    expect(draculaOption).toBeUndefined()
  })

  it('calls onSelect when monster clicked', async () => {
    const onSelect = vi.fn()
    render(<MonsterPicker {...defaultProps} onSelect={onSelect} />)
    await userEvent.click(screen.getByText('Choose a monster...'))

    const dracula = monsters.find((m) => m.id === 'dracula')!
    await userEvent.click(screen.getByText(dracula.name))
    expect(onSelect).toHaveBeenCalledWith(dracula)
  })

  it('has aria-expanded and aria-haspopup on trigger', async () => {
    render(<MonsterPicker {...defaultProps} />)
    const trigger = screen.getByRole('button', { name: /choose a monster/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')

    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })
})
