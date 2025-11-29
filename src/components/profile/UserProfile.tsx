'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Save, CheckCircle } from 'lucide-react'
import { useUserProfile } from '@/src/hooks/useUserProfile'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Button } from '@/src/components/ui/button'

export const UserProfile = () => {
  const { user, loading, error, updateProfile } = useUserProfile()
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-xl text-gray-600 mt-4">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm h-full min-h-[600px]">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-800 text-base">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-4">
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label htmlFor="name" className="text-lg font-medium text-gray-900">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        className="w-full h-14 text-lg border-2 border-gray-300 rounded-xl px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="phone" className="text-lg font-medium text-gray-900">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        className="w-full h-14 text-lg border-2 border-gray-300 rounded-xl px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-4">
                    Shipping Address
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <Label htmlFor="city" className="text-lg font-medium text-gray-900">
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
                        className="w-full h-14 text-lg border-2 border-gray-300 rounded-xl px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="postalCode" className="text-lg font-medium text-gray-900">
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
                        className="w-full h-14 text-lg border-2 border-gray-300 rounded-xl px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="country" className="text-lg font-medium text-gray-900">
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
                        className="w-full h-14 text-lg border-2 border-gray-300 rounded-xl px-4 focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-start pt-6">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-[#5156D2] hover:bg-[#5156D2]/90 px-12 py-4 text-lg font-semibold rounded-xl h-14 min-w-48"
                  >
                    <Save className="w-5 h-5 mr-3" />
                    {loading ? 'Saving Changes...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full min-h-[600px]">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Profile Status</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <User className="w-7 h-7 text-[#5156D2]" />
                  </div>
                  <div>
                    <p className="text-base text-gray-600">Account Type</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-7 h-7 text-[#5156D2]" />
                  </div>
                  <div>
                    <p className="text-base text-gray-600">Verification</p>
                    <p className=" font-semibold text-gray-900">{user?.isVerified ? 'Verified' : 'Pending'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Mail className="w-7 h-7 text-[#5156D2]" />
                  </div>
                  <div>
                    <p className="text-base text-gray-600">Email</p>
                    <p className=" font-semibold text-gray-900 truncate">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <CheckCircle className="w-7 h-7 text-[#5156D2]" />
                  </div>
                  <div>
                    <p className="text-base text-gray-600">Completion</p>
                    <p className=" font-semibold text-gray-900">
                      {[formData.name, formData.phone, formData.address.city, formData.address.country].filter(Boolean).length}/4
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