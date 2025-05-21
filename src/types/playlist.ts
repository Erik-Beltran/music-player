import type { Followers } from './artist'
import type { Artist, ExternalUrls, Image } from './common'

export interface Playlists {
  href: string
  limit: number
  next: string
  offset: number
  previous: null
  total: number
  items: Array<PlaylistsItem | null>
}

export interface PlaylistsItem {
  collaborative: boolean
  description: string
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  owner: Artist
  primary_color: null
  public: boolean
  snapshot_id: string
  tracks: Followers
  type: PurpleType
  uri: string
}

export enum PurpleType {
  Playlist = 'playlist',
}
