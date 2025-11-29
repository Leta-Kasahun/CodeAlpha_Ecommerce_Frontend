// File: src/components/products/ProductCard.tsx
// ProductCard: displays product information with integrated review ratings
'use client'

import { Package, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/src/components/ui/card'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { StarRating } from '@/src/components/reviews/StarRating'

interface ProductCardProps {
  product: any
  onAddToCart: (product: any) => void
  averageRating?: number
  reviewCount?: number
}

export function ProductCard({ product, onAddToCart, averageRating, reviewCount }: ProductCardProps) {
  const router = useRouter()
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
      <div 
        className="aspect-square bg-gray-50 relative overflow-hidden cursor-pointer"
        onClick={() => router.push(`/products/${_id}`)}
      >
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
            {isOutOfStock ? 'Out of Stock' : 'In Stock'}
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
        <h3 
          className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base cursor-pointer hover:text-[#5156D2]"
          onClick={() => router.push(`/products/${_id}`)}
        >
          {name}
        </h3>
        
        {/* Review Rating */}
        {averageRating !== undefined && averageRating > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={averageRating} size={14} readonly />
            <span className="text-xs text-gray-600">({reviewCount || 0})</span>
          </div>
        )}
        
        {/* Description */}
        {description && (
          <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
            {description}
          </p>
        )}
        
        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl font-bold text-[#5156D2]">${price}</p>
            {/* Show "No reviews yet" if product has no reviews */}
            {(!averageRating || averageRating === 0) && (
              <p className="text-xs text-gray-500 mt-1">No reviews yet</p>
            )}
          </div>
          <Button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className="bg-[#5156D2] hover:bg-[#5156D2]/90 text-white text-sm font-medium py-1 h-8 px-3"
          >
            <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}