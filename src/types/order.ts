export type OrderStatus =
  | 'NOT_PROCESSED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'

export type TOrderItem = {
  id: number
  variantId: number
  quantity: number
  totalPrice: number
  createAt: string
}

export type TOrder = {
  id: number
  code: string
  status: OrderStatus
  totalAmount: number
  shippingCost: number
  tax: number
  paymentStatus: boolean
  note: string | null
  deliveryMethod: string
  createAt: string
  updateAt: string
  items: TOrderItem[]
  transaction: {
    paymentMethod: string
    totalPay: number
    paidAt: string | null
    completedAt: string | null
  } | null
  cancelReason: { name: string } | null
  otherCancelReason: string | null
}

export type TOrderListParams = {
  page?: number
  size?: number
  status?: OrderStatus | ''
}

// Legacy
export type ItemOrderProduct = {
  name: string
  amount: number
  image: string
  price: number
  discount: number
  product: string
  slug: string
}
