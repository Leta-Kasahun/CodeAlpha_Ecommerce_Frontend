'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogOut, LogIn, ArrowRight, Search } from 'lucide-react';
import { useAuthStore, useCartStore, useUIStore } from '@/src/stores';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';

interface UserActionsProps {
  onMobileSearchToggle: () => void;
}

export function UserActions({ onMobileSearchToggle }: UserActionsProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { itemCount } = useCartStore();
  const { setCartSidebarOpen } = useUIStore();

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
    <div className="flex items-center gap-3 lg:gap-6">
      {/* Mobile Search Button */}
      <button
        onClick={onMobileSearchToggle}
        className="md:hidden p-3 text-gray-700 hover:text-[#5156D2] transition-colors rounded-lg"
      >
        <Search className="h-6 w-6" />
      </button>

      <button
        onClick={() => setCartSidebarOpen(true)}
        aria-label="Cart"
        className="p-3 text-gray-700 hover:text-[#5156D2] transition-colors relative group rounded-lg"
      >
        <ShoppingCart className="h-6 w-6 lg:h-7 lg:w-7 group-hover:scale-110 transition-transform" />
        <span className="sr-only">Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#5156D2] text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 flex items-center justify-center text-gray-700 hover:text-[#5156D2] transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5156D2]">
            {isAuthenticated ? (
              user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name || 'User avatar'}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-[#5156D2] flex items-center justify-center text-white font-bold">
                  {initials(user?.name)}
                </div>
              )
            ) : (
              <UserIcon className="h-6 w-6 lg:h-7 lg:w-7" />
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 bg-white border border-gray-200 rounded-xl shadow-xl">
          {isAuthenticated ? (
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-red-600 cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href="/login"
                  className="flex items-center justify-between gap-3 px-5 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#5156D2]"
                >
                  <div className="flex items-center gap-3">
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#5156D2]" />
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/register"
                  className="flex items-center justify-between gap-3 px-5 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#5156D2]"
                >
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-5 w-5" />
                    <span>Register</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#5156D2]" />
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}