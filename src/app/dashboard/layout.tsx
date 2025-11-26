// src/app/dashboard/layout.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/src/components/dashboard/Navbar';
import Sidebar from '@/src/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      

      <div className="flex-1 flex flex-col min-w-0">

        <header className="bg-white border-b border-gray-200">
          <Navbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
        </header>


        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}