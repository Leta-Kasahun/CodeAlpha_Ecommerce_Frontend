// File: src/components/seller/profile/ShopProfile.tsx
'use client'

import { useState, useEffect } from 'react'
import { Store, Phone, MapPin, Save, CheckCircle, CreditCard, Building } from 'lucide-react'
import { useShopProfile } from '@/src/hooks/useShopProfile'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Button } from '@/src/components/ui/button'

export const ShopProfile = () => {
  const { profile, loading, error, updateProfile } = useShopProfile()
  const [formData, setFormData] = useState({
    shopName: '',
    phoneForOrders: '',
    bankName: '',
    demoPayoutNumber: '',
    shopAddress: { city: '', postalCode: '', country: '' }
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        shopName: profile.shopName || '',
        phoneForOrders: profile.phoneForOrders || '',
        bankName: profile.bankName || '',
        demoPayoutNumber: profile.demoPayoutNumber || '',
        shopAddress: profile.shopAddress || { city: '', postalCode: '', country: '' }
      })
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateProfile(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Shop Profile Settings</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-2 md:mt-4">Manage your shop information and payment methods</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-sm h-full">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-6">
                  <p className="text-red-800 text-sm md:text-base">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-3 md:pb-4">
                    Shop Information
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-4">
                      <Label htmlFor="shopName" className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                        Shop Name
                      </Label>
                      <Input
                        id="shopName"
                        value={formData.shopName}
                        onChange={(e) => setFormData(prev => ({ ...prev, shopName: e.target.value }))}
                        placeholder="Enter your shop name"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg md:rounded-xl px-3 sm:px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>

                    <div className="space-y-2 md:space-y-4">
                      <Label htmlFor="phoneForOrders" className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                        Contact Phone
                      </Label>
                      <Input
                        id="phoneForOrders"
                        type="tel"
                        value={formData.phoneForOrders}
                        onChange={(e) => setFormData(prev => ({ ...prev, phoneForOrders: e.target.value }))}
                        placeholder="For customer inquiries"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg md:rounded-xl px-3 sm:px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-3 md:pb-4">
                    Payment Methods
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-4">
                      <Label htmlFor="bankName" className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                        Bank Name
                      </Label>
                      <Input
                        id="bankName"
                        value={formData.bankName}
                        onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                        placeholder="Enter your bank name"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg md:rounded-xl px-3 sm:px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>

                    <div className="space-y-2 md:space-y-4">
                      <Label htmlFor="demoPayoutNumber" className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                        Payment Method
                      </Label>
                      <Input
                        id="demoPayoutNumber"
                        value={formData.demoPayoutNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, demoPayoutNumber: e.target.value }))}
                        placeholder="Account number for payments"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg md:rounded-xl px-3 sm:px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-3 md:pb-4">
                    Shop Address
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-4">
                      <Label htmlFor="city" className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={formData.shopAddress.city}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          shopAddress: { ...prev.shopAddress, city: e.target.value }
                        }))}
                        placeholder="Enter city"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg md:rounded-xl px-3 sm:px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>

                    <div className="space-y-2 md:space-y-4">
                      <Label htmlFor="postalCode" className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                        Postal Code
                      </Label>
                      <Input
                        id="postalCode"
                        value={formData.shopAddress.postalCode}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          shopAddress: { ...prev.shopAddress, postalCode: e.target.value }
                        }))}
                        placeholder="Postal code"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg md:rounded-xl px-3 sm:px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>

                    <div className="space-y-2 md:space-y-4">
                      <Label htmlFor="country" className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                        Country
                      </Label>
                      <Input
                        id="country"
                        value={formData.shopAddress.country}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          shopAddress: { ...prev.shopAddress, country: e.target.value }
                        }))}
                        placeholder="Enter country"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg md:rounded-xl px-3 sm:px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-start pt-4 md:pt-6">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-[#5156D2] hover:bg-[#5156D2]/90 px-6 sm:px-8 md:px-12 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-lg md:rounded-xl h-12 sm:h-14 min-w-32 sm:min-w-40 md:min-w-48"
                  >
                    <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-8">Shop Status</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-[#5156D2]/10 rounded-lg flex-shrink-0">
                    <Store className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5156D2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Shop Name</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                      {profile?.shopName || 'Not set'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-green-100 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5156D2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Shop Status</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                      {profile?.isApproved ? 'Approved' : 'Pending Approval'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-purple-100 rounded-lg flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5156D2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Order Contact</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                      {profile?.phoneForOrders || 'Not set'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-orange-100 rounded-lg flex-shrink-0">
                    <Building className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5156D2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Bank Setup</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                      {profile?.bankName ? 'Configured' : 'Not configured'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5156D2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Payment Method</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                      {profile?.demoPayoutNumber ? 'Configured' : 'Not configured'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-[#E6B84A]/10 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#E6B84A]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Profile Completion</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                      {[
                        formData.shopName,
                        formData.shopAddress.city, 
                        formData.shopAddress.country
                      ].filter(Boolean).length}/3
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}