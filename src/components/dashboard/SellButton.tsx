// src/components/dashboard/SellerButton.tsx
// Always redirects to seller upgrade page

'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Store, Sparkles } from 'lucide-react'

export function SellerButton() {
  const router = useRouter()

  return (
    <motion.button 
      className="px-6 py-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow backdrop-blur-sm bg-opacity-80 flex items-center space-x-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push('/dashboard/seller/upgrade')}
    >
      <Store className="h-4 w-4 text-[#5156D2]" />
      <motion.span 
        className="text-lg font-bold bg-gradient-to-r from-[#5156D2] to-[#E6B84A] bg-clip-text text-transparent opacity-90 hover:opacity-100 transition-opacity flex items-center space-x-1"
        whileHover={{ scale: 1.05 }}
      >
        <Sparkles className="h-4 w-4" />
        <span>Sell on ShopSphere</span>
      </motion.span>
    </motion.button>
  )
}