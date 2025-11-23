'use client'

import Link from 'next/link'
import { useCartStore } from '../../stores/useCartStore'
import { useUIStore } from '../../stores/useUIStore'
import { useAuthStore } from '../../stores/useAuthStore'
import { ShoppingCart, User, Menu, Search } from 'lucide-react'

export default function Header() {
  const { itemCount } = useCartStore()
  const { setCartSidebarOpen, setMobileMenuOpen, setSearchModalOpen } = useUIStore()
  const { user, isAuthenticated } = useAuthStore()

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cta rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">Shopsphere</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-cta transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-cta transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-foreground hover:text-cta transition-colors">
              Categories
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-foreground hover:text-cta transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartSidebarOpen(true)}
              className="relative p-2 text-foreground hover:text-cta transition-colors"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-warm-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Auth */}
            {isAuthenticated ? (
              <Link href="/dashboard" className="p-2 text-foreground hover:text-cta transition-colors">
                <User size={20} />
              </Link>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/login" className="text-foreground hover:text-cta transition-colors">
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-cta text-white px-4 py-2 rounded-md hover:bg-cta-hover transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-foreground hover:text-cta transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}