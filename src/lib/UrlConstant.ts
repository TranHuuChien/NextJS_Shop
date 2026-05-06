

//export const API_ENDPOINT = "/api/v1";

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1`

export const API_ENDPOINT = {
  AUTH: {
    INDEX: `${BASE_URL}/auth`,
    AUTH_ME: `${BASE_URL}/auth/me`,
  },
  SYSTEM: {
    ROLE: { INDEX: `${BASE_URL}/roles` },
    USER: { INDEX: `${BASE_URL}/users` },
  },
  PRODUCT: {
    INDEX: `${BASE_URL}/product`,
    LIST: `${BASE_URL}/product/list`,
    SEARCH: `${BASE_URL}/product/search`,
    DETAIL: (slug: string) => `${BASE_URL}/product/detail/${slug}`,
    BY_ID: (id: number) => `${BASE_URL}/product/${id}`,
    CATEGORY: {
      INDEX: `${BASE_URL}/product/category`,
      BY_ID: (id: number) => `${BASE_URL}/product/category/${id}`,
      BY_SLUG: (slug: string) => `${BASE_URL}/product/category/slug/${slug}`,
    },
    BRAND: {
      INDEX: `${BASE_URL}/product/brand`,
      BY_ID: (id: number) => `${BASE_URL}/product/brand/${id}`,
    },
    VARIANT: {
      INDEX: `${BASE_URL}/product/variant`,
      BY_ID: (id: number) => `${BASE_URL}/product/variant/${id}`,
    },
  },
  CART: {
    INDEX: `${BASE_URL}/user/cart`,
    BY_ID: (id: number) => `${BASE_URL}/user/cart/${id}`,
  },
  USER: {
    INDEX: `${BASE_URL}/user`,
    BY_ID: (id: string) => `${BASE_URL}/user/${id}`,
    DISABLE: (id: string) => `${BASE_URL}/user/disable/${id}`,
    ENABLE: (id: string) => `${BASE_URL}/user/enable/${id}`,
    TOGGLE: (id: string) => `${BASE_URL}/user/${id}`,
    ME: `${BASE_URL}/user/profile/me`,
  },
  ORDER: {
    INDEX: `${BASE_URL}/order`,
    MY_ORDERS: `${BASE_URL}/order/my-orders`,
    DETAIL: (code: string) => `${BASE_URL}/order/detail/${code}`,
    BY_ID: (id: number) => `${BASE_URL}/order/${id}`,
    UPDATE: (id: number) => `${BASE_URL}/order/${id}`,
  },
}