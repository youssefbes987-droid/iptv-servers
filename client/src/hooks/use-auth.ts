import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, LoginRequest } from '@shared/schema';
import { apiRequest } from '../lib/queryClient';
import { useToast } from './use-toast';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('vmax-auth-token');
    const storedUser = localStorage.getItem('vmax-user');
    
    if (storedToken && storedUser) {
      try {
        setAuthToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('vmax-auth-token');
        localStorage.removeItem('vmax-user');
      }
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return apiRequest('POST', '/api/login', credentials);
    },
    onSuccess: (data) => {
      setUser(data.user);
      setAuthToken(data.token);
      localStorage.setItem('vmax-auth-token', data.token);
      localStorage.setItem('vmax-user', JSON.stringify(data.user));
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${data.user.name}!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Login failed',
        description: error.message || 'Please check your credentials',
        variant: 'destructive',
      });
    },
  });

  const login = (credentials: LoginRequest) => {
    loginMutation.mutate(credentials);
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('vmax-auth-token');
    localStorage.removeItem('vmax-user');
    queryClient.clear();
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading: loginMutation.isPending,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}