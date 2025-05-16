import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { sidebarExpanded } = useUIStore();
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleChangePassword = () => {
    // In a real app, this would navigate to a change password page or open a modal
    alert('Change password functionality would go here');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-4 z-20">
      <div 
        className="flex items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <Github className="h-8 w-8 text-primary" />
        <span className={cn("ml-2 font-semibold text-lg transition-opacity duration-200", !sidebarExpanded && 'md:opacity-0')}>
          Copilot Metrics
        </span>
      </div>
      
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.avatar} alt={user?.displayName} />
              <AvatarFallback>{user?.displayName?.[0].toUpperCase() || 'A'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleChangePassword}>
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;