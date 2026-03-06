# Phase 11: QA Critical Fixes
**Reference:** QA-audit-001 (C1–C4)
**Status:** Complete

## Scope
Fix all 4 critical issues identified in QA audit.

## Tasks

### C1 + C2: Claude API proxy security
- Remove `VITE_CLAUDE_API_KEY` from client-side code
- Update `claude.ts` to send requests to `/api/claude/v1/messages` without embedding the API key
- Move API key injection to the Vite dev proxy via `headers` config in `vite.config.ts`
- Add runtime detection: if proxy unavailable, show descriptive error
- Update `.env.example` to use `CLAUDE_API_KEY` (non-VITE prefix, server-side only)

### C3: Fix useTypewriter infinite re-render
- Replace `onComplete` in useEffect dependency array with a ref
- Use `useRef` + `useEffect` to keep ref in sync with latest callback
- Remove `onComplete` from `skip` useCallback dependency array

### C4: Double-click guard on date generation
- Add `if (status === 'loading') return` guard at top of `handleArrangeDate`
- Destructure `status` from useDateStore in DatePage

## Verification
- `npm test` passes
- Dev server runs, date generation works
- Claude API key NOT visible in browser DevTools sources or network headers
- Rapid double-click on "Arrange the Date" only fires one API call
