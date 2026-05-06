export type TLoginAuth = {
  username: string
  password: string
}

export type TRegisterAuth = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type TRefreshToken = {
  accessToken: string
  refreshToken: string
}

export type TVerifyOtp = {
  email: string
  otp: string
  type: 'REGISTER' | 'FORGOT_PASSWORD'
}

export type TForgotPassword = {
  email: string
}

export type TResetPassword = {
  email: string
  password: string
  otp: string
}

export type TAuthResponse = {
  accessToken: string
  refreshToken: string
}

export type TRegisterResponse = {
  userId: string
}
