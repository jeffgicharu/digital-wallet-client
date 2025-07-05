'use client';

import { useState, useEffect, createContext, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setTokenState(storedToken);
    setIsLoading(false);
  }, []);

  const setToken = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!token,
      isLoading,
      token,
      setToken,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
