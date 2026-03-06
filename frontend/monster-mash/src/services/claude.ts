import type { Monster, DateScenario } from '../types'

const CLAUDE_PROXY = '/api/claude/v1/messages'

function buildPrompt(monster1: Monster, monster2: Monster): string {
  return `You are a creative comedy writer. Generate a hilarious and entertaining first date story between two iconic movie monsters.

Monster 1: ${monster1.name} from "${monster1.movie}" (${monster1.year})
- Species: ${monster1.species}
- Traits: ${monster1.traits.join(', ')}
- Likes: ${monster1.likes.join(', ')}
- Dislikes: ${monster1.dislikes.join(', ')}
- Catchphrase: "${monster1.catchphrase}"

Monster 2: ${monster2.name} from "${monster2.movie}" (${monster2.year})
- Species: ${monster2.species}
- Traits: ${monster2.traits.join(', ')}
- Likes: ${monster2.likes.join(', ')}
- Dislikes: ${monster2.dislikes.join(', ')}
- Catchphrase: "${monster2.catchphrase}"

Respond in valid JSON with this exact structure:
{
  "story": "A 3-4 paragraph entertaining story of their first date",
  "highlights": ["3-5 funny highlights from the date"],
  "compatibilityScore": <number 1-100>,
  "verdict": "A witty one-line verdict on their compatibility",
  "location": "Where the date took place"
}`
}

interface ClaudeResponse {
  content: Array<{ type: string; text: string }>
}

function stripCodeFences(text: string): string {
  return text.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim()
}

function parseDateResponse(text: string, monster1: Monster, monster2: Monster): DateScenario {
  const fallback: DateScenario = {
    monster1,
    monster2,
    story: text || 'The date was indescribable.',
    highlights: ['The date was indescribable'],
    compatibilityScore: 50,
    verdict: 'Some things are better left to the imagination.',
    location: 'Parts unknown',
  }

  try {
    const cleaned = stripCodeFences(text)
    const parsed = JSON.parse(cleaned)
    return {
      monster1,
      monster2,
      story: typeof parsed.story === 'string' ? parsed.story : fallback.story,
      highlights: Array.isArray(parsed.highlights) ? parsed.highlights : fallback.highlights,
      compatibilityScore: typeof parsed.compatibilityScore === 'number' ? parsed.compatibilityScore : fallback.compatibilityScore,
      verdict: typeof parsed.verdict === 'string' ? parsed.verdict : fallback.verdict,
      location: typeof parsed.location === 'string' ? parsed.location : fallback.location,
    }
  } catch {
    return fallback
  }
}

export async function generateDateStory(monster1: Monster, monster2: Monster): Promise<DateScenario> {
  const res = await fetch(CLAUDE_PROXY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: buildPrompt(monster1, monster2) }],
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Claude API failed: ${res.status} — ${body}`)
  }

  const data: ClaudeResponse = await res.json()
  const text = data.content?.[0]?.text ?? ''
  return parseDateResponse(text, monster1, monster2)
}
