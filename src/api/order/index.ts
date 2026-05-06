import instanceAxios from '@/lib/AxiosIntercepter'
import { API_ENDPOINT } from '@/lib/UrlConstant'
import { TOrder, TOrderListParams, OrderStatus } from '@/types/order'

type RestListResponse<T> = { data: { items: T[]; meta: any } }
type RestResponse<T> = { data: { data: T } }

export const getMyOrders = async (params: TOrderListParams = {}): Promise<{ items: TOrder[]; meta: any }> => {
  const res = await instanceAxios.get(API_ENDPOINT.ORDER.MY_ORDERS, { params })
  return res.data.data
}

export const getAdminOrders = async (params: {
  page?: number
  size?: number
  search?: string
  isSortAscending?: boolean
  columnName?: string
  all?: boolean
} = {}): Promise<{ items: TOrder[]; meta: any }> => {
  const res = await instanceAxios.get(API_ENDPOINT.ORDER.INDEX, { params })
  return res.data.data
}

export const updateOrderStatus = async (id: number, status: OrderStatus, reason?: string): Promise<void> => {
  await instanceAxios.put(API_ENDPOINT.ORDER.UPDATE(id), {
    status,
    otherCancellation: reason ?? '',
  })
}

export const getOrderByCode = async (code: string): Promise<TOrder> => {
  const res = await instanceAxios.get(API_ENDPOINT.ORDER.DETAIL(code))
  return res.data.data
}

export const cancelOrder = async (id: number, reason?: string): Promise<void> => {
  await instanceAxios.put(API_ENDPOINT.ORDER.UPDATE(id), {
    status: 'CANCELLED',
    otherCancellation: reason ?? '',
  })
}
