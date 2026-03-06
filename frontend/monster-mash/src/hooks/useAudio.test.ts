import { describe, it, expect, beforeEach } from 'vitest'
import { useAudioStore } from './useAudio'

describe('useAudioStore', () => {
  beforeEach(() => {
    useAudioStore.setState({ muted: true, ambientVolume: 0.15, sfxVolume: 0.3 })
  })

  it('starts muted by default', () => {
    expect(useAudioStore.getState().muted).toBe(true)
  })

  it('toggleMute flips muted state', () => {
    useAudioStore.getState().toggleMute()
    expect(useAudioStore.getState().muted).toBe(false)

    useAudioStore.getState().toggleMute()
    expect(useAudioStore.getState().muted).toBe(true)
  })

  it('setAmbientVolume updates volume', () => {
    useAudioStore.getState().setAmbientVolume(0.5)
    expect(useAudioStore.getState().ambientVolume).toBe(0.5)
  })

  it('setSfxVolume updates volume', () => {
    useAudioStore.getState().setSfxVolume(0.8)
    expect(useAudioStore.getState().sfxVolume).toBe(0.8)
  })
})
