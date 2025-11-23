 
import { apiConfig } from './config';
import { Product } from '@/types';

interface CreateProductData {
  name: string;
  price: number;
  quantity: number;
  category?: string;
  description?: string;
  images?: string[];
}

export const productsAPI = {
  getProducts: async (): Promise<Product[]> => {
    return apiConfig.request('/api/products');
  },

  getProduct: async (id: string): Promise<Product> => {
    return apiConfig.request(`/api/products/${id}`);
  },

  createProduct: async (data: CreateProductData, token: string): Promise<Product> => {
    return apiConfig.authRequest('/api/products', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateProduct: async (id: string, data: Partial<CreateProductData>, token: string): Promise<Product> => {
    return apiConfig.authRequest(`/api/products/${id}`, token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteProduct: async (id: string, token: string): Promise<{ message: string }> => {
    return apiConfig.authRequest(`/api/products/${id}`, token, {
      method: 'DELETE',
    });
  },
};