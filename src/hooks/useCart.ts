import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addCartItem,
  deleteCartItem,
  deleteCartItems,
  getCartItemsEnriched,
  updateCartItem,
} from '@/api/cart'

export const CART_KEY = ['cart'] as const

export const useCart = (enabled = true) =>
  useQuery({
    queryKey: CART_KEY,
    queryFn: getCartItemsEnriched,
    enabled,
  })

export const useAddToCart = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ variantId, quantity }: { variantId: number; quantity: number }) =>
      addCartItem(variantId, quantity),
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  })
}

export const useUpdateCartItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateCartItem(id, quantity),
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  })
}

export const useDeleteCartItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteCartItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  })
}

export const useDeleteCartItems = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (ids: number[]) => deleteCartItems(ids),
    onSuccess: () => qc.invalidateQueries({ queryKey: CART_KEY }),
  })
}
