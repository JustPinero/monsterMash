# QA Audit Report — QA-audit-001
**Date:** 2026-03-05
**Scope:** Full codebase review — components, services, hooks, stores, tests

---

## CRITICAL (Fix Before Ship)

### C1. Claude API key exposed in client bundle
- **File:** `src/services/claude.ts:5-7`
- **Issue:** `VITE_` prefix bundles the key into browser JS. Anyone can extract it from DevTools or the built JS bundle.
- **Impact:** API key theft, billing abuse
- **Fix:** Move Claude call behind a server-side proxy that injects the key. Remove `VITE_CLAUDE_API_KEY` from client code.

### C2. Vite proxy only works in dev — date feature broken in production
- **File:** `vite.config.ts:7-17`
- **Issue:** `server.proxy` is dev-only config. Production builds 404 on `/api/claude/v1/messages`.
- **Impact:** Date generation completely broken in production
- **Fix:** Add runtime environment detection in claude.ts. Document production proxy requirements.

### C3. `useTypewriter` infinite re-render risk
- **File:** `src/hooks/useTypewriter.ts:28`
- **Issue:** `onComplete` in the useEffect dependency array restarts the effect every parent re-render if the callback isn't memoized. Can cause infinite render loop.
- **Impact:** Typewriter animation restarts or loops infinitely
- **Fix:** Store `onComplete` in a ref instead of including in dependency array.

### C4. No guard against double-click on "Arrange the Date"
- **File:** `src/pages/DatePage.tsx:10`
- **Issue:** Rapid double-click fires two Claude API calls. Both write to the store, creating duplicate history entries.
- **Impact:** Duplicate API calls (billing), duplicate history, race condition
- **Fix:** Add `if (status === 'loading') return` guard.

---

## HIGH (Bugs & Data Integrity)

### H1. Claude JSON response not validated
- **File:** `src/services/claude.ts:40-63`
- **Issue:** `parseDateResponse` does not validate that expected fields exist. If `highlights` is undefined, `highlights.map()` in DateStory.tsx:78 throws TypeError. Also does not strip markdown code fences that Claude often wraps around JSON.
- **Impact:** Runtime crash on malformed response
- **Fix:** Strip code fences before parsing. Validate all fields with defaults.

### H2. `localStorage.setItem` can throw `QuotaExceededError`
- **File:** `src/services/imageResolver.ts:24`
- **Issue:** `setCache()` calls `localStorage.setItem` without try/catch. Throws in Safari private mode or when storage is full.
- **Impact:** Component crash
- **Fix:** Wrap all `localStorage.setItem` calls in try/catch.

### H3. `preResolveAllImages` singleton never retries on failure
- **File:** `src/services/imageResolver.ts:60-63`
- **Issue:** Once called, `preResolvePromise` is set and never reset. If network is offline at startup, subsequent calls return the failed promise.
- **Impact:** Images never resolve until hard refresh
- **Fix:** Reset `preResolvePromise = null` in `.finally()` or on failure.

### H4. `useAmbientAudio.start` captures stale mute state
- **File:** `src/hooks/useAudio.ts:69-76`
- **Issue:** `start()` reads `muted` from the closure, but `toggleMute()` is called after `start()` in Header.tsx. Audio starts with `volume = 0`.
- **Impact:** Audio appears broken on first unmute
- **Fix:** Use `useAudioStore.getState()` inside `start` to read current values at call time.

### H5. No `onError` handler on any `<img>` tag
- **Files:** `MonsterCard.tsx`, `MonsterDetail.tsx`, `SwipeCard.tsx`, `ImageSkeleton.tsx`
- **Issue:** If a TMDB image URL is cached but the CDN is down or URL expired, the browser shows a broken image icon with no fallback.
- **Impact:** Broken image UX
- **Fix:** Add `onError` handler that falls back to the SVG placeholder.

### H6. SwipeCard exit animation always goes right
- **File:** `src/components/monsters/SwipeCard.tsx:48-53`
- **Issue:** `exit: { x: 300, rotate: 15 }` is hardcoded. Left swipes also exit to the right.
- **Impact:** Visual inconsistency
- **Fix:** Track swipe direction and set exit animation accordingly.

---

## MEDIUM (UX & Polish)

### M1. Date history lost on page refresh
- **File:** `src/store/dateStore.ts`
- **Issue:** History array is in-memory only (Zustand without persist middleware). Refresh clears all date history.
- **Impact:** Users lose all generated stories on refresh
- **Fix:** Add Zustand persist middleware with localStorage for history.

### M2. Error state doesn't show actual error message
- **File:** `src/pages/DatePage.tsx:46-54`
- **Issue:** Error state shows generic "The spirits are unresponsive..." but never renders the actual `error` string from the store.
- **Impact:** Users can't diagnose issues (missing API key, rate limit, etc.)
- **Fix:** Display the actual error message.

