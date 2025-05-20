import type { Album } from '@/types/album'
import axiosInstance from './axios'

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
