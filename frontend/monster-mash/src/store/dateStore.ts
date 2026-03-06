import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DateScenario, DateStatus } from '../types'

interface DateStore {
  status: DateStatus
  currentDate: DateScenario | null
  history: DateScenario[]
  error: string | null

  setLoading: () => void
  setDateResult: (scenario: DateScenario) => void
  setError: (error: string) => void
  reset: () => void
}

export const useDateStore = create<DateStore>()(
  persist(
    (set) => ({
      status: 'idle',
      currentDate: null,
      history: [],
      error: null,

      setLoading: () => set({ status: 'loading', error: null }),

      setDateResult: (scenario) =>
        set((state) => ({
          status: 'success',
          currentDate: scenario,
          history: [...state.history, scenario],
          error: null,
        })),

      setError: (error) => set({ status: 'error', error }),

      reset: () => set({ status: 'idle', currentDate: null, error: null }),
    }),
    {
      name: 'monster-mash-dates',
      partialize: (state) => ({ history: state.history }),
    }
  )
)
