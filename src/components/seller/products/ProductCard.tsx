// Product card component for seller dashboard with delete functionality
// Path: src/components/seller/products/ProductCard.tsx

'use client'

import { Package, Edit3, Trash2 } from 'lucide-react'
import { Product } from '@/src/hooks/useSellerProducts'
import { Card, CardContent } from '@/src/components/ui/card'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
  isDeleting?: boolean
}

export function ProductCard({ 
  product, 
  onEdit, 
  onDelete, 
  isDeleting = false 
}: ProductCardProps) {
  const { 
    _id, 
    name, 
    price, 
    quantity, 
    category, 
    images, 
    description,
    isAvailable 
  } = product

  const isOutOfStock = !isAvailable || quantity === 0

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 h-full flex flex-col">
      {/* Product Image */}
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        {images && images.length > 0 ? (
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Package className="h-16 w-16" />
          </div>
        )}
        
        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant={isOutOfStock ? "destructive" : "default"}
            className={`${
              isOutOfStock 
                ? 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200' 
                : 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
            } font-medium border text-xs`}
          >
            {isOutOfStock ? 'Out of Stock' : `Stock: ${quantity}`}
          </Badge>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 right-3">
            <Badge 
              variant="secondary"
              className="bg-white/90 text-gray-700 hover:bg-white/90 font-medium capitalize border border-gray-200 backdrop-blur-sm text-xs"
            >
              {category}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">{name}</h3>
        
        {/* Description */}
        {description && (
          <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 flex-1">{description}</p>
        )}
        
        {/* Price */}
        <div className="mt-auto">
          <p className="text-lg md:text-xl font-bold text-[#5156D2]">${price}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          <Button
            onClick={() => onEdit(product)}
            variant="outline"
            className="flex-1 border-[#E6B84A] text-[#E6B84A] hover:bg-[#E6B84A] hover:text-white text-xs md:text-sm font-medium py-1 h-8"
          >
            <Edit3 className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            Edit
          </Button>
          <Button
            onClick={() => onDelete(_id)}
            disabled={isDeleting}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-600 hover:text-white text-xs md:text-sm font-medium py-1 h-8 min-w-8"
          >
            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}