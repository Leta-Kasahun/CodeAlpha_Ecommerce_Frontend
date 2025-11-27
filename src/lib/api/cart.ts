// src/lib/api/cart.ts
import { apiConfig } from './config'

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
}

interface CartItem {
  product: Product | string
  qty: number
  _id?: string
}

interface Cart {
  _id: string
  user: string
  items: CartItem[]
  total: number
  createdAt: string
  updatedAt: string
}

interface CartResponse {
  success: boolean
  cart: Cart
  message?: string
}

const calculateCartTotal = (cart: Cart | null): number => {
  if (!cart?.items) return 0
  return cart.items.reduce((total, item) => {
    const price = typeof item.product === 'object' ? Number(item.product?.price ?? 0) : 0
    const qty = Number(item.qty ?? 0)
    return total + price * qty
  }, 0)
}

export const cartAPI = {
  getCart: async (token: string): Promise<CartResponse> => {
    const response = await apiConfig.authRequest<CartResponse>('/api/cart', token, {
      method: 'GET',
    })
    if (response.success && response.cart) {
      response.cart.total = calculateCartTotal(response.cart)
    }
    return response
  },

  getCartSimple: async (token: string): Promise<{
    items: CartItem[]
    total: number
    totalItemsCount: number
    distinctItemsCount: number
    raw?: CartResponse
  }> => {
    const res = await cartAPI.getCart(token)
    const cart = res.cart ?? ({} as Cart)
    const items = cart.items ?? []
    const total = calculateCartTotal(cart)
    const totalItemsCount = items.reduce((s, it) => s + (Number(it.qty) || 0), 0)
    const distinctItemsCount = items.length
    return { items, total, totalItemsCount, distinctItemsCount, raw: res }
  },

  addToCart: async (productId: string, quantity: number = 1, token: string): Promise<CartResponse> => {
    const response = await apiConfig.authRequest<CartResponse>('/api/cart/add', token, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    })
    if (response.success && response.cart) {
      response.cart.total = calculateCartTotal(response.cart)
    }
    return response
  },

  updateCartItem: async (productId: string, quantity: number, token: string): Promise<CartResponse> => {
    const response = await apiConfig.authRequest<CartResponse>(`/api/cart/update/${productId}`, token, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    })
    if (response.success && response.cart) {
      response.cart.total = calculateCartTotal(response.cart)
    }
    return response
  },

  removeFromCart: async (productId: string, token: string): Promise<CartResponse> => {
    const response = await apiConfig.authRequest<CartResponse>(`/api/cart/remove/${productId}`, token, {
      method: 'DELETE',
    })
    if (response.success && response.cart) {
      response.cart.total = calculateCartTotal(response.cart)
    }
    return response
  },

  clearCart: async (token: string): Promise<CartResponse> => {
    const response = await apiConfig.authRequest<CartResponse>('/api/cart/clear', token, {
      method: 'DELETE',
    })
    if (response.success && response.cart) {
      response.cart.total = 0
    }
    return response
  },
}