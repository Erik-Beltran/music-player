import axiosInstance from './axios'

export async function getToken(): Promise<string> {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
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
  const expiresIn = res.data.expires_in
  const expiresAt = Date.now() + expiresIn * 1000
  localStorage.setItem('spotify_token', token)
  localStorage.setItem('spotify_token_expires_at', expiresAt.toString())
  return token
}

export async function getValidToken() {
  const token = localStorage.getItem('spotify_token')
  const expiresAt = localStorage.getItem('spotify_token_expires_at')
  const now = Date.now()

  if (!token || !expiresAt || now >= parseInt(expiresAt)) {
    return await getToken()
  }

  return token
}
