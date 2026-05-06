export type LoginParams = {
  username: string
  password: string
}

export type RegisterParams = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type UserDataType = {
  id: string
  username: string
  email: string
  roles: string[]
}

export type AuthContextType = {
  loading: boolean
  user: UserDataType | null
  login: (params: LoginParams) => Promise<void>
  register: (params: RegisterParams) => Promise<{ userId: string }>
  logout: () => void
  setUser: (user: UserDataType | null) => void
}
