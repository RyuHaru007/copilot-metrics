import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

const PageLayout: React.FC = () => {
  const { sidebarExpanded } = useUIStore();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Sidebar />
      
      <main className={cn(
        "flex-1 pt-16 pb-12 transition-all duration-300",
        sidebarExpanded ? 'ml-64' : 'ml-16'
      )}>
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;