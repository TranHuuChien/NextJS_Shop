import instanceAxios from '@/lib/AxiosIntercepter'
import { API_ENDPOINT } from '@/lib/UrlConstant'
import { TUser, TUserListParams } from '@/types/user'

type ListData<T> = { items: T[]; meta: { page: number; size: number; totalElements: number; totalPages: number } }

export const getListUsers = async (params: TUserListParams = {}): Promise<ListData<TUser>> => {
  const res = await instanceAxios.get(API_ENDPOINT.USER.INDEX, { params })
  return res.data.data
}

export const getOneUser = async (id: string): Promise<TUser> => {
  const res = await instanceAxios.get(API_ENDPOINT.USER.BY_ID(id))
  return res.data.data
}

export const disableUser = async (id: string): Promise<void> => {
  await instanceAxios.delete(API_ENDPOINT.USER.DISABLE(id))
}

export const enableUser = async (id: string): Promise<void> => {
  await instanceAxios.put(API_ENDPOINT.USER.ENABLE(id))
}
