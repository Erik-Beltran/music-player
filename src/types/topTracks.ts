import type { ExternalIDS, ExternalUrls, Image } from './common'

export interface TopTrack {
  album?: Album
  artists: ArtistElement[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids?: ExternalIDS
  external_urls: ExternalUrls
  href: string
  id: string
  is_local: boolean
  is_playable?: boolean
  name: string
  popularity?: number
  preview_url: null
  track_number: number
  type: string
  uri: string
  images?: Image[]
}

export interface Album {
  album_type: string
  artists: ArtistElement[]
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  is_playable?: boolean
  name: string
  release_date: Date
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface ArtistElement {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}
