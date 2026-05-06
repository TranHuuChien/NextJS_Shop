import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cancelOrder, getAdminOrders, getMyOrders, getOrderByCode, updateOrderStatus } from '@/api/order'
import { TOrderListParams, OrderStatus } from '@/types/order'

export const ORDER_KEYS = {
  myOrders: (params: TOrderListParams) => ['orders', 'my', JSON.stringify(params)] as const,
  adminOrders: (params: object) => ['orders', 'admin', JSON.stringify(params)] as const,
  detail: (code: string) => ['orders', 'detail', code] as const,
}

export const useMyOrders = (params: TOrderListParams = {}, enabled = true) =>
  useQuery({
    queryKey: ORDER_KEYS.myOrders(params),
    queryFn: () => getMyOrders(params),
    enabled,
  })

export const useAdminOrders = (params: object = {}, enabled = true) =>
  useQuery({
    queryKey: ORDER_KEYS.adminOrders(params),
    queryFn: () => getAdminOrders(params),
    enabled,
  })

export const useOrderDetail = (code: string) =>
  useQuery({
    queryKey: ORDER_KEYS.detail(code),
    queryFn: () => getOrderByCode(code),
    enabled: !!code,
  })

export const useCancelOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason?: string }) => cancelOrder(id, reason),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  })
}

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status, reason }: { id: number; status: OrderStatus; reason?: string }) =>
      updateOrderStatus(id, status, reason),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  })
}
