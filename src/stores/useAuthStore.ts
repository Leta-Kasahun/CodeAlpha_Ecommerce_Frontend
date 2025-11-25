// Authentication store for managing user state and tokens
// Path: src/stores/useAuthStore.ts

'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
  // Add method to check and fix inconsistent state
  checkAndFixState: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: !!user && !!token 
      }),
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
      updateUser: (updatedUser) => set((state) => ({
        user: state.user ? { ...state.user, ...updatedUser } : null,
        isAuthenticated: !!(state.user && state.token)
      })),
      // Check and fix inconsistent state
      checkAndFixState: () => {
        const state = get()
        // If isAuthenticated is true but user or token is missing, fix it
        if (state.isAuthenticated && (!state.user || !state.token)) {
          console.warn('Fixing inconsistent auth state')
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
          })
        }
      }
    }),
    { 
      name: 'auth-storage',
      version: 1
    }
  )
)