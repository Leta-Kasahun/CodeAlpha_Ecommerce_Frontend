// Product details page with client component
// Path: src/app/products/[id]/page.tsx

'use client'

import { useParams } from 'next/navigation'
import { ProductDetails } from '@/src/components/products/ProductDetails'

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string

  return <ProductDetails productId={productId} />
}