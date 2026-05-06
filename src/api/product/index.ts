import instanceAxios from '@/lib/AxiosIntercepter'
import { API_ENDPOINT } from '@/lib/UrlConstant'
import {
  TListProduct,
  TListResponse,
  TProductDetail,
  TProductListParams,
} from '@/types/product'

type RestResponse<T> = { data: T; status: number; message: string }

// ---- Products ----

export const getListProduct = async (
  params: TProductListParams = {}
): Promise<TListResponse<TListProduct>> => {
  const res = await instanceAxios.get<RestResponse<TListResponse<TListProduct>>>(
    API_ENDPOINT.PRODUCT.LIST,
    { params }
  )
  return res.data.data
}

export const getProductBySlug = async (slug: string): Promise<TProductDetail> => {
  const res = await instanceAxios.get<RestResponse<TProductDetail>>(
    API_ENDPOINT.PRODUCT.DETAIL(slug)
  )
  return res.data.data
}

export const getProductById = async (id: number): Promise<TProductDetail> => {
  const res = await instanceAxios.get<RestResponse<TProductDetail>>(
    API_ENDPOINT.PRODUCT.BY_ID(id)
  )
  return res.data.data
}

export const searchProducts = async (search: string): Promise<TListProduct[]> => {
  const res = await instanceAxios.get<RestResponse<TListResponse<TListProduct>>>(
    API_ENDPOINT.PRODUCT.SEARCH,
    { params: { search } }
  )
  return res.data.data.items
}

export const deleteProduct = async (id: number): Promise<void> => {
  await instanceAxios.delete(API_ENDPOINT.PRODUCT.BY_ID(id))
}

export const deleteProducts = async (ids: number[]): Promise<void> => {
  await instanceAxios.delete(`${API_ENDPOINT.PRODUCT.INDEX}/delete-list`, { params: { ids: ids.join(',') } })
}

// ---- Categories ----

export const getListCategory = async (params?: {
  all?: boolean
  status?: boolean
  parentCategoryId?: number
}) => {
  const res = await instanceAxios.get(API_ENDPOINT.PRODUCT.CATEGORY.INDEX, { params })
  return res.data.data
}

export const getCategoryBySlug = async (slug: string) => {
  const res = await instanceAxios.get(API_ENDPOINT.PRODUCT.CATEGORY.BY_SLUG(slug))
  return res.data.data
}

// ---- Brands ----

export const getListBrand = async (params?: { all?: boolean; status?: boolean }) => {
  const res = await instanceAxios.get(API_ENDPOINT.PRODUCT.BRAND.INDEX, { params })
  return res.data.data
}
