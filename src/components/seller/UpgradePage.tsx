// src/components/seller/UpgradePage.tsx
// Simple upgrade page with auto-redirect for existing sellers

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Package } from 'lucide-react'
import { useAuthStore } from '@/src/stores'
import { UpgradeForm } from './UpgradeForm'
import { useOwner } from '@/src/hooks/useOwner'

export function UpgradePage() {
  const { user } = useAuthStore()
  const { loading, error, upgradeToOwner } = useOwner()
  const router = useRouter()

  // Auto-redirect if already seller
  useEffect(() => {
    if (user?.role === 'owner') {
      router.push('/dashboard/seller')
    }
  }, [user, router])

  const handleSubmit = async (formData: any) => {
    const result = await upgradeToOwner(formData)
    if (result.success) {
      router.push('/dashboard/seller')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-[#5156D2] rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Start Selling</h1>
                  <p className="text-gray-600">Sell your clothing, accessories & bags on ShopSphere</p>
                </div>
              </div>
            </div>

            {/* Upgrade Form */}
            <UpgradeForm 
              loading={loading}
              error={error}
              onSubmit={handleSubmit}
              onCancel={() => router.back()}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}