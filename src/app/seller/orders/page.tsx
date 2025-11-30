// File: src/app/seller/orders/page.tsx
'use client'

import { SellerOrders } from "@/src/components/seller/orders/SellerOrders"

export default function SellerOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <SellerOrders />
      </div>
    </div>
  )
}