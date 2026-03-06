import type { Monster } from './monster'

export interface DateScenario {
  monster1: Monster
  monster2: Monster
  story: string
  highlights: string[]
  compatibilityScore: number
  verdict: string
  location: string
}

export interface DateRequest {
  monster1Id: string
  monster2Id: string
}

export type DateStatus = 'idle' | 'loading' | 'success' | 'error'
