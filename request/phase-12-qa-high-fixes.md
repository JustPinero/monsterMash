# Phase 12: QA High-Priority Fixes
**Reference:** QA-audit-001 (H1–H6)
**Status:** Complete

## Scope
Fix all 6 high-priority issues identified in QA audit.

## Tasks

### H1: Validate Claude JSON response
- Strip markdown code fences before JSON.parse
- Validate all expected fields exist with safe defaults
- Ensure `highlights` is always an array
- Ensure `compatibilityScore` is always a number
- Ensure `story`, `verdict`, `location` are always strings

### H2: localStorage QuotaExceededError
- Wrap all `localStorage.setItem` calls in `imageResolver.ts` with try/catch
- Silently degrade if storage is unavailable

### H3: preResolveAllImages retry on failure
- Reset `preResolvePromise = null` after resolution completes (success or failure)
- Allow subsequent calls to retry failed resolutions

### H4: Fix useAmbientAudio stale closure
- Use `useAudioStore.getState()` inside `start` callback instead of closure values
- Remove `muted` and `ambientVolume` from useCallback dependency array

### H5: Add onError fallback to all img tags
- Add `onError` handler to MonsterCard, MonsterDetail, SwipeCard, ImageSkeleton
- Fallback to SVG placeholder on error: `/monsters/placeholder.svg`

### H6: Fix SwipeCard exit animation direction
- Track swipe direction (left/right) via drag end handler
- Use direction to set exit animation: left exits left, right exits right

## Verification
- `npm test` passes
- Malformed Claude response shows fallback story (not crash)
- App works in Safari private mode (localStorage unavailable)
- Broken image URLs show placeholder SVG
- Left swipe animates card exiting left
