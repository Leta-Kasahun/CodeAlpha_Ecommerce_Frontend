 
import { apiConfig } from './config';
import { Review } from '@/src/types';

interface CreateReviewData {
  product: string;
  rating: number;
  comment?: string;
}

interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

export const reviewsAPI = {
  createReview: async (data: CreateReviewData, token: string): Promise<Review> => {
    return apiConfig.authRequest('/api/reviews', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getProductReviews: async (productId: string): Promise<Review[]> => {
    return apiConfig.request(`/api/reviews/product/${productId}`);
  },

  getReview: async (id: string): Promise<Review> => {
    return apiConfig.request(`/api/reviews/${id}`);
  },

  updateReview: async (id: string, data: UpdateReviewData, token: string): Promise<Review> => {
    return apiConfig.authRequest(`/api/reviews/${id}`, token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteReview: async (id: string, token: string): Promise<{ message: string }> => {
    return apiConfig.authRequest(`/api/reviews/${id}`, token, {
      method: 'DELETE',
    });
  },
};