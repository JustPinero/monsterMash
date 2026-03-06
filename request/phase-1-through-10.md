# Monster Mash Build Log

## Phase 1: Types & Monster Dataset
- Defined TypeScript interfaces: Monster, MonsterStats, Species, DateScenario, TMDB types
- Built curated dataset of 33 iconic movie monsters with full bios, stats (1-10), traits, likes, dislikes, catchphrases
- Tests: 5 passing (30+ entries, required fields, stats range, unique IDs, valid species)

## Phase 2: API Service Layer
- TMDB service: searchMovie, getMovie, tmdbImageUrl
- Claude service: generateDateStory with JSON system prompt + fallback parser
- Image resolver: TMDB -> local fallback with localStorage cache
- MSW mock handlers for TMDB and Claude endpoints
- Tests: 6 passing (image URLs, search, movie fetch, story generation)

## Phase 3: State Management (Zustand)
- useMonsterStore: monsters, selection (2 slots), filtering, swipe index
- useDateStore: story generation status, current date, history
- useUIStore: gallery/swipe view mode toggle
- Tests: 14 passing (all state transitions)

## Phase 4: Shared Components
- Button (primary/secondary/ghost variants with Framer Motion)
- StatBar (animated fill bar)
- Badge (trait/species pills)
- LoadingSpinner (horror-themed)
- Tests: 11 passing

## Phase 5: Layout & Landing Page
- React Router v7 with lazy-loaded routes
- Layout shell: Header + Footer + ErrorBoundary
- Landing page: SplashPage.jpg hero with gradient overlay, CTA button
- Tests: 4 passing

## Phase 6: Monster Gallery & Profiles
- MonsterCard: image, name, movie, species badge, trait pills
- MonsterGallery: responsive grid, species filter buttons, search input
- MonsterDetail: full profile with stats, traits, bio, likes/dislikes
- Tests: 14 passing

## Phase 7: Swipe Cards
- useSwipe hook: threshold + velocity-based gesture detection
- SwipeCard: Framer Motion drag, rotation, LIKE/NOPE overlays
- SwipeStack: card stack with counter, "Start Over" button
- Tests: 8 passing

## Phase 8: Date Setup
- DateSetup: two MonsterPicker slots with VS divider
- MonsterPicker: searchable dropdown with click-outside close
- Duplicate prevention via excludeId prop
- "Arrange the Date" button disabled until both selected
- Tests: 6 passing

## Phase 9: Claude Story Generation
- DateLoading: rotating horror-themed loading messages with AnimatePresence
- useTypewriter hook: character-by-character reveal with skip
- StoryNarration: typewriter effect with skip button
- DateStory: portraits, compatibility score, verdict, location, story, highlights
- Full flow: Setup -> Loading -> Story reveal
- Tests: 9 passing

## Phase 10: Polish & Integration
- ErrorBoundary with themed error message
- PageTransition with Framer Motion fade+slide
- ImageSkeleton for loading states
- Lazy-loaded routes with Suspense
- Full navigation integration tests
- Tests: 9 passing

## Post-Launch Enhancements
- **Local fallback images:** Unique SVG character silhouettes for all 33 monsters
- **Image pre-resolution:** Background TMDB fetch on app load, batched in chunks of 5
- **useMonsterImage hook:** Sync fallback -> async TMDB resolution per component
- **Mobile swipe polish:** Reduced thresholds, snap-to-origin, responsive card sizing
- **Sound effects:** Web Audio API synthesized ambient drone + swipe/reveal/click SFX
- **Audio toggle:** Mute/unmute in header, muted by default
- **Date history page:** `/history` route showing all past dates with expandable stories

## Phase 11: QA Critical Fixes (QA-audit-001)
- **Claude API key security:** Removed `VITE_CLAUDE_API_KEY` from client bundle, key now injected server-side via Vite proxy headers
- **useTypewriter fix:** Replaced `onComplete` in dep array with `useRef` to prevent infinite re-render loop
- **Double-click guard:** Added `status === 'loading'` guard in DatePage to prevent duplicate API calls
- **Error display:** Date error state now shows actual error message alongside themed text

## Phase 12: QA High-Priority Fixes (QA-audit-001)
- **Claude JSON validation:** Strip markdown code fences, validate all field types with safe defaults
- **localStorage safety:** Wrapped `setItem` in try/catch for Safari private mode / quota errors
- **preResolveAllImages retry:** Reset singleton promise after completion to allow retries on failure
- **Audio stale closure fix:** `useAmbientAudio.start` now reads current state via `getState()` instead of closure
- **Image error fallback:** Added `onError` handler to all `<img>` tags (MonsterCard, MonsterDetail, SwipeCard, DateStory, ImageSkeleton)
- **SwipeCard exit direction:** Cards now animate exit in the correct direction (left swipe exits left)

## Phase 13: Medium & Accessibility Fixes (QA-audit-001)
- **Date history persistence:** Added Zustand persist middleware to dateStore (history survives refresh)
- **MonsterPicker accessibility:** `aria-expanded`, `aria-haspopup`, `role="listbox"`, `role="option"`, `aria-label` on search, Escape to close, search cleared on outside-click
- **Gallery accessibility:** `aria-label` on search, `aria-pressed` on species filters, `role="group"` on filter group, species list derived from data
- **Audio toggle:** Added `aria-label` to mute/unmute button
- **Mobile responsive header:** Hamburger menu on small screens with slide-out nav
- **ErrorBoundary:** Added "Go Home" escape hatch link alongside "Try Again"
- **useMonsterImage:** Fixed object reference dependency to use `monster.id`, added `.catch()` for unhandled rejections

## Phase 14: QA Test Coverage (QA-audit-001)
- **New test files:** imageResolver (7 tests), ErrorBoundary (4 tests), MonsterPicker (8 tests), useAudio (4 tests)
- **Extended tests:** claude.ts +5 error paths, tmdb.ts +2 error paths, dateStore +3 edge cases, integration +3 flows
- **Store isolation:** Added `beforeEach` reset in integration tests to prevent state leakage
- **Total:** 25 test files, 122 tests passing
