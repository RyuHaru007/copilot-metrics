import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import {
  BarChart,
  ChevronLeft,
  ChevronRight,
  Globe,
  Code,
  Server,
  MessageSquare,
  Users,
  LayoutDashboard,
  Terminal,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { sidebarExpanded, toggleSidebar } = useUIStore();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Organization', path: '/organization', icon: <BarChart size={20} /> },
    { name: 'Languages', path: '/languages', icon: <Code size={20} /> },
    { name: 'Editors', path: '/editors', icon: <Terminal size={20} /> },
    { name: 'Copilot Chat', path: '/copilot-chat', icon: <MessageSquare size={20} /> },
    { name: 'Seat Analysis', path: '/seat-analysis', icon: <Users size={20} /> },
    { name: 'API Response', path: '/api-response', icon: <Server size={20} /> },
  ];

  return (
    <div
      className={cn(
        'h-screen fixed left-0 top-0 bg-white border-r pt-16 transition-all duration-300 z-10',
        sidebarExpanded ? 'w-64' : 'w-16'
      )}
    >
      <div className="absolute right-[-12px] top-20">
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full bg-primary text-white shadow-md"
        >
          {sidebarExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      <nav className="flex flex-col gap-1 p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-md px-3 py-2 transition-colors duration-200',
                'hover:bg-primary/10 hover:text-primary',
                isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600',
                !sidebarExpanded && 'justify-center'
              )
            }
          >
            <span className="flex items-center justify-center">{item.icon}</span>
            {sidebarExpanded && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;