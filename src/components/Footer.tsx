import React from 'react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

const Footer: React.FC = () => {
  const { sidebarExpanded } = useUIStore();
  
  return (
    <footer className={cn(
      "h-12 border-t bg-white flex items-center px-4 text-sm text-gray-500 transition-all duration-300",
      sidebarExpanded ? 'ml-64' : 'ml-16'
    )}>
      <div>
        2025 - GitHub Copilot metrics, v 7.5.3
      </div>
    </footer>
  );
};

export default Footer;