// src/components/seller/UpgradeForm.tsx
// Clean upgrade form

'use client'

import { useState } from 'react'
import { Store, MapPin, Phone, Building, CreditCard } from 'lucide-react'

interface UpgradeFormProps {
  loading: boolean
  error: string
  onSubmit: (formData: any) => void
  onCancel: () => void
}

export function UpgradeForm({ loading, error, onSubmit, onCancel }: UpgradeFormProps) {
  const [formData, setFormData] = useState({
    shopName: '',
    phoneForOrders: '',
    shopAddress: { city: '', postalCode: '', country: '' },
    demoPayoutNumber: '',
    bankName: ''
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateAddress = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      shopAddress: { ...prev.shopAddress, [field]: value }
    }))
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
        <div className="relative">
          <Store className="absolute left-3 top-1/2 h-4 w-4 text-[#5156D2] transform -translate-y-1/2" />
          <input
            type="text"
            required
            value={formData.shopName}
            onChange={(e) => updateField('shopName', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
            placeholder="Your fashion brand name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 text-[#5156D2] transform -translate-y-1/2" />
          <input
            type="tel"
            value={formData.phoneForOrders}
            onChange={(e) => updateField('phoneForOrders', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
            placeholder="For customer inquiries"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Shop Address</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#5156D2]" />
          <input
            type="text"
            value={formData.shopAddress.city}
            onChange={(e) => updateAddress('city', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
            placeholder="City"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={formData.shopAddress.postalCode}
            onChange={(e) => updateAddress('postalCode', e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
            placeholder="Postal Code"
          />
          <input
            type="text"
            value={formData.shopAddress.country}
            onChange={(e) => updateAddress('country', e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
            placeholder="Country"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 h-4 w-4 text-[#5156D2] transform -translate-y-1/2" />
          <input
            type="text"
            value={formData.bankName}
            onChange={(e) => updateField('bankName', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
            placeholder="Your bank name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 h-4 w-4 text-[#5156D2] transform -translate-y-1/2" />
          <input
            type="text"
            value={formData.demoPayoutNumber}
            onChange={(e) => updateField('demoPayoutNumber', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
            placeholder="Account number for payments"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="flex space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !formData.shopName.trim()}
          className="flex-1 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4645b5] disabled:opacity-50 transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Starting...
            </>
          ) : (
            'Start Selling'
          )}
        </button>
      </div>
    </form>
  )
}