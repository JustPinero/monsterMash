import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DateSetup } from './DateSetup'
import { useMonsterStore } from '../../store'
import { monsters } from '../../data/monsters'

describe('DateSetup', () => {
  beforeEach(() => {
    useMonsterStore.setState({
      selectedSlot1: null,
      selectedSlot2: null,
    })
  })

  it('renders both picker slots', () => {
    render(<DateSetup onArrangeDate={vi.fn()} />)
    expect(screen.getByText('Monster #1')).toBeInTheDocument()
    expect(screen.getByText('Monster #2')).toBeInTheDocument()
  })

  it('renders VS divider', () => {
    render(<DateSetup onArrangeDate={vi.fn()} />)
    expect(screen.getByText('VS')).toBeInTheDocument()
  })

  it('disables arrange button when no monsters selected', () => {
    render(<DateSetup onArrangeDate={vi.fn()} />)
    expect(screen.getByText('Arrange the Date')).toBeDisabled()
  })

  it('enables arrange button when both monsters selected', () => {
    useMonsterStore.setState({
      selectedSlot1: monsters[0],
      selectedSlot2: monsters[1],
    })
    render(<DateSetup onArrangeDate={vi.fn()} />)
    expect(screen.getByText('Arrange the Date')).not.toBeDisabled()
  })

  it('calls onArrangeDate when button clicked', async () => {
    const onArrangeDate = vi.fn()
    useMonsterStore.setState({
      selectedSlot1: monsters[0],
      selectedSlot2: monsters[1],
    })
    render(<DateSetup onArrangeDate={onArrangeDate} />)
    await userEvent.click(screen.getByText('Arrange the Date'))
    expect(onArrangeDate).toHaveBeenCalledOnce()
  })

  it('prevents selecting the same monster twice via excludeId', async () => {
    useMonsterStore.setState({ selectedSlot1: monsters[0] })
    render(<DateSetup onArrangeDate={vi.fn()} />)

    // Open the second picker
    const chooseButtons = screen.getAllByText('Choose a monster...')
    await userEvent.click(chooseButtons[0]) // second slot

    // The first monster should not appear in the dropdown
    const options = screen.queryAllByText(monsters[0].name)
    // It should only appear once (in slot 1 display), not in the dropdown
    expect(options.length).toBeLessThanOrEqual(1)
  })
})
