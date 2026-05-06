import { USER_DATA, ACCESS_TOKEN, REFRESH_TOKEN } from "@/config/auth"

export const setLocalUserData = (userData: string, accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(USER_DATA, userData)
    window.localStorage.setItem(ACCESS_TOKEN, accessToken)
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken)
    // Also set cookie so middleware can read it for route protection
    document.cookie = `${ACCESS_TOKEN}=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
  }
}

export const getLocalUserData = () => {
  if (typeof window !== 'undefined') {
    return {
      userData: window.localStorage.getItem(USER_DATA),
      accessToken: window.localStorage.getItem(ACCESS_TOKEN),
      refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
    }
  }
}

export const clearLocalUserData = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(USER_DATA)
    window.localStorage.removeItem(ACCESS_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN)
    // Clear cookie too
    document.cookie = `${ACCESS_TOKEN}=; path=/; max-age=0`
  }
}