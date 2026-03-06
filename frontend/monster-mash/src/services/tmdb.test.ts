import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../test/mocks/server'
import { tmdbImageUrl } from './tmdb'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('tmdbImageUrl', () => {
  it('builds correct image URL with default size', () => {
    expect(tmdbImageUrl('/poster.jpg')).toBe('https://image.tmdb.org/t/p/w500/poster.jpg')
  })

  it('builds correct image URL with custom size', () => {
    expect(tmdbImageUrl('/poster.jpg', 'w200')).toBe('https://image.tmdb.org/t/p/w200/poster.jpg')
  })

  it('returns null for null path', () => {
    expect(tmdbImageUrl(null)).toBeNull()
  })
})

describe('searchMovie', () => {
  it('returns movie results', async () => {
    const { searchMovie } = await import('./tmdb')
    const results = await searchMovie('Dracula')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].poster_path).toBeTruthy()
  })

  it('throws on non-OK response', async () => {
    server.use(
      http.get('/api/tmdb/search/movie', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    const { searchMovie } = await import('./tmdb')
    await expect(searchMovie('Dracula')).rejects.toThrow()
  })
})

describe('getMovie', () => {
  it('returns movie data by ID', async () => {
    const { getMovie } = await import('./tmdb')
    const movie = await getMovie(16326)
    expect(movie).not.toBeNull()
    expect(movie!.id).toBe(16326)
  })

  it('returns null on non-OK response', async () => {
    server.use(
      http.get('/api/tmdb/movie/:id', () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

    const { getMovie } = await import('./tmdb')
    const movie = await getMovie(99999)
    expect(movie).toBeNull()
  })
})
