// File: src/components/seller/SellerSidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSellerProducts } from '@/src/hooks/useSellerProducts'
import { useSellerOrders } from '@/src/hooks/useSellerOrders'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3,
  Settings,
  X,
  Store
} from 'lucide-react'

interface SellerSidebarProps {
  open: boolean
  onClose: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/seller', icon: LayoutDashboard },
  { name: 'Products', href: '/seller/products', icon: Package },
  { name: 'Orders', href: '/seller/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/seller/settings', icon: Settings },
]

export function SellerSidebar({ open, onClose }: SellerSidebarProps) {
  const pathname = usePathname()
  const { products } = useSellerProducts()
  const { orders } = useSellerOrders()

  // Calculate real stats
  const activeProducts = products.filter(p => p.isAvailable !== false).length
  const pendingOrders = orders.filter(o => o.orderStatus === 'processing').length
  const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.orderItems.reduce((orderSum, item) => 
      orderSum + (item.price * item.qty), 0
    )
  }, 0)

  return (
    <>
      {open && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out 
        lg:translate-x-0 lg:static lg:inset-0 flex flex-col
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#5156D2] rounded-lg">
              <Store className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Seller Menu</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-4 rounded-lg text-base font-medium transition-all ${
                  isActive
                    ? 'text-[#5156D2] bg-blue-50 border-r-2 border-[#5156D2] shadow-sm'
                    : 'text-gray-700 hover:text-[#5156D2] hover:bg-gray-50'
                }`}
                onClick={onClose}
              >
                <item.icon className={`h-5 w-5 mr-4 ${
                  isActive ? 'text-[#5156D2]' : 'text-gray-400'
                }`} />
                {item.name}
                
                {/* Active indicator */}
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-[#E6B84A] rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Store Stats with Real Data */}
        <div className="p-6 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900 mb-3">Store Overview</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Products</span>
                <span className="font-medium text-[#5156D2]">{activeProducts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Orders</span>
                <span className="font-medium text-[#E6B84A]">{pendingOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Revenue</span>
                <span className="font-medium text-gray-900">${totalRevenue.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}