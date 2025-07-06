'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GetMyProfileDocument } from '@/graphql/generated/graphql';

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

  const [getProfile, { error }] = useLazyQuery(GetMyProfileDocument, {
    fetchPolicy: 'network-only', // Always fetch from the network
    onCompleted: () => {
      // If the query succeeds, the token is valid.
      setIsLoading(false);
    },
    onError: () => {
      // If the query fails, the token is invalid.
      logout();
      setIsLoading(false);
    },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setTokenState(storedToken);
      getProfile(); // Validate the token with the backend
    } else {
      setIsLoading(false); // No token, not loading
    }
  }, [getProfile]);

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
      isAuthenticated: !!token && !error,
      isLoading,
      token,
      setToken,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
