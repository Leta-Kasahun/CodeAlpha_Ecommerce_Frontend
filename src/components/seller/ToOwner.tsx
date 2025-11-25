// src/components/seller/ToOwner.tsx
// Modal version for quick upgrade from dashboard

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useOwner } from '@/src/hooks/useOwner'
import { UpgradeForm } from './UpgradeForm'

interface ToOwnerProps {
  isOpen: boolean
  onClose: () => void
}

export function ToOwner({ isOpen, onClose }: ToOwnerProps) {
  const { loading, error, upgradeToOwner } = useOwner()
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    const result = await upgradeToOwner(formData)
    if (result.success) {
      router.push('/dashboard/seller')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Become Seller</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <UpgradeForm 
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </motion.div>
    </div>
  )
}