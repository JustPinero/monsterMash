import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../test/mocks/server'
import { monsters } from '../data/monsters'
import { generateDateStory } from './claude'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const dracula = monsters.find((m) => m.id === 'dracula')!
const xenomorph = monsters.find((m) => m.id === 'xenomorph')!

describe('generateDateStory', () => {
  it('returns a valid date scenario', async () => {
    const result = await generateDateStory(dracula, xenomorph)

    expect(result.monster1.id).toBe('dracula')
    expect(result.monster2.id).toBe('xenomorph')
    expect(result.story).toBeTruthy()
    expect(result.highlights.length).toBeGreaterThan(0)
    expect(result.compatibilityScore).toBeGreaterThanOrEqual(1)
    expect(result.compatibilityScore).toBeLessThanOrEqual(100)
    expect(result.verdict).toBeTruthy()
    expect(result.location).toBeTruthy()
  })

  it('throws on non-OK response', async () => {
    server.use(
      http.post('/api/claude/v1/messages', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    await expect(generateDateStory(dracula, xenomorph)).rejects.toThrow('Claude API failed: 500')
  })

  it('returns fallback on malformed JSON', async () => {
    server.use(
      http.post('/api/claude/v1/messages', () => {
        return HttpResponse.json({
          content: [{ type: 'text', text: 'not valid json at all' }],
        })
      })
    )

    const result = await generateDateStory(dracula, xenomorph)
    expect(result.story).toBe('not valid json at all')
    expect(result.highlights).toEqual(['The date was indescribable'])
    expect(result.compatibilityScore).toBe(50)
  })

  it('strips markdown code fences from response', async () => {
    server.use(
      http.post('/api/claude/v1/messages', () => {
        return HttpResponse.json({
          content: [{
            type: 'text',
            text: '```json\n{"story":"Fenced story","highlights":["h1"],"compatibilityScore":77,"verdict":"Nice","location":"Park"}\n```',
          }],
        })
      })
    )

    const result = await generateDateStory(dracula, xenomorph)
    expect(result.story).toBe('Fenced story')
    expect(result.compatibilityScore).toBe(77)
  })

  it('handles empty content array gracefully', async () => {
    server.use(
      http.post('/api/claude/v1/messages', () => {
        return HttpResponse.json({ content: [] })
      })
    )

    const result = await generateDateStory(dracula, xenomorph)
    expect(result.compatibilityScore).toBe(50)
    expect(result.highlights).toEqual(['The date was indescribable'])
  })

  it('validates field types and falls back for invalid fields', async () => {
    server.use(
      http.post('/api/claude/v1/messages', () => {
        return HttpResponse.json({
          content: [{
            type: 'text',
            text: JSON.stringify({
              story: 123,
              highlights: 'not an array',
              compatibilityScore: 'high',
              verdict: null,
              location: undefined,
            }),
          }],
        })
      })
    )

    const result = await generateDateStory(dracula, xenomorph)
    expect(typeof result.story).toBe('string')
    expect(Array.isArray(result.highlights)).toBe(true)
    expect(typeof result.compatibilityScore).toBe('number')
    expect(typeof result.verdict).toBe('string')
    expect(typeof result.location).toBe('string')
  })
})
