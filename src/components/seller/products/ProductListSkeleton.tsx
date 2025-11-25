// Skeleton loading component for product list
// Path: src/components/seller/products/ProductListSkeleton.tsx

'use client'

import { Card, CardContent } from '@/src/components/ui/card'

export function ProductListSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="h-7 md:h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
      
      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden border-gray-200">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <CardContent className="p-3 md:p-4 space-y-2 md:space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-5 md:h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
              <div className="flex gap-2 mt-2 pt-2 border-t border-gray-100">
                <div className="h-7 bg-gray-200 rounded flex-1 animate-pulse"></div>
                <div className="h-7 bg-gray-200 rounded w-8 animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}