export interface TMDBMovie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  overview: string
}

export interface TMDBSearchResult {
  page: number
  results: TMDBMovie[]
  total_results: number
  total_pages: number
}

export interface TMDBCredits {
  id: number
  cast: TMDBCastMember[]
}

export interface TMDBCastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}
