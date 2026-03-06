# API Contracts

## TMDB API (v3) — via Vite dev proxy
Client base path: `/api/tmdb` → proxied to `https://api.themoviedb.org/3`
API key injected server-side as query param by Vite proxy (never sent from client).

### Search Movies
```
GET /api/tmdb/search/movie?query={query}
Response: { results: [{ id, title, poster_path, backdrop_path, release_date, overview }] }
```

### Get Movie
```
GET /api/tmdb/movie/{id}
Response: { id, title, poster_path, backdrop_path, release_date, overview }
```

### Image URLs (direct CDN, no proxy needed)
```
https://image.tmdb.org/t/p/{size}{poster_path}
Sizes: w200, w500, original
```

## Claude API — via Vite dev proxy
Client base path: `/api/claude` → proxied to `https://api.anthropic.com`
API key injected server-side as `x-api-key` header by Vite proxy (never sent from client).

### Generate Date Story
```
POST /api/claude/v1/messages
Headers: Content-Type: application/json, anthropic-version: 2023-06-01
Body: { model: "claude-sonnet-4-20250514", max_tokens: 1024, messages: [{ role: "user", content: "..." }] }
Response: { content: [{ type: "text", text: "{JSON}" }] }
```

Note: Client sends `anthropic-version` header; `x-api-key` is injected by the proxy.

### Expected JSON in Claude response
```json
{
  "story": "3-4 paragraph date story",
  "highlights": ["array of 3-5 funny moments"],
  "compatibilityScore": 42,
  "verdict": "One-line witty verdict",
  "location": "Where the date took place"
}
```

Claude response parsing: strips markdown code fences, validates all fields with type checks and defaults.

## Environment Variables
Server-side only (no `VITE_` prefix — never bundled into client code):
```
TMDB_API_KEY=    # TMDB v3 API key
CLAUDE_API_KEY=  # Anthropic API key (sk-ant-...)
```
