'use client'

import React, { createContext, useEffect, useState } from 'react'
import { AuthContextType, LoginParams, RegisterParams, UserDataType } from './type'
import { loginAuth, logoutAuth, registerAuth } from '@/api/auth'
import { clearLocalUserData, setLocalUserData } from '@/lib/store'
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from '@/config/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { WEBSITE_HOME, WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import {ADMIN_DASHBOARD, SHOP_PAGE} from '@/routes/AdminPanelRoute'

const defaultProvider: AuthContextType = {
  loading: true,
  user: null,
  login: () => Promise.resolve(),
  register: () => Promise.resolve({ userId: '' }),
  logout: () => {},
  setUser: () => {},
}

const AuthContext = createContext<AuthContextType>(defaultProvider)

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserDataType | null>(null)
  const router = useRouter()

  // Restore user from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(USER_DATA)
      if (stored) {
        try {
          setUser(JSON.parse(stored))
        } catch {
          clearLocalUserData()
        }
      }
    }
    setLoading(false)
  }, [])

  const handlerLogin = async (params: LoginParams) => {
    setLoading(true)
    try {
      const res = await loginAuth({ username: params.username, password: params.password })
      // Decode JWT to get basic user info (sub, roles)
      const payload = JSON.parse(atob(res.accessToken.split('.')[1]))
      const userData: UserDataType = {
        id: payload.sub ?? '',
        username: payload.username ?? params.username,
        email: payload.email ?? '',
        roles: payload.roles ?? [],
      }
      setLocalUserData(JSON.stringify(userData), res.accessToken, res.refreshToken)
      setUser(userData)
      toast.success('Login successful')
      const isAdmin = userData.roles.some((r) => r === 'ADMIN' || r === 'STAFF')
      router.push(isAdmin ? SHOP_PAGE : WEBSITE_HOME)
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handlerRegister = async (params: RegisterParams) => {
    setLoading(true)
    try {
      const res = await registerAuth(params)
      toast.success('Registration successful. Please verify your email.')
      return res
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Registration failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handlerLogout = () => {
    logoutAuth().catch(() => {})
    clearLocalUserData()
    setUser(null)
    router.push(WEBSITE_LOGIN)
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        login: handlerLogin,
        register: handlerRegister,
        logout: handlerLogout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const AuthContextExports = { AuthContext, AuthContextProvider }
export default AuthContextExports
