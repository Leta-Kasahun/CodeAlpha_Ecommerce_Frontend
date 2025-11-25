// src/app/seller/layout.tsx
// Seller layout with sidebar and header

import { SellerLayout } from '@/src/components/seller/SellerLayout'

export default function SellerRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SellerLayout>{children}</SellerLayout>
}