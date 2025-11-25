// src/components/products/ProductManager.tsx
// Main product management component

'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ProductList } from './ProductList'
import { ProductForm } from './ProductForm'

export function ProductManager() {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-2">Manage your fashion products</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4645b5] transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Product List */}
      <ProductList onEdit={handleEdit} />

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm 
          product={editingProduct}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}
    </div>
  )
}