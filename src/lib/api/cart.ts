 
import { apiConfig } from './config';
import { Cart } from '@/types';

interface AddToCartData {
  productId: string;
  quantity?: number;
}

interface UpdateCartItemData {
  quantity: number;
}

export const cartAPI = {
  getCart: async (token: string): Promise<Cart> => {
    return apiConfig.authRequest('/api/cart', token);
  },

  addToCart: async (data: AddToCartData, token: string): Promise<Cart> => {
    return apiConfig.authRequest('/api/cart/add', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateCartItem: async (productId: string, data: UpdateCartItemData, token: string): Promise<Cart> => {
    return apiConfig.authRequest(`/api/cart/update/${productId}`, token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  removeFromCart: async (productId: string, token: string): Promise<Cart> => {
    return apiConfig.authRequest(`/api/cart/remove/${productId}`, token, {
      method: 'DELETE',
    });
  },

  clearCart: async (token: string): Promise<{ message: string }> => {
    return apiConfig.authRequest('/api/cart/clear', token, {
      method: 'DELETE',
    });
  },
};