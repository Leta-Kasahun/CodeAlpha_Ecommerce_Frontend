// src/components/seller/SellerLayout.tsx
// Seller layout with sidebar and navigation

'use client'

import { useState } from 'react'
import { SellerSidebar } from './SellerSidebar'
import { SellerHeader } from './SellerHeader'

export function SellerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SellerHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}