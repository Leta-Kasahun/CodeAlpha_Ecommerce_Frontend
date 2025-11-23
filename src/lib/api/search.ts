import { apiConfig } from './config';
import { Product } from '../../types';

interface SearchParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

interface SearchSuggestionsParams {
  q: string;
}

export const searchAPI = {
  searchProducts: async (params: SearchParams): Promise<{ products: Product[]; total: number }> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
    
    return apiConfig.request(`/api/search/products?${queryParams}`);
  },

  getSearchSuggestions: async (params: SearchSuggestionsParams): Promise<string[]> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
    return apiConfig.request(`/api/search/suggestions?${queryParams}`);
  },

  getPopularSearches: async (): Promise<string[]> => {
    return apiConfig.request('/api/search/popular');
  },

  sortProducts: async (sortBy: string, sortOrder: 'asc' | 'desc' = 'asc'): Promise<Product[]> => {
    return apiConfig.request(`/api/sort/products?sortBy=${sortBy}&sortOrder=${sortOrder}`);
  },
};