import type { Album } from './album'
import type { Artist } from './artist'
import type { Playlists } from './playlist'
import type { TopTrack } from './topTracks'

export interface SearchResults {
  tracks: TopTrack[]
  artists: Artist[]
  albums: Album[]
  playlists: Playlists
}

// export interface Artists {
//   href: string
//   limit: number
//   next: string
//   offset: number
//   previous: null
//   total: number
//   items: Artist[]
// }

// export interface Albums {
//   href: string
//   limit: number
//   next: string
//   offset: number
//   previous: null
//   total: number
//   items: Album[]
// }
