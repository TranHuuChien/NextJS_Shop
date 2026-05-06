// ---- Enums ----
export type ProductStatus = 'ACTIVE' | 'INACTIVE'
export type VariantStatus = 'ACTIVE' | 'INACTIVE'

// ---- Shared sub-types ----
export type TProductImage = {
  id: number
  image: string
  isDefault: boolean
}

export type TVariant = {
  id: number
  name: string
  sku: string
  quantity: number
  itemPrice: number
  totalPrice: number
  totalPromotionalPrice: number | null
  promotionalItemPrice: number
  status: VariantStatus
}

export type TProductCategory = {
  id: number
  name: string
  image: string
  slug: string
}

export type TBrand = {
  id: number
  name: string
  code: string
  description: string
  image: string
}

export type TUnit = {
  id: number
  name: string
}

// ---- List product (GET /product/list) ----
export type TListProduct = {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description: string
  code: string
  quantity: number
  actualInventory: number
  sold: number
  rating: number
  slug: string
  cost: number
  status: ProductStatus
  productCategory: TProductCategory
  brand: TBrand
  unit: TUnit
  images: TProductImage[]
  variants: TVariant[]
}

// ---- One product by slug (GET /product/detail/:slug) ----
export type TProductDetail = {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description: string
  code: string
  quantity: number
  actualInventory: number
  sold: number
  rating: number
  slug: string
  cost: number
  status: ProductStatus
  productCategory: TProductCategory
  brand: TBrand
  unit: TUnit
  images: TProductImage[]
  variants: TVariant[]
}

// ---- Category ----
export type TCategory = {
  id: number
  name: string
  parentName: string | null
  image: string
  slug: string
  status: boolean
}

// ---- Brand ----
export type TBrandItem = {
  id: number
  name: string
  code: string
  description: string
  image: string
  status: boolean
}

// ---- API wrapper (matches backend RestResponse<ListResponse<T>>) ----
export type TPageMeta = {
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export type TListResponse<T> = {
  items: T[]
  meta: TPageMeta
}

// ---- Query params ----
export type TProductListParams = {
  page?: number
  size?: number
  isSortAscending?: boolean
  columnName?: string
  search?: string
  all?: boolean
  status?: boolean
  categorySlug?: string
}

export type TProductFilterParams = {
  minPrice?: number
  maxPrice?: number
  brandIds?: number[]
  categoryIds?: number[]
  categorySlug?: string
  rating?: number
}

// Legacy — kept for backward compat
export type TListProductPaging = {
  name?: string
  categoryId?: number
  page?: number
  pageSize?: number
}
