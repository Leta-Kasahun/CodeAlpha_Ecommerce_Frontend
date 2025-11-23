import { create } from 'zustand'
import { Product } from '../types'

interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  loading: boolean
  error: string | null
  setProducts: (products: Product[]) => void
  setFeaturedProducts: (products: Product[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  getProductById: (id: string) => Product | undefined
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),
  setFeaturedProducts: (products) => set({ featuredProducts: products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  getProductById: (id) => get().products.find(product => product._id === id)
}))