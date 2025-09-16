export const ADMIN_DASHBOARD = '/admin/dashboard'

//Media routes
export const ADMIN_MEDIA_SHOW = '/admin/media'
export const ADMIN_MEDIA_EDIT = (id: number) => id ? `/admin/media/edit/${id}` : ''

//Category routes
export const ADMIN_CATEGORY_DASHBOARD = '/admin/category'
export const ADMIN_CATEGORY_ADD = '/admin/category/add'
export const ADMIN_CATEGORY_SHOW = '/admin/category'
export const ADMIN_CATEGORY_EDIT = (id: number) => id ? `/admin/category/edit/${id}` : ''

//Product routes
export const ADMIN_PRODUCT_ADD = '/admin/product/add'
export const ADMIN_PRODUCT_SHOW = '/admin/product'
export const ADMIN_VARIANT_ADD = '/admin/'
export const ADMIN_PRODUCT_EDIT = (id: number) => id ? `/admin/product/edit/${id}` : ''

//Coupon 
export const ADMIN_COUPON_ADD = '/admin/coupon/add'
export const ADMIN_COUPON_SHOW = '/admin/coupon'
export const ADMIN_COUPON_EDIT = (id: number) => id ? `/admin/coupon/edit/${id}` : ''

//Trash route
export const ADMIN_TRASH = '/admin/trash'
