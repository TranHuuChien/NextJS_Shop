import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { disableUser, enableUser, getListUsers, getOneUser } from '@/api/user'
import { TUserListParams } from '@/types/user'

export const USER_KEYS = {
  list: (params: TUserListParams) => ['users', 'list', JSON.stringify(params)] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
}

export const useUserList = (params: TUserListParams = {}, enabled = true) =>
  useQuery({
    queryKey: USER_KEYS.list(params),
    queryFn: () => getListUsers(params),
    enabled,
  })

export const useUserDetail = (id: string) =>
  useQuery({
    queryKey: USER_KEYS.detail(id),
    queryFn: () => getOneUser(id),
    enabled: !!id,
  })

export const useDisableUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => disableUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  })
}

export const useEnableUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => enableUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  })
}
