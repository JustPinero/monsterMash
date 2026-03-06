import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/tmdb/search/movie', ({ request }) => {
    const url = new URL(request.url, 'http://localhost')
    const query = url.searchParams.get('query')

    return HttpResponse.json({
      page: 1,
      results: [
        {
          id: 16326,
          title: query ?? 'Dracula',
          poster_path: '/test-poster.jpg',
          backdrop_path: '/test-backdrop.jpg',
          release_date: '1931-02-14',
          overview: 'A vampire movie',
        },
      ],
      total_results: 1,
      total_pages: 1,
    })
  }),

  http.get('/api/tmdb/movie', ({ request }) => {
    const url = new URL(request.url, 'http://localhost')
    const id = url.searchParams.get('id')
    return HttpResponse.json({
      id: Number(id),
      title: 'Test Movie',
      poster_path: '/test-poster.jpg',
      backdrop_path: '/test-backdrop.jpg',
      release_date: '1931-02-14',
      overview: 'A test movie',
    })
  }),

  http.post('/api/claude/v1/messages', async () => {
    return HttpResponse.json({
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            story: 'It was a dark and stormy night when Dracula met the Xenomorph at a dimly lit restaurant.',
            highlights: [
              'Dracula tried to bite the Xenomorph but acid blood was not on the menu',
              'The Xenomorph kept extending its inner jaw during dinner',
              'They bonded over their mutual fear of Sigourney Weaver',
            ],
            compatibilityScore: 42,
            verdict: 'Acid reflux meets blood thirst — what could go wrong?',
            location: 'Le Château Noir, a French restaurant in Transylvania',
          }),
        },
      ],
    })
  }),
]
