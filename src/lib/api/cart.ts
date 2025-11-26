// Cart API compatible with your backend structure
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
  getCart: async (): Promise<CartResponse> => {
    return apiConfig.authRequest('/api/cart', '', {
      method: 'GET',
    })
  },

  // Add item to cart
  addToCart: async (productId: string, quantity: number = 1): Promise<CartResponse> => {
    return apiConfig.authRequest('/api/cart/add', '', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    })
  },

  // Update cart item quantity
  updateCartItem: async (productId: string, quantity: number): Promise<CartResponse> => {
    return apiConfig.authRequest(`/api/cart/update/${productId}`, '', {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    })
  },

  // Remove item from cart
  removeFromCart: async (productId: string): Promise<CartResponse> => {
    return apiConfig.authRequest(`/api/cart/remove/${productId}`, '', {
      method: 'DELETE',
    })
  },

  // Clear cart
  clearCart: async (): Promise<CartResponse> => {
    return apiConfig.authRequest('/api/cart/clear', '', {
      method: 'DELETE',
    })
  },
}