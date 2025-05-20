import axiosInstance from './axios'

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

const token = ''

async function getToken() {
  const token = getStoredToken()
  if (token) {
    return
  } else {
    try {
      const res = await axiosInstance.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
          },
        },
      )

      const token = res.data.access_token
      localStorage.setItem('access_token', token)
      return token
    } catch (error: unknown) {
      console.error('Error fetching token:', error)
      throw error
    }
  }
}

export function getStoredToken() {
  return localStorage.getItem('access_token')
}

export async function getNewReleases() {
  try {
    if (!token) await getToken()
    const response = await axiosInstance.get('/browse/new-releases')

    return response.data.albums.items
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}
