// src/components/layout/UserActions.tsx
'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, User, LogOut, LogIn } from 'lucide-react';
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

  const handleLogin = () => {
    setIsLoginOpen(true);
    // Login modal will be implemented separately
  };

  const handleLogout = () => {
    logout();
    // Additional cleanup if needed
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Wishlist */}
      <button className="p-2 text-gray-700 hover:text-[#5156D2] transition-colors relative group">
        <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#E6B84A] rounded-full animate-pulse"></div>
      </button>

      {/* Cart */}
      <button 
        onClick={() => setCartSidebarOpen(true)}
        className="p-2 text-gray-700 hover:text-[#5156D2] transition-colors relative group"
      >
        <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#5156D2] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
            {itemCount}
          </span>
        )}
      </button>

      {/* User Account Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 text-gray-700 hover:text-[#5156D2] transition-colors relative group">
            <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
            {/* Floating dot for logged-in users */}
            {isAuthenticated && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          {isAuthenticated ? (
            <>
              <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 text-gray-700 cursor-default">
                <User className="h-4 w-4" />
                <span className="text-sm">Hi, {user?.name?.split(' ')[0]}</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-red-600 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem 
              onClick={handleLogin}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5156D2] cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              <span>Login / Register</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}