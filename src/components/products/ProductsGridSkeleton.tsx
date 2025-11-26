// Products grid skeleton loading component
// Path: src/components/products/ProductsGridSkeleton.tsx

'use client'

import { Card, CardContent } from '@/src/components/ui/card'

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="overflow-hidden border-gray-200">
          <div className="aspect-square bg-gray-200 animate-pulse"></div>
          <CardContent className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}