import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItem: (productId: string) => CartItem | undefined
  toBackendFormat: () => { items: { product: string; qty: number }[] }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      
      addItem: (product, quantity = 1) => set((state) => {
        const existingItem = state.items.find(item => 
          typeof item.product === 'object' ? item.product._id === product._id : item.product === product._id
        )
        
        if (existingItem) {
          const updatedItems = state.items.map(item =>
            (typeof item.product === 'object' ? item.product._id === product._id : item.product === product._id)
              ? { ...item, qty: item.qty + quantity }
              : item
          )
          return { 
            items: updatedItems,
            itemCount: state.itemCount + quantity,
            total: state.total + (product.price * quantity)
          }
        }
        
        const newItem: CartItem = { product: product._id, qty: quantity }
        return {
          items: [...state.items, newItem],
          itemCount: state.itemCount + quantity,
          total: state.total + (product.price * quantity)
        }
      }),
      
      removeItem: (productId) => set((state) => {
        const item = state.items.find(item => 
          typeof item.product === 'object' ? item.product._id === productId : item.product === productId
        )
        if (!item) return state
        
        const itemPrice = typeof item.product === 'object' ? item.product.price : 0
        
        return {
          items: state.items.filter(item => 
            typeof item.product === 'object' ? item.product._id !== productId : item.product !== productId
          ),
          itemCount: state.itemCount - item.qty,
          total: state.total - (itemPrice * item.qty)
        }
      }),
      
      updateQuantity: (productId, quantity) => set((state) => {
        const item = state.items.find(item => 
          typeof item.product === 'object' ? item.product._id === productId : item.product === productId
        )
        if (!item || quantity < 1) return state
        
        const itemPrice = typeof item.product === 'object' ? item.product.price : 0
        const quantityDiff = quantity - item.qty
        
        return {
          items: state.items.map(item =>
            (typeof item.product === 'object' ? item.product._id === productId : item.product === productId)
              ? { ...item, qty: quantity }
              : item
          ),
          itemCount: state.itemCount + quantityDiff,
          total: state.total + (itemPrice * quantityDiff)
        }
      }),
      
      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
      
      getItem: (productId) => get().items.find(item => 
        typeof item.product === 'object' ? item.product._id === productId : item.product === productId
      ),
      
      toBackendFormat: () => ({
        items: get().items.map(item => ({
          product: typeof item.product === 'object' ? item.product._id : item.product,
          qty: item.qty
        }))
      })
    }),
    { name: 'cart-storage' }
  )
)