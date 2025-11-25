// Main product form component that composes image upload and form fields
// Path: src/components/seller/products/ProductForm.tsx

'use client'

import { useState, useEffect } from 'react'
import { X, Loader } from 'lucide-react'
import { productsAPI } from '@/src/lib/api/products'
import { useAuthStore } from '@/src/stores/useAuthStore'
import { ProductFormFields } from './ProductFormFields'
import { ProductImageUpload } from './ProductImageUpload'

interface ProductFormProps {
  product?: any
  onClose: () => void
  onSuccess: () => void
}

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    isAvailable: true,
    images: [] as string[]
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const { token } = useAuthStore()

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price?.toString() || '',
        quantity: product.quantity?.toString() || '',
        category: product.category || '',
        description: product.description || '',
        isAvailable: product.isAvailable !== false,
        images: product.images || []
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      setError('Authentication required')
      return
    }

    if (!formData.name.trim()) {
      setError('Product name is required')
      return
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Valid price is required')
      return
    }

    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      setError('Valid quantity is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        category: formData.category || undefined,
        description: formData.description.trim() || undefined,
        isAvailable: formData.isAvailable,
        images: formData.images
      }

      let response
      if (product) {
        response = await productsAPI.updateProduct(product._id, productData, token)
      } else {
        response = await productsAPI.createProduct(productData, token)
      }

      if (response.success) {
        onSuccess()
      } else {
        setError('Failed to save product')
      }
    } catch {
      setError('Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, images }))
  }

  const setUploadingState = (state: boolean) => {
    setUploading(state)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ProductFormFields
              formData={formData}
              loading={loading}
              onChange={handleChange}
            />

            <ProductImageUpload
              images={formData.images}
              uploading={uploading}
              onImagesChange={handleImagesChange}
              onUploadingChange={setUploadingState}
              loading={loading}
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploading}
                className="flex-1 px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4645b5] disabled:opacity-50 transition-colors flex items-center justify-center order-1 sm:order-2"
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                    {product ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  product ? 'Update Product' : 'Create Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}