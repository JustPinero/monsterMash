import { create } from 'zustand'

type ViewMode = 'gallery' | 'swipe'

interface UIStore {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  toggleViewMode: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  viewMode: 'gallery',
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === 'gallery' ? 'swipe' : 'gallery',
    })),
}))
