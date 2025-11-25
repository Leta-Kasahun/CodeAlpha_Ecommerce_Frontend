// Custom hook for managing seller products with CRUD operations
// Path: src/hooks/useSellerProducts.ts

'use client'

import { useState, useEffect } from 'react'
import { productsAPI } from '@/src/lib/api/products'
import { useAuthStore } from '@/src/stores'

export interface Product {
  _id: string
  name: string
  price: number
  quantity: number
  category?: string
  description?: string
  images?: string[]
  isAvailable?: boolean
  owner: any
}

interface UseSellerProductsReturn {
  products: Product[]
  loading: boolean
  error: string
  loadProducts: () => Promise<void>
  deleteProduct: (productId: string) => Promise<void>
}

export function useSellerProducts(): UseSellerProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token, user } = useAuthStore()

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await productsAPI.getProducts()
      
      if (response.success && response.products) {
        // If we have a user, filter by user ID, otherwise show all products
        let filteredProducts = response.products
        
        if (user?._id) {
          filteredProducts = response.products.filter((product: Product) => {
            if (!product.owner) return false
            
            if (typeof product.owner === 'object' && product.owner._id) {
              return product.owner._id === user._id
            }
            
            if (typeof product.owner === 'string') {
              return product.owner === user._id
            }
            
            return false
          })
        }
        
        setProducts(filteredProducts)
      } else {
        setError('No products found')
      }
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!token) {
      setError('Authentication required')
      return
    }

    try {
      const response = await productsAPI.deleteProduct(productId, token)
      if (response.success) {
        setProducts(prev => prev.filter(product => product._id !== productId))
      } else {
        setError('Failed to delete product')
      }
    } catch (err) {
      setError('Failed to delete product')
    }
  }

  useEffect(() => {
    loadProducts()
  }, [user?._id])

  return {
    products,
    loading,
    error,
    loadProducts,
    deleteProduct
  }
}