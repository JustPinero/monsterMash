export interface MonsterStats {
  fear: number      // 1-10
  charm: number     // 1-10
  wit: number       // 1-10
  strength: number  // 1-10
  chaos: number     // 1-10
}

export type Species =
  | 'Vampire'
  | 'Undead'
  | 'Werewolf'
  | 'Alien'
  | 'Demon'
  | 'Kaiju'
  | 'Ghost'
  | 'Slasher'
  | 'Cryptid'
  | 'Mutant'
  | 'Witch'
  | 'Robot'
  | 'Hybrid'

export interface Monster {
  id: string
  name: string
  species: Species
  movie: string
  year: number
  bio: string
  stats: MonsterStats
  traits: string[]
  likes: string[]
  dislikes: string[]
  catchphrase: string
  tmdbMovieId?: number
  localImage?: string
}
