// src/lib/api/cart.ts
// Fixed cart API with frontend total calculation and proper TypeScript types

import { apiConfig } from './config'

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
  description?: string
  category?: string
  isAvailable?: boolean
}

interface CartItem {
  product: Product
  qty: number
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


const calculateCartTotal = (cart: Cart): number => {
  if (!cart.items) return 0;
  return cart.items.reduce((total, item) => {
    if (!item.product || !item.product.price) return total;
    return total + (item.product.price * item.qty);
  }, 0);
};

export const cartAPI = {

  getCart: async (token: string): Promise<CartResponse> => {
    const response = await apiConfig.authRequest<CartResponse>('/api/cart', token, {
      method: 'GET',
    });
    

    if (response.success && response.cart) {
      response.cart.total = calculateCartTotal(response.cart);
    }
    
    return response;
  },

 
  addToCart: async (productId: string, quantity: number = 1, token: string): Promise<CartResponse> => {
    const response = await apiConfig.authRequest<CartResponse>('/api/cart/add', token, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
    

    if (response.success && response.cart) {
      response.cart.total = calculateCartTotal(response.cart);
    }
    
    return response;
  },

 
  updateCartItem: async (productId: string, quantity: number, token: string): Promise<CartResponse> => {
    const response = await apiConfig.authRequest<CartResponse>(`/api/cart/update/${productId}`, token, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
    

    if (response.success && response.cart) {
      response.cart.total = calculateCartTotal(response.cart);
    }
    
    return response;
  },


  removeFromCart: async (productId: string, token: string): Promise<CartResponse> => {
    const response = await apiConfig.authRequest<CartResponse>(`/api/cart/remove/${productId}`, token, {
      method: 'DELETE',
    });

    if (response.success && response.cart) {
      response.cart.total = calculateCartTotal(response.cart);
    }
    
    return response;
  },

  
  clearCart: async (token: string): Promise<CartResponse> => {
    const response = await apiConfig.authRequest<CartResponse>('/api/cart/clear', token, {
      method: 'DELETE',
    });
    
 
    if (response.success && response.cart) {
      response.cart.total = 0;
    }
    
    return response;
  },
}