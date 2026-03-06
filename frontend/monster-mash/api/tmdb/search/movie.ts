import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'TMDB_API_KEY not configured' })
  }

  const url = new URL('https://api.themoviedb.org/3/search/movie')
  url.searchParams.set('api_key', apiKey)

  for (const [key, value] of Object.entries(req.query)) {
    const v = Array.isArray(value) ? value[0] : value
    if (v != null) url.searchParams.set(key, v)
  }

  const upstream = await fetch(url.toString())
  const data = await upstream.json()
  return res.status(upstream.status).json(data)
}
