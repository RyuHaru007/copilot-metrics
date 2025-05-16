import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  displayName: string;
  avatar: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (username, password) => {
        // Dummy login logic
        if (username === 'admin' && password === 'admin') {
          set({
            isAuthenticated: true,
            user: {
              username: 'admin',
              displayName: 'Admin User',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
            },
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      changePassword: (oldPassword, newPassword) => {
        // Dummy password change logic
        if (oldPassword === 'admin') {
          return true;
        }
        return false;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);