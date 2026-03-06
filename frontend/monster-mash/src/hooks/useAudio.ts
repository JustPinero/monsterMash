import { useCallback, useRef, useEffect } from 'react'
import { create } from 'zustand'

interface AudioStore {
  muted: boolean
  ambientVolume: number
  sfxVolume: number
  toggleMute: () => void
  setAmbientVolume: (v: number) => void
  setSfxVolume: (v: number) => void
}

export const useAudioStore = create<AudioStore>((set) => ({
  muted: true,
  ambientVolume: 0.15,
  sfxVolume: 0.3,
  toggleMute: () => set((s) => ({ muted: !s.muted })),
  setAmbientVolume: (v) => set({ ambientVolume: v }),
  setSfxVolume: (v) => set({ sfxVolume: v }),
}))

// Generate horror ambient tone using Web Audio API
function createAmbientNode(ctx: AudioContext, volume: number): GainNode {
  const gain = ctx.createGain()
  gain.gain.value = volume

  // Deep drone
  const osc1 = ctx.createOscillator()
  osc1.type = 'sine'
  osc1.frequency.value = 55 // Low A
  const g1 = ctx.createGain()
  g1.gain.value = 0.3
  osc1.connect(g1).connect(gain)
  osc1.start()

  // Eerie overtone
  const osc2 = ctx.createOscillator()
  osc2.type = 'sine'
  osc2.frequency.value = 82.5 // slight detune
  const g2 = ctx.createGain()
  g2.gain.value = 0.1
  osc2.connect(g2).connect(gain)
  osc2.start()

  // Slow LFO on the drone
  const lfo = ctx.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.value = 0.2
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 5
  lfo.connect(lfoGain).connect(osc1.frequency)
  lfo.start()

  return gain
}

export function useAmbientAudio() {
  const ctxRef = useRef<AudioContext | null>(null)
  const ambientRef = useRef<GainNode | null>(null)
  const { muted, ambientVolume } = useAudioStore()

  useEffect(() => {
    if (!ctxRef.current) return
    if (ambientRef.current) {
      ambientRef.current.gain.value = muted ? 0 : ambientVolume
    }
  }, [muted, ambientVolume])

  const start = useCallback(() => {
    if (ctxRef.current) return
    const { muted: m, ambientVolume: vol } = useAudioStore.getState()
    const ctx = new AudioContext()
    ctxRef.current = ctx
    const ambient = createAmbientNode(ctx, m ? 0 : vol)
    ambient.connect(ctx.destination)
    ambientRef.current = ambient
  }, [])

  const stop = useCallback(() => {
    ctxRef.current?.close()
    ctxRef.current = null
    ambientRef.current = null
  }, [])

  useEffect(() => () => stop(), [stop])

  return { start, stop }
}

export function useSfx() {
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext()
    }
    return ctxRef.current
  }, [])

  const playSwipe = useCallback((direction: 'left' | 'right') => {
    const { muted, sfxVolume } = useAudioStore.getState()
    if (muted) return

    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.value = direction === 'right' ? 440 : 330
    osc.frequency.exponentialRampToValueAtTime(
      direction === 'right' ? 880 : 165,
      ctx.currentTime + 0.15
    )

    gain.gain.value = sfxVolume
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)

    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.2)
  }, [getCtx])

  const playReveal = useCallback(() => {
    const { muted, sfxVolume } = useAudioStore.getState()
    if (muted) return

    const ctx = getCtx()
    const notes = [261.6, 329.6, 392, 523.2]

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq

      const start = ctx.currentTime + i * 0.12
      gain.gain.setValueAtTime(sfxVolume * 0.5, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3)

      osc.connect(gain).connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 0.3)
    })
  }, [getCtx])

  const playClick = useCallback(() => {
    const { muted, sfxVolume } = useAudioStore.getState()
    if (muted) return

    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 800
    gain.gain.value = sfxVolume * 0.15
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.05)
  }, [getCtx])

  useEffect(() => () => { ctxRef.current?.close() }, [])

  return { playSwipe, playReveal, playClick }
}
