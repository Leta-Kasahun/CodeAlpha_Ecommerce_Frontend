// Product image upload component with better quality images
// Path: src/components/seller/products/ProductImageUpload.tsx

'use client'

import { useState } from 'react'
import { Upload, Trash2, Loader } from 'lucide-react'

interface ProductImageUploadProps {
  images: string[]
  uploading: boolean
  loading: boolean
  onImagesChange: (images: string[]) => void
  onUploadingChange: (uploading: boolean) => void
}

export function ProductImageUpload({
  images,
  uploading,
  loading,
  onImagesChange,
  onUploadingChange
}: ProductImageUploadProps) {
  const handleImageUpload = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      // Create a canvas to resize and improve image quality
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // Set larger dimensions for better quality
        const maxWidth = 1200
        const maxHeight = 1200
        
        let { width, height } = img
        
        // Calculate new dimensions maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }
        
        canvas.width = width
        canvas.height = height
        
        // Use higher quality settings
        ctx!.imageSmoothingQuality = 'high'
        ctx!.drawImage(img, 0, 0, width, height)
        
        // Convert to base64 with higher quality (0.9 instead of default 0.92)
        const highQualityBase64 = canvas.toDataURL('image/jpeg', 0.9)
        resolve(highQualityBase64)
      }
      
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    onUploadingChange(true)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Check file size (increase limit to 10MB for better quality)
        if (file.size > 10 * 1024 * 1024) {
          alert('Image size should be less than 10MB')
          continue
        }

        const imageUrl = await handleImageUpload(file)
        onImagesChange([...images, imageUrl])
      }
    } catch {
      // Handle error silently
    } finally {
      onUploadingChange(false)
      e.target.value = ''
    }
  }

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Images (High Quality)
      </label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#5156D2] transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
          disabled={loading || uploading}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center justify-center min-h-[100px]"
        >
          {uploading ? (
            <Loader className="h-8 w-8 text-[#5156D2] animate-spin mb-2" />
          ) : (
            <Upload className="h-8 w-8 text-[#5156D2] mb-2" />
          )}
          <span className="text-sm text-gray-600 font-medium">
            {uploading ? 'Uploading...' : 'Upload High Quality Images'}
          </span>
          <span className="text-xs text-gray-500 mt-1">
            PNG, JPG, JPEG up to 10MB
          </span>
        </label>
      </div>

      {images.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  disabled={loading}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}