# Monster Mash

A dating site for movie monsters. Users browse/swipe through iconic movie monsters, select two, and get a Claude-generated story of their first date.

## Tech Stack
- **Build:** Vite
- **UI:** React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v4 (custom horror theme)
- **State:** Zustand
- **Routing:** React Router v7
- **Animation:** Framer Motion
- **Testing:** Vitest + React Testing Library + MSW

## Project Structure
- `frontend/monster-mash/` - Main app directory
- `frontend/monster-mash/src/` - Source code
- `frontend/monster-mash/public/monsters/` - Monster images

## Environment Variables
API keys are **server-side only** (no `VITE_` prefix). They are injected by Vite dev proxy and never bundled into client code.
```
TMDB_API_KEY=     # TMDB v3 API key
CLAUDE_API_KEY=   # Anthropic API key (sk-ant-...)
```

## API Proxies (dev server)
- `/api/tmdb/*` → `https://api.themoviedb.org/3/*` (TMDB_API_KEY injected as query param)
- `/api/claude/*` → `https://api.anthropic.com/*` (CLAUDE_API_KEY injected as header)

## Development
```bash
cd frontend/monster-mash
npm run dev      # Start dev server (localhost:5173)
npm test         # Run tests (25 files, 122 tests)
npm run build    # Production build
```

## Horror Theme Colors
- Background: #0c0e09
- Surface: #1a1c17
- Red: #cc0000
- Blood: #8b0000
- Cyan: #61dafb
- Bone: #e8e0d0
- Font: Creepster (display), Inter (body)
