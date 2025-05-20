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
