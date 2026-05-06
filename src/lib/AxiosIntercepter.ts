import axios from 'axios'
import { ACCESS_TOKEN } from '@/config/auth'

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1`

const instanceAxios = axios.create()

// Attach access token to every request
instanceAxios.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return config
})

// Just reject — no refresh logic for now
instanceAxios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default instanceAxios
