# Monster Mash Architecture Reference

## Tech Stack
- **Build:** Vite 7 + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v4 with custom horror theme
- **State:** Zustand (3 stores)
- **Routing:** React Router v7 with lazy-loaded routes
- **Animation:** Framer Motion
- **Audio:** Web Audio API (synthesized ambient + SFX)
- **Testing:** Vitest + React Testing Library + MSW
- **APIs:** TMDB (images), Claude (story generation)

## Directory Structure
```
frontend/monster-mash/
  src/
    types/          # Monster, Date, TMDB TypeScript interfaces
    data/           # Curated 33-monster dataset
    services/       # TMDB client, Claude client, image resolver + cache
    store/          # Zustand: monsterStore, dateStore, uiStore
    hooks/          # useSwipe, useTypewriter, useMonsterImage, useAudio
    components/
      layout/       # Layout, Header (with audio toggle), Footer
      landing/      # HeroSection with SplashPage.jpg background
      monsters/     # MonsterCard, MonsterGallery, MonsterDetail, SwipeCard, SwipeStack
      date/         # DateSetup, MonsterPicker, DateLoading, DateStory, StoryNarration
      shared/       # Button, StatBar, Badge, LoadingSpinner, ErrorBoundary, PageTransition, ImageSkeleton
    pages/          # Home, Browse, MonsterProfile, DatePage, History, NotFound
    router/         # React Router config with lazy loading + Suspense
    test/           # Vitest setup, MSW mocks, integration tests
```

## Data Flow
1. Monster data lives in `src/data/monsters.ts` (static dataset)
2. Images resolve: localStorage cache → TMDB API → localImage/SVG fallback
3. Pre-resolution runs on app boot (`preResolveAllImages`) for all monsters with `tmdbMovieId`
4. Date flow: Select 2 monsters → Claude API generates JSON story → typewriter reveal
5. Date history persists via Zustand `persist` middleware (localStorage, survives refresh)

## API Integration
Both API keys are **server-side only** (no `VITE_` prefix), injected by Vite dev proxy:
- **TMDB:** Client fetches `/api/tmdb/*` → Vite proxy rewrites to `api.themoviedb.org/3/*` and injects `TMDB_API_KEY` as query param
- **Claude:** Client fetches `/api/claude/*` → Vite proxy rewrites to `api.anthropic.com/*` and injects `CLAUDE_API_KEY` as `x-api-key` header
- **Image caching:** localStorage with versioned cache key (version `'2'`)

## Horror Theme Colors
- `horror-bg`: #0c0e09 (near-black green)
- `horror-surface`: #1a1c17 (dark card bg)
- `horror-red`: #cc0000 (primary accent)
- `horror-blood`: #8b0000 (hover/deep red)
- `horror-cyan`: #61dafb (secondary accent)
- `horror-bone`: #e8e0d0 (text color)
- `horror-mist`: #b0b0b0 (muted text)

## Audio System
- Ambient: Web Audio API synthesized drone (55Hz + 82.5Hz + LFO)
- SFX: Swipe sounds (up/down pitch sweep), reveal arpeggio, click
- Muted by default, toggle in header
