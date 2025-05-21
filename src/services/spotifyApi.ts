import axiosInstance from './axios'

import type { Album } from '@/types/album'
import type { Artist } from '@/types/artist'
import type { TopTrack } from '@/types/topTracks'
import type { BasedTrack } from '@/types/song'

export async function getNewReleases() {
  try {
    const response = await axiosInstance.get('/browse/new-releases')
    return response.data.albums.items
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
export async function getArtistTopTracks(id: string | string[]): Promise<BasedTrack[]> {
  try {
    const response = await axiosInstance.get(`/artists/${id}/top-tracks`)
    return response.data.tracks.map((track: TopTrack) => {
      return {
        name: track.name,
        id: track.id,
        duration_ms: track.duration_ms,
        artists: track.artists,
        images: track.album.images,
      }
    })
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}