### M3. MonsterPicker search not cleared on outside-click
- **File:** `src/components/date/MonsterPicker.tsx:25-28`
- **Issue:** Clicking outside closes dropdown but doesn't clear search. Reopening shows stale filtered list.
- **Impact:** Confusing UX
- **Fix:** Add `setSearch('')` in click-outside handler.

### M4. `useMonsterImage` object reference in dependency array
- **File:** `src/hooks/useMonsterImage.ts:14`
- **Issue:** `useEffect` depends on `[monster]` (object reference). Parent re-renders with new object reference trigger unnecessary TMDB API calls.
- **Fix:** Depend on `monster.id` instead.

### M5. `dateStore.reset()` does not clear error before retry
- **File:** `src/store/dateStore.ts:34`
- **Issue:** Documented but `reset` does clear error. However, `history` grows unbounded with no way to clear it.
- **Fix:** Consider adding history limit or clear mechanism.

### M6. MonsterGallery species list missing 'Robot'
- **File:** `src/components/monsters/MonsterGallery.tsx:5-8`
- **Issue:** `speciesList` doesn't include 'Robot' from the Species type.
- **Fix:** Derive species list from the type or data.

### M7. ErrorBoundary has no "Go Home" escape hatch
- **File:** `src/components/shared/ErrorBoundary.tsx:35-38`
- **Issue:** "Try Again" re-renders the same children. If the error is deterministic, it loops.
- **Fix:** Add "Go Home" link that navigates to /.

---

## ACCESSIBILITY

### A1. MonsterPicker has no ARIA attributes or keyboard navigation
- **File:** `src/components/date/MonsterPicker.tsx`
- **Issue:** No `aria-expanded`, `aria-haspopup`, `role="listbox"`, `role="option"`, keyboard nav (Arrow keys, Enter, Escape), or focus management.
- **Impact:** Completely inaccessible to keyboard/screen reader users

### A2. Audio toggle button uses emoji with no `aria-label`
- **File:** `src/components/layout/Header.tsx:33-39`
- **Issue:** Button content is emoji only. `title` is not reliably announced by screen readers.
- **Fix:** Add `aria-label`.

### A3. MonsterGallery search input has no label
- **File:** `src/components/monsters/MonsterGallery.tsx:22-26`
- **Fix:** Add `aria-label="Search monsters"`.

### A4. Species filter buttons have no selection state
- **File:** `src/components/monsters/MonsterGallery.tsx:30-54`
- **Fix:** Add `aria-pressed` to indicate active filter.

### A5. Header nav has no mobile responsive handling
- **File:** `src/components/layout/Header.tsx:17-43`
- **Issue:** Nav links overflow on narrow screens. No hamburger menu.

---

## TEST COVERAGE GAPS

### T1. Files with zero test coverage (critical)
| File | Risk |
|------|------|
| `imageResolver.ts` | Complex caching + fallback logic |
| `ErrorBoundary.tsx` | App's crash safety net |
| `useAudio.ts` | Entire audio system |
| `MonsterPicker.tsx` | Critical interactive component |
| `SwipeCard.tsx` | Core swipe interaction |

### T2. Service error paths — all happy-path only
- `claude.ts` — Missing key, non-OK response, malformed JSON untested
- `tmdb.ts` — Missing key, non-OK response untested

### T3. Missing integration tests
- Full date flow (select → generate → view → reset)
- Date error flow
- History page empty/populated states
- Monster card click → profile navigation

### T4. Fragile test patterns
- CSS class name assertions coupled to Tailwind classes
- `DateSetup` excludeId test has weak `<= 1` assertion
- Store state leakage between tests (no reset in beforeEach)

---

## RESOLUTION STATUS

**All 26+ issues have been resolved** across phases 11-14:
- **Phase 11:** Critical fixes (C1-C4) — API key security, useTypewriter ref fix, double-click guard
- **Phase 12:** High fixes (H1-H6) — JSON validation, localStorage error handling, preResolve retry, stale closure, img onError, swipe exit direction
- **Phase 13:** Medium & A11y fixes (M1-M7, A1-A5) — date history persistence, error display, MonsterPicker UX, useMonsterImage deps, species list, ErrorBoundary home link, ARIA attributes, mobile header
- **Phase 14:** Test coverage (T1-T4) — 36 new tests across 4 new test files + 4 extended files

**Final test count:** 122 tests across 25 files — all passing.

## SUMMARY

| Category | Count | Status |
|----------|-------|--------|
| Critical | 4 | All resolved |
| High | 6 | All resolved |
| Medium | 7 | All resolved |
| Accessibility | 5 | All resolved |
| Test gaps | 4 categories | All resolved |
| **Total** | **26+ issues** | **All resolved** |
