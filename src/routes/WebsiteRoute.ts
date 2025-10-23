export const WEBSITE_HOME = '/'
export const WEBSITE_LOGIN = '/auth/login'
export const WEBSITE_REGISTER = '/auth/register'
export const WEBSITE_RESETPASSWORD = '/auth/reset-password'

export const USER_DASHBOARD = '/user/dashboard'
export const WEBSITE_SHOP = '/shop'

export const WEBSITE_CART = '/cart'
export const WEBSITE_PRODUCT_DETAILS = (slug: string) =>  slug ? `/product/${slug}` : ''
export const WEBSITE_CHECKOUT = '/checkout'

export const USER_ACCOUNT = '/account'
export const USER_PROFILE = '/my-profile'
export const USER_ORDER = '/my-orders'
export const WEBSITE_ORDER_DETAILS = (id: number) =>  id ? `/order/${id}` : ''

export const NOTIFICATION_DETAIL = (context: string) => context ? `/notification/${context}` : '';