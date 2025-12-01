// File: src/components/seller/profile/SellerProfile.tsx
'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Save, CheckCircle, Store } from 'lucide-react'
import { useSellerProfile } from '@/src/hooks/useSellerProfile'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Button } from '@/src/components/ui/button'

export const SellerProfile = () => {
  const { user, loading, error, updateProfile } = useSellerProfile()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: { city: '', postalCode: '', country: '' }
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || { city: '', postalCode: '', country: '' }
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateProfile(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Seller Profile Settings</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-2 md:mt-4">Manage your personal information as a seller</p>
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
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-4">
                      <Label htmlFor="name" className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg md:rounded-xl px-3 sm:px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>

                    <div className="space-y-2 md:space-y-4">
                      <Label htmlFor="phone" className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-lg md:rounded-xl px-3 sm:px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-3 md:pb-4">
                    Address
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-4">
                      <Label htmlFor="city" className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={formData.address.city}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, city: e.target.value }
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
                        value={formData.address.postalCode}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, postalCode: e.target.value }
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
                        value={formData.address.country}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, country: e.target.value }
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
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-8">Seller Status</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-[#5156D2]/10 rounded-lg flex-shrink-0">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5156D2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Account Type</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">Seller</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-green-100 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5156D2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Verification</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                      {user?.isVerified ? 'Verified' : 'Pending'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-purple-100 rounded-lg flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5156D2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Email</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                      {user?.email || 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-orange-100 rounded-lg flex-shrink-0">
                    <Store className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5156D2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Seller Since</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#5156D2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Profile Completion</p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                      {[
                        formData.name, 
                        formData.phone, 
                        formData.address.city, 
                        formData.address.country
                      ].filter(Boolean).length}/4
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