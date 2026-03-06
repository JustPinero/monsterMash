# Phase 14: QA Test Coverage
**Reference:** QA-audit-001 (T1–T4)
**Status:** Complete

## Scope
Fill critical test coverage gaps identified in QA audit.

## Tasks

### T1: New test files for untested components/services

#### imageResolver.test.ts
- getMonsterImageSync returns localImage when available
- getMonsterImageSync returns placeholder when no localImage
- resolveMonsterImage returns cached URL from localStorage
- resolveMonsterImage fetches from TMDB when not cached
- resolveMonsterImage handles localStorage QuotaExceededError gracefully
- preResolveAllImages batches requests in chunks of 5
- preResolveAllImages allows retry after failure

#### ErrorBoundary.test.tsx
- Renders children when no error
- Catches rendering errors and shows fallback UI
- "Try Again" button resets error state
- "Go Home" link navigates to /

#### MonsterPicker.test.tsx
- Renders trigger button with placeholder text
- Opens dropdown on click
- Shows search input when open
- Filters monsters by search text
- Excludes monster specified by excludeId
- Calls onSelect when monster clicked
- Closes on outside click and clears search
- Closes on Escape key

#### useAudio.test.ts
- useAudioStore toggleMute flips muted state
- useSfx returns sound functions

### T2: Service error path tests

#### claude.test.ts additions
- Throws when API key not configured
- Throws on non-OK response (401, 429, 500)
- Returns fallback DateScenario on malformed JSON
- Strips markdown code fences from response
- Handles empty content array

#### tmdb.test.ts additions
- searchMovie returns empty array when no API key
- getMovie returns null when no API key
- searchMovie throws on non-OK response

### T3: Integration test additions
- Full date flow: select monsters → arrange → loading → story → reset
- History page shows past dates
- Monster card click navigates to profile

### T4: Fix fragile test patterns
- Replace CSS class assertions with semantic queries where possible
- Reset Zustand stores in beforeEach across all test files
- Strengthen DateSetup excludeId assertion

## Verification
- All new + existing tests pass
- No test isolation issues (tests can run in any order)
