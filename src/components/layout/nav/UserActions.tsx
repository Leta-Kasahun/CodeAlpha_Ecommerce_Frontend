'use client';

// src/components/layout/UserActions.tsx

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, User as UserIcon, LogOut, LogIn, ArrowRight } from 'lucide-react';
import { useAuthStore, useCartStore, useUIStore } from '@/src/stores';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';

export function UserActions() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { itemCount } = useCartStore();
  const { setCartSidebarOpen } = useUIStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = () => setIsLoginOpen(true);

  const handleLogout = () => {
    logout();
  };

  const initials = (name?: string) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        aria-label="Wishlist"
        className="p-2 text-gray-700 hover:text-[#5156D2] transition-colors relative group rounded-md"
      >
        <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="sr-only">Wishlist</span>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#E6B84A] rounded-full animate-pulse" />
      </button>

      <button
        onClick={() => setCartSidebarOpen(true)}
        aria-label="Cart"
        className="p-2 text-gray-700 hover:text-[#5156D2] transition-colors relative group rounded-md"
      >
        <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="sr-only">Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#5156D2] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
            {itemCount}
          </span>
        )}
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-haspopup="true"
            aria-expanded={isAuthenticated ? true : false}
            className="p-1.5 flex items-center justify-center text-gray-700 hover:text-[#5156D2] transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:ring-offset-2"
          >
            {isAuthenticated ? (
              user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name || 'User avatar'}
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#5156D2] flex items-center justify-center text-white font-medium">
                  {initials(user?.name)}
                </div>
              )
            ) : (
              <UserIcon className="h-5 w-5" />
            )}
            <span className="sr-only">{isAuthenticated ? 'Account' : 'Open login menu'}</span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-52 bg-white border border-gray-200 rounded-lg shadow-lg">
          {isAuthenticated ? (
            <>
              <DropdownMenuItem className="flex items-center justify-between px-4 py-2 text-gray-700">
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name || 'avatar'}
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#5156D2] flex items-center justify-center text-white text-sm font-medium">
                      {initials(user?.name)}
                    </div>
                  )}
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-red-600 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href="/login"
                  className="flex items-center justify-between gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5156D2]"
                >
                  <div className="flex items-center gap-3">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#5156D2]" />
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/register"
                  className="flex items-center justify-between gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5156D2]"
                >
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-4 w-4" />
                    <span>Register</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#5156D2]" />
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}