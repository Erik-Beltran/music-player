import type { Artist, ExternalIDS, ExternalUrls, Image } from './common'
import type { TopTrack } from './topTracks'

export interface Album {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: Date
  release_date_precision: string
  type: string
  uri: string
  artists: Artist[]
  tracks: Tracks
  copyrights: Copyright[]
  external_ids: ExternalIDS
  genres: string[]
  label: string
  popularity: number
}

export enum ArtistType {
  Artist = 'artist',
}

export interface Copyright {
  text: string
  type: string
}

export interface Tracks {
  href: string
  limit: number
  next: null
  offset: number
  previous: null
  total: number
  items: TopTrack[]
}

export enum ItemType {
  Track = 'track',
}
