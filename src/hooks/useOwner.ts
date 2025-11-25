// src/hooks/useOwner.ts
// Hook for owner upgrade using existing usersAPI

import { useState } from 'react';
import { useAuthStore } from '@/src/stores';
import { usersAPI } from '@/src/lib/api';

export function useOwner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, token, updateUser } = useAuthStore();

  const clearErrors = () => setError('');

  const upgradeToOwner = async (data: any) => {
    if (!token) {
      setError('Authentication required');
      return { success: false, error: 'Authentication required' };
    }

    setLoading(true);
    clearErrors();

    try {
      const result = await usersAPI.upgradeToOwner(data, token);
      
      // Update user role in auth store using the returned user data
      if (result.user) {
        updateUser({ role: 'owner' });
      }

      return { success: true, data: result };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upgrade failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const getOwnerProfile = async () => {
    if (!token) {
      setError('Authentication required');
      return { success: false, error: 'Authentication required' };
    }

    setLoading(true);
    clearErrors();

    try {
      const result = await usersAPI.getOwnerProfile(token);
      return { success: true, data: result };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    clearErrors,
    upgradeToOwner,
    getOwnerProfile,
  };
}