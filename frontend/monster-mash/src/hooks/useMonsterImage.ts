import { useState, useEffect } from 'react'
import type { Monster } from '../types'
import { resolveMonsterImage, getMonsterImageSync } from '../services/imageResolver'

export function useMonsterImage(monster: Monster): string {
  const [src, setSrc] = useState(() => getMonsterImageSync(monster))

  useEffect(() => {
    let cancelled = false
    resolveMonsterImage(monster).then((url) => {
      if (!cancelled) setSrc(url)
    }).catch(() => {
      // Keep fallback image on error
    })
    return () => { cancelled = true }
  }, [monster.id])

  return src
}
