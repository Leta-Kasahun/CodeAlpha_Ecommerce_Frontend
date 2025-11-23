 
import { apiConfig } from './config';
import { User, SellerProfile } from '@/src/types';

interface UpdateProfileData {
  name?: string;
  phone?: string;
  address?: {
    city: string;
    postalCode: string;
    country: string;
  };
}

interface UpgradeToOwnerData {
  shopName: string;
  phoneForOrders?: string;
  shopAddress?: {
    city: string;
    postalCode: string;
    country: string;
  };
}

export const usersAPI = {
  getProfile: async (token: string): Promise<User> => {
    return apiConfig.authRequest('/api/user-profile', token);
  },

  updateProfile: async (data: UpdateProfileData, token: string): Promise<User> => {
    return apiConfig.authRequest('/api/user-profile', token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  upgradeToOwner: async (data: UpgradeToOwnerData, token: string): Promise<SellerProfile> => {
    return apiConfig.authRequest('/api/owners/upgrade', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getOwnerProfile: async (token: string): Promise<SellerProfile> => {
    return apiConfig.authRequest('/api/owners/profile', token);
  },

  updateOwnerProfile: async (data: Partial<UpgradeToOwnerData>, token: string): Promise<SellerProfile> => {
    return apiConfig.authRequest('/api/owners/profile', token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};