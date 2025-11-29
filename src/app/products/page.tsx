// Public products page with all products and cart functionality
// Path: src/app/products/page.tsx

import { Header } from '@/src/components/layout/nav/Header'
import { ProductsPage } from '@/src/components/products/ProductsPage'

export default function Products() {
  return (
    <>
  <Header/>
  <ProductsPage />
  </>
  );
  
}