import instanceAxios from '@/lib/AxiosIntercepter'
import { API_ENDPOINT } from '@/lib/UrlConstant'
import {
  TAuthResponse,
  TForgotPassword,
  TLoginAuth,
  TRefreshToken,
  TRegisterAuth,
  TRegisterResponse,
  TResetPassword,
  TVerifyOtp,
} from '@/types/auth'
import axios from 'axios'

const AUTH_URL = API_ENDPOINT.AUTH.INDEX

// Login/register use plain axios — no token needed, no interceptor loop
export const loginAuth = async (data: TLoginAuth): Promise<TAuthResponse> => {
  const res = await axios.post(`${AUTH_URL}/login`, data)
  return res.data.data
}

export const registerAuth = async (data: TRegisterAuth): Promise<TRegisterResponse> => {
  const res = await axios.post(`${AUTH_URL}/register`, data)
  return res.data.data
}

// These use instanceAxios so the Bearer token is attached when needed
export const verifyOtpAuth = async (data: TVerifyOtp): Promise<void> => {
  await axios.put(`${AUTH_URL}/register/verify`, data)
}

export const resendOtpAuth = async (data: { email: string }): Promise<void> => {
  await axios.put(`${AUTH_URL}/register/resend`, data)
}

export const forgotPasswordAuth = async (data: TForgotPassword): Promise<void> => {
  await axios.put(`${AUTH_URL}/forgot-password`, data)
}

export const resendForgotPasswordOtp = async (data: { email: string }): Promise<void> => {
  await axios.put(`${AUTH_URL}/forgot-password/resend`, data)
}

export const resetPasswordAuth = async (data: TResetPassword): Promise<void> => {
  await axios.put(`${AUTH_URL}/reset-password`, data)
}

export const refreshAccessToken = async (data: TRefreshToken): Promise<TAuthResponse> => {
  const res = await axios.post(`${AUTH_URL}/refresh-token`, data)
  return res.data.data
}

export const logoutAuth = async (): Promise<void> => {
  await instanceAxios.post(`${AUTH_URL}/logout`)
}
