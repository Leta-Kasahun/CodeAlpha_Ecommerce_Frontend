import { create } from 'zustand'

interface UIState {
  mobileMenuOpen: boolean
  cartSidebarOpen: boolean
  searchModalOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  setCartSidebarOpen: (open: boolean) => void
  setSearchModalOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  cartSidebarOpen: false,
  searchModalOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setCartSidebarOpen: (open) => set({ cartSidebarOpen: open }),
  setSearchModalOpen: (open) => set({ searchModalOpen: open }),
}))