import { USER_DATA, ACCESS_TOKEN, REFRESH_TOKEN } from "@/config/auth"

export const setLocalUserData = (userData: string, accessToke: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(USER_DATA, userData)
    window.localStorage.setItem(ACCESS_TOKEN, accessToke)
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken)
  }
}

export const getLocalUserData = () => {
  if (typeof window !== 'undefined') {
    return (
      window.localStorage.getItem(USER_DATA),
      window.localStorage.getItem(ACCESS_TOKEN),
      window.localStorage.getItem(REFRESH_TOKEN)
    )
  }
}

export const clearLocalUserData = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(USER_DATA)
    window.localStorage.removeItem(ACCESS_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN)
  }
}