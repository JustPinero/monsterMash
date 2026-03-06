import type { TMDBSearchResult, TMDBMovie } from '../types'

const TMDB_PROXY = '/api/tmdb'
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

export function tmdbImageUrl(path: string | null, size: 'w200' | 'w500' | 'original' = 'w500'): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

export async function searchMovie(query: string): Promise<TMDBMovie[]> {
  const res = await fetch(
    `${TMDB_PROXY}/search/movie?query=${encodeURIComponent(query)}`
  )
  if (!res.ok) throw new Error(`TMDB search failed: ${res.status}`)

  const data: TMDBSearchResult = await res.json()
  return data.results
}

export async function getMovie(movieId: number): Promise<TMDBMovie | null> {
  const res = await fetch(`${TMDB_PROXY}/movie?id=${movieId}`)
  if (!res.ok) return null

  return res.json()
}
