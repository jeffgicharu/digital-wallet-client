'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import client from '@/lib/apolloClient';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('authToken');
    client.resetStore();
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
