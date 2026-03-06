import type { Monster } from '../types'
import { tmdbImageUrl, getMovie } from './tmdb'

const CACHE_KEY = 'monster-mash-images'
const CACHE_VERSION_KEY = 'monster-mash-images-version'
const CACHE_VERSION = '2'

function getCache(): Record<string, string> {
  try {
    if (localStorage.getItem(CACHE_VERSION_KEY) !== CACHE_VERSION) {
      localStorage.removeItem(CACHE_KEY)
      localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION)
      return {}
    }
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

function setCache(id: string, url: string): void {
  try {
    const cache = getCache()
    cache[id] = url
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // Silently degrade if localStorage is full or unavailable (e.g. Safari private mode)
  }
}

function getLocalFallback(monster: Monster): string {
  if (monster.localImage) return monster.localImage
  return `/monsters/${monster.id}.svg`
}

export async function resolveMonsterImage(monster: Monster): Promise<string> {
  const cached = getCache()[monster.id]
  if (cached) return cached

  // Try TMDB first, fall back to localImage
  if (monster.tmdbMovieId) {
    try {
      const movie = await getMovie(monster.tmdbMovieId)
      const url = tmdbImageUrl(movie?.poster_path ?? null)
      if (url) {
        setCache(monster.id, url)
        return url
      }
    } catch {
      // Fall through to local fallback
    }
  }

  return getLocalFallback(monster)
}

export function getMonsterImageSync(monster: Monster): string {
  const cached = getCache()[monster.id]
  if (cached) return cached
  return getLocalFallback(monster)
}

let preResolvePromise: Promise<void> | null = null

export async function preResolveAllImages(monsters: Monster[]): Promise<void> {
  if (preResolvePromise) return preResolvePromise

  preResolvePromise = (async () => {
    const cache = getCache()
    const unresolved = monsters.filter((m) => !cache[m.id] && m.tmdbMovieId)

    // Batch resolve in chunks of 5 to avoid rate limiting
    for (let i = 0; i < unresolved.length; i += 5) {
      const chunk = unresolved.slice(i, i + 5)
      await Promise.allSettled(
        chunk.map(async (monster) => {
          try {
            const movie = await getMovie(monster.tmdbMovieId!)
            const url = tmdbImageUrl(movie?.poster_path ?? null)
            if (url) setCache(monster.id, url)
          } catch {
            // Skip failures silently
          }
        })
      )
    }
  })().finally(() => {
    preResolvePromise = null
  })

  return preResolvePromise
}
