import axiosInstance from './axios'

import type { Album } from '@/types/album'
import type { Artist } from '@/types/artist'
import type { TopTrack } from '@/types/topTracks'
import type { SearchResults } from '@/types/search'

export async function getNewReleases() {
  try {
    const response = await axiosInstance.get('/browse/new-releases')
    return response.data.albums.items
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}

export async function getTrackAlbum(id: string | string[]): Promise<TopTrack> {
  try {
    const response = await axiosInstance.get(`/albums/${id}/tracks`, {
      params: {
        limit: 1,
      },
    })
    return response.data.items[0]
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}
export async function getAlbum(id: string | string[]): Promise<Album> {
  try {
    const response = await axiosInstance.get(`/albums/${id}`)

    return response.data
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}

export async function getArtist(id: string | string[]): Promise<Artist> {
  try {
    const response = await axiosInstance.get(`/artists/${id}`)

    return response.data
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}
export async function getArtistTopTracks(id: string | string[]): Promise<TopTrack[]> {
  try {
    const response = await axiosInstance.get(`/artists/${id}/top-tracks`)
    return response.data.tracks.map((track: TopTrack) => {
      return {
        name: track.name,
        id: track.id,
        duration_ms: track.duration_ms,
        artists: track.artists,
        images: track.album?.images,
      }
    })
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}

export async function SearchItem(query: string | string[]): Promise<SearchResults> {
  try {
    const allTypes = ['album', 'artist', 'playlist', 'track']
    const typeParam = allTypes.join(',')

    const response = await axiosInstance.get('/search', {
      params: {
        q: query,
        type: typeParam,
      },
    })

    const result = {
      albums: response.data.albums?.items.slice(0, 6) || [],
      artists: response.data.artists?.items.slice(0, 6) || [],
      playlists: response.data.playlists || [],
      tracks: response.data.tracks?.items.slice(0, 4) || [],
    }

    return result
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}
