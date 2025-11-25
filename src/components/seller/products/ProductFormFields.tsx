// Product form fields component for handling product data inputs
// Path: src/components/seller/products/ProductFormFields.tsx

'use client'

interface ProductFormFieldsProps {
  formData: {
    name: string
    price: string
    quantity: string
    category: string
    description: string
    isAvailable: boolean
  }
  loading: boolean
  onChange: (field: string, value: any) => void
}

const CATEGORIES = [
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'bags', label: 'Bags' },
  { value: 'footwear', label: 'Footwear' }
]

export function ProductFormFields({ formData, loading, onChange }: ProductFormFieldsProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
          placeholder="Enter product name"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price ($) *
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => onChange('price', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
            placeholder="0.00"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity *
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.quantity}
            onChange={(e) => onChange('quantity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
            placeholder="0"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => onChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
          disabled={loading}
        >
          <option value="">Select Category</option>
          {CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
          placeholder="Describe your product..."
          disabled={loading}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.isAvailable}
          onChange={(e) => onChange('isAvailable', e.target.checked)}
          className="rounded border-gray-300 text-[#5156D2] focus:ring-[#5156D2]"
          disabled={loading}
        />
        <span className="ml-2 text-sm text-gray-700">Product is available for sale</span>
      </div>
    </>
  )
}