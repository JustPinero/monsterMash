import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'TMDB_API_KEY not configured' })
  }

  const { id } = req.query
  const movieId = Array.isArray(id) ? id[0] : id
  if (!movieId) {
    return res.status(400).json({ error: 'Missing id query parameter' })
  }

  const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}`)
  url.searchParams.set('api_key', apiKey)

  const upstream = await fetch(url.toString())
  const data = await upstream.json()
  return res.status(upstream.status).json(data)
}
