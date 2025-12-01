// File: src/hooks/useShopProfile.ts
'use client'

import { useState, useCallback, useEffect } from 'react'
import { usersAPI } from '@/src/lib/api/users'
import { SellerProfile } from '@/src/types/seller'
import { useAuthStore } from '@/src/stores'

export const useShopProfile = () => {
  const [profile, setProfile] = useState<SellerProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token, user } = useAuthStore()

  const fetchProfile = useCallback(async () => {
    if (!token) return

    setLoading(true)
    setError(null)
    try {
      const response = await usersAPI.getOwnerProfile(token)
      if (response.success) {
        setProfile(response.sellerProfile)
      } else {
        setError('Failed to fetch shop profile')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  const updateProfile = useCallback(async (data: Partial<SellerProfile>) => {
    if (!token) return false

    setLoading(true)
    setError(null)
    try {
      const response = await usersAPI.updateOwnerProfile(data, token)
      if (response.success) {
        setProfile(response.sellerProfile)
        return true
      } else {
        setError('Failed to update shop profile')
        return false
      }
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (user?.role === 'owner') {
      fetchProfile()
    }
  }, [user, fetchProfile])

  return { profile, loading, error, updateProfile, refetch: fetchProfile }
}