// File: src/hooks/useSellerProfile.ts
'use client'

import { useState, useCallback } from 'react'
import { usersAPI } from '@/src/lib/api/users'
import { useAuthStore } from '@/src/stores'

export const useSellerProfile = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, updateUser, token } = useAuthStore()

  const updateProfile = useCallback(async (data: { name?: string; phone?: string; address?: any }) => {
    if (!token) return false

    setLoading(true)
    setError(null)
    try {
      const response = await usersAPI.updateProfile(data, token)
      if (response) {
        updateUser(response)
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [token, updateUser])

  return { user, loading, error, updateProfile }
}