import instanceAxios from '@/lib/AxiosIntercepter'
import { API_ENDPOINT } from '@/lib/UrlConstant'

export type TCartItem = {
  id: number
  variantId: number
  quantity: number
  createdAt: string
  updatedAt: string
}

export type TCartItemEnriched = TCartItem & {
  variantName: string
  sku: string
  itemPrice: number
  promotionalItemPrice: number
  productName: string
  productSlug: string
  productImage: string
  stock: number
}

// GET /user/cart — returns raw cart items (variantId + quantity only)
export const getCartItems = async (): Promise<TCartItem[]> => {
  const res = await instanceAxios.get(API_ENDPOINT.CART.INDEX, {
    params: { all: true },
  })
  return res.data.data?.items ?? []
}

// GET /product/variant/:id — get variant detail for enrichment
const getVariantDetail = async (variantId: number) => {
  const res = await instanceAxios.get(API_ENDPOINT.PRODUCT.VARIANT.BY_ID(variantId))
  return res.data.data
}

// GET /product/:id — get product detail for name, slug, image
const getProductDetail = async (productId: number) => {
  const res = await instanceAxios.get(API_ENDPOINT.PRODUCT.BY_ID(productId))
  return res.data.data
}

// Enrich cart items with variant + product info in parallel
export const getCartItemsEnriched = async (): Promise<TCartItemEnriched[]> => {
  const items = await getCartItems()
  if (items.length === 0) return []

  const enriched = await Promise.all(
    items.map(async (item) => {
      try {
        const variant = await getVariantDetail(item.variantId)
        const product = await getProductDetail(variant.productId)
        const defaultImage = product.images?.find((i: any) => i.isDefault)?.image
          ?? product.images?.[0]?.image
          ?? ''

        return {
          ...item,
          variantName: variant.name,
          sku: variant.sku,
          itemPrice: variant.itemPrice,
          promotionalItemPrice: variant.promotionalItemPrice,
          productName: product.name,
          productSlug: product.slug,
          productImage: defaultImage,
          stock: variant.quantity,
        } as TCartItemEnriched
      } catch {
        // If enrichment fails, return item with fallback values
        return {
          ...item,
          variantName: '',
          sku: '',
          itemPrice: 0,
          promotionalItemPrice: 0,
          productName: 'Unknown product',
          productSlug: '',
          productImage: '',
          stock: 0,
        } as TCartItemEnriched
      }
    })
  )

  return enriched
}

// POST /user/cart
export const addCartItem = async (variantId: number, quantity: number): Promise<void> => {
  await instanceAxios.post(API_ENDPOINT.CART.INDEX, { variantId, quantity })
}

// PUT /user/cart/:id
export const updateCartItem = async (id: number, quantity: number): Promise<void> => {
  await instanceAxios.put(API_ENDPOINT.CART.BY_ID(id), { quantity })
}

// DELETE /user/cart/:id
export const deleteCartItem = async (id: number): Promise<void> => {
  await instanceAxios.delete(API_ENDPOINT.CART.BY_ID(id))
}

// DELETE /user/cart?ids=1,2,3
export const deleteCartItems = async (ids: number[]): Promise<void> => {
  await instanceAxios.delete(API_ENDPOINT.CART.INDEX, { params: { ids: ids.join(',') } })
}
