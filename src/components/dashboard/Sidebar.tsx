// File: src/components/dashboard/Sidebar.tsx - REAL DATA for quick stats
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  ShoppingBag,
  Settings,
  X
} from 'lucide-react'
import { useOrders } from '@/src/hooks/useOrders'
import { useCart } from '@/src/hooks/useCart'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Cart', href: '/dashboard/cart', icon: ShoppingCart },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { orders = [] } = useOrders()
  const { cart } = useCart()

  // REAL DATA
  const cartItemsCount = cart?.items?.reduce((total, item) => total + item.qty, 0) || 0
  const pendingOrders = orders.filter(order => order.orderStatus === 'processing').length

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
        
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#5156D2] rounded-lg">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
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
                
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-[#E6B84A] rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Stats - REAL DATA */}
        <div className="p-6 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900 mb-3">Quick Access</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Cart Items</span>
                <span className="font-medium text-[#5156D2]">{cartItemsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Orders</span>
                <span className="font-medium text-[#E6B84A]">{pendingOrders}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}