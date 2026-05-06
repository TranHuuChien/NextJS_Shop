import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteProduct,
  deleteProducts,
  getListProduct,
  getProductBySlug,
  getListCategory,
  getListBrand,
  searchProducts,
} from '@/api/product'
import { TProductListParams } from '@/types/product'

export const PRODUCT_KEYS = {
  all: ['products'] as const,
  list: (params: TProductListParams) => ['products', 'list', JSON.stringify(params)] as const,
  detail: (slug: string) => ['products', 'detail', slug] as const,
  search: (q: string) => ['products', 'search', q] as const,
  categories: (params?: object) => ['categories', JSON.stringify(params ?? {})] as const,
  brands: (params?: object) => ['brands', JSON.stringify(params ?? {})] as const,
}

export const useProductList = (params: TProductListParams = {}) =>
  useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => getListProduct(params),
  })

export const useProductDetail = (slug: string) =>
  useQuery({
    queryKey: PRODUCT_KEYS.detail(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  })

export const useProductSearch = (search: string) =>
  useQuery({
    queryKey: PRODUCT_KEYS.search(search),
    queryFn: () => searchProducts(search),
    enabled: search.length > 1,
  })

export const useCategoryList = (params?: { all?: boolean; status?: boolean; parentCategoryId?: number }) =>
  useQuery({
    queryKey: PRODUCT_KEYS.categories(params),
    queryFn: () => getListCategory(params),
  })

export const useBrandList = (params?: { all?: boolean; status?: boolean }) =>
  useQuery({
    queryKey: PRODUCT_KEYS.brands(params),
    queryFn: () => getListBrand(params),
  })

export const useDeleteProduct = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}

export const useDeleteProducts = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (ids: number[]) => deleteProducts(ids),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}
