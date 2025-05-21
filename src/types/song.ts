import type { Album } from './album'
import type { Artist, ExternalUrls, Image } from './common'

export interface Release {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: Date
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface BasedTrack {
  id: string
  name: string
  duration_ms: number
  artists: Artist[]
  images?: Image[]
  album?: Album
}
