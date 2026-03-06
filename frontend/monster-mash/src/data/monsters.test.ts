import { describe, it, expect } from 'vitest'
import { monsters } from './monsters'

describe('Monster Dataset', () => {
  it('has at least 30 monsters', () => {
    expect(monsters.length).toBeGreaterThanOrEqual(30)
  })

  it('every monster has all required fields', () => {
    for (const monster of monsters) {
      expect(monster.id).toBeTruthy()
      expect(monster.name).toBeTruthy()
      expect(monster.species).toBeTruthy()
      expect(monster.movie).toBeTruthy()
      expect(monster.year).toBeGreaterThan(1900)
      expect(monster.bio).toBeTruthy()
      expect(monster.catchphrase).toBeTruthy()
      expect(monster.traits.length).toBeGreaterThan(0)
      expect(monster.likes.length).toBeGreaterThan(0)
      expect(monster.dislikes.length).toBeGreaterThan(0)
    }
  })

  it('every monster has valid stats between 1 and 10', () => {
    for (const monster of monsters) {
      const { fear, charm, wit, strength, chaos } = monster.stats
      for (const [key, val] of Object.entries({ fear, charm, wit, strength, chaos })) {
        expect(val, `${monster.name}.stats.${key}`).toBeGreaterThanOrEqual(1)
        expect(val, `${monster.name}.stats.${key}`).toBeLessThanOrEqual(10)
      }
    }
  })

  it('every monster has a unique ID', () => {
    const ids = monsters.map((m) => m.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every monster has a valid species', () => {
    const validSpecies = [
      'Vampire', 'Undead', 'Werewolf', 'Alien', 'Demon', 'Kaiju',
      'Ghost', 'Slasher', 'Cryptid', 'Mutant', 'Witch', 'Robot', 'Hybrid',
    ]
    for (const monster of monsters) {
      expect(validSpecies, `${monster.name} has invalid species: ${monster.species}`)
        .toContain(monster.species)
    }
  })
})
