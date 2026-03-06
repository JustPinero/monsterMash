# Phase 13: QA Medium & Accessibility Fixes
**Reference:** QA-audit-001 (M1–M7, A1–A5)
**Status:** Complete

## Scope
Fix medium-priority UX issues and accessibility gaps.

## Tasks

### M1: Persist date history to localStorage
- Add Zustand persist middleware to dateStore for `history` array
- Use `zustand/middleware` persist with localStorage

### M2: Show actual error message in date error state
- Render the `error` string from useDateStore in DatePage error UI
- Keep the themed message but add the actual error below it

### M3: Clear MonsterPicker search on outside-click
- Add `setSearch('')` in the click-outside handler

### M4: Fix useMonsterImage dependency
- Change useEffect dependency from `[monster]` to `[monster.id]`

### M6: Derive species list from data
- Generate species filter list from the actual monster dataset instead of hardcoded array

### M7: ErrorBoundary escape hatch
- Add "Go Home" link alongside "Try Again" that navigates to /

### A1: MonsterPicker accessibility
- Add `aria-expanded`, `aria-haspopup="listbox"` to trigger button
- Add `role="listbox"` to dropdown list
- Add `role="option"` to list items
- Add `aria-label` to search input
- Add keyboard navigation: Escape to close

### A2: Audio toggle aria-label
- Add `aria-label={muted ? 'Unmute audio' : 'Mute audio'}` to button

### A3: Gallery search aria-label
- Add `aria-label="Search monsters"` to search input

### A4: Species filter aria-pressed
- Add `aria-pressed={species === speciesFilter}` to filter buttons

### A5: Mobile responsive header
- Add hamburger menu for mobile with slide-out nav
- Hide nav links behind hamburger on small screens

## Verification
- `npm test` passes
- Date history persists across page refresh
- Error messages show actual error text
- MonsterPicker works with keyboard (Escape to close)
- Screen reader announces audio toggle, search input, filter states
- Header collapses to hamburger on mobile
