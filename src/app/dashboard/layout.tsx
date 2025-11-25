'use client';

// app/dashboard/layout.tsx
// Dashboard layout for the Shoes-focused dashboard area. Responsive sidebar + navbar, preserves brand color #5156D2.

import React, { useState } from 'react';
import Navbar from '@/src/components/dashboard/Navbar';
import Sidebar from '@/src/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Navbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}