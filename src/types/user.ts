export type IdentityStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCK' | 'UNCONFIRMED'
export type GenderType = 'MALE' | 'FEMALE' | 'OTHER'

export type TUserAddress = {
  id: number
  receiver: string
  phone: string
  street: string
  isDefault: boolean
}

export type TUser = {
  id: string
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  email: string
  dob: string | null
  gender: GenderType | null
  avatar: string | null
  status: IdentityStatus
  code: string
  roles: string[]
  address: TUserAddress[]
}

export type TUserListParams = {
  page?: number
  size?: number
  search?: string
  isSortAscending?: boolean
  columnName?: string
  all?: boolean
}
