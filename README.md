# Monster Mash

A dating site for movie monsters. Browse iconic movie monsters, pick two, and get a Claude-generated story of their first date.

## What It Does

- Browse and swipe through classic movie monsters (sourced from TMDB)
- Select two monsters to match
- Get an AI-generated first date story powered by Claude
- Horror-themed UI with custom dark aesthetic

## Tech Stack

- React 19 + TypeScript (strict)
- Vite
- Tailwind CSS v4 (custom horror theme)
- Zustand (state management)
- React Router v7
- Framer Motion (animations)
- MSW (API mocking in tests)
- Vitest + React Testing Library

## Getting Started

```bash
cd frontend/monster-mash

# Install dependencies
npm install

# Start dev server (localhost:5173)
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file in `frontend/monster-mash/`:

```
TMDB_API_KEY=       # TMDB v3 API key (server-side only)
CLAUDE_API_KEY=     # Anthropic API key (server-side only)
```

API keys are injected by the Vite dev proxy and never bundled into client code.

## API Proxies (Dev Server)

- `/api/tmdb/*` proxies to TMDB API (key injected as query param)
- `/api/claude/*` proxies to Anthropic API (key injected as header)

## Test Coverage

122 tests across 25 test files.

## Theme

Horror aesthetic: dark backgrounds (#0c0e09), blood reds (#cc0000, #8b0000), bone whites (#e8e0d0), and Creepster display font.
