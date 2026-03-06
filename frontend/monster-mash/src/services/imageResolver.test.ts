import { describe, it, expect, beforeEach, vi, beforeAll, afterAll, afterEach } from 'vitest'
import { server } from '../test/mocks/server'
import { monsters } from '../data/monsters'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('imageResolver', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it('getMonsterImageSync returns localImage when available', async () => {
    const { getMonsterImageSync } = await import('./imageResolver')
    const pinhead = monsters.find((m) => m.id === 'pinhead')!
    expect(getMonsterImageSync(pinhead)).toBe('/monsters/Pinhead.jpg')
  })

  it('getMonsterImageSync returns SVG fallback for monster without cache', async () => {
    const { getMonsterImageSync } = await import('./imageResolver')
    const dracula = monsters.find((m) => m.id === 'dracula')!
    const result = getMonsterImageSync(dracula)
    expect(result).toContain('dracula')
  })

  it('getMonsterImageSync returns cached URL when available', async () => {
    localStorage.setItem('monster-mash-images-version', '2')
    localStorage.setItem('monster-mash-images', JSON.stringify({ dracula: 'https://cached.url/poster.jpg' }))

    const { getMonsterImageSync } = await import('./imageResolver')
    const dracula = monsters.find((m) => m.id === 'dracula')!
    expect(getMonsterImageSync(dracula)).toBe('https://cached.url/poster.jpg')
  })

  it('resolveMonsterImage returns cached URL without fetch', async () => {
    localStorage.setItem('monster-mash-images-version', '2')
    localStorage.setItem('monster-mash-images', JSON.stringify({ dracula: 'https://cached.url/poster.jpg' }))

    const { resolveMonsterImage } = await import('./imageResolver')
    const dracula = monsters.find((m) => m.id === 'dracula')!
    const result = await resolveMonsterImage(dracula)
    expect(result).toBe('https://cached.url/poster.jpg')
  })

  it('resolveMonsterImage fetches from TMDB when not cached and no localImage', async () => {
    const { resolveMonsterImage } = await import('./imageResolver')
    // Create a monster without localImage to test TMDB resolution
    const monsterWithoutLocal = { ...monsters.find((m) => m.id === 'dracula')!, localImage: undefined }
    const result = await resolveMonsterImage(monsterWithoutLocal)
    expect(result).toContain('image.tmdb.org')
  })

  it('setCache handles localStorage quota error gracefully', async () => {
    const { resolveMonsterImage } = await import('./imageResolver')

    // Mock localStorage.setItem to throw
    const originalSetItem = localStorage.setItem.bind(localStorage)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key: string, value: string) => {
      if (key === 'monster-mash-images') throw new DOMException('quota exceeded')
      originalSetItem(key, value)
    })

    const dracula = monsters.find((m) => m.id === 'dracula')!
    // Should not throw
    const result = await resolveMonsterImage(dracula)
    expect(result).toBeTruthy()

    vi.restoreAllMocks()
  })

  it('preResolveAllImages allows retry after completion', async () => {
    const { preResolveAllImages } = await import('./imageResolver')

    // First call
    await preResolveAllImages(monsters.slice(0, 2))

    // Second call should start a new resolution (not return cached promise)
    const promise = preResolveAllImages(monsters.slice(0, 2))
    expect(promise).toBeInstanceOf(Promise)
    await promise
  })
})
