// Cart API with proper authentication
// Path: src/lib/api/cart.ts

import { apiConfig } from './config'

interface CartItem {
  product: any
  qty: number
}

interface Cart {
  user: string
  items: CartItem[]
  total: number
}

interface CartResponse {
  success: boolean
  cart: Cart
  message?: string
}

export const cartAPI = {
  // Get user cart
  getCart: async (token: string): Promise<CartResponse> => {
    return apiConfig.authRequest('/api/cart', token, {
      method: 'GET',
    })
  },

  // Add item to cart
  addToCart: async (productId: string, quantity: number = 1, token: string): Promise<CartResponse> => {
    return apiConfig.authRequest('/api/cart/add', token, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    })
  },

  // Update cart item quantity
  updateCartItem: async (productId: string, quantity: number, token: string): Promise<CartResponse> => {
    return apiConfig.authRequest(`/api/cart/update/${productId}`, token, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    })
  },

  // Remove item from cart
  removeFromCart: async (productId: string, token: string): Promise<CartResponse> => {
    return apiConfig.authRequest(`/api/cart/remove/${productId}`, token, {
      method: 'DELETE',
    })
  },

  // Clear cart
  clearCart: async (token: string): Promise<CartResponse> => {
    return apiConfig.authRequest('/api/cart/clear', token, {
      method: 'DELETE',
    })
  },
}