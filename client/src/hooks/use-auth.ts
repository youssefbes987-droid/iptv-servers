import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User, LoginRequest } from '@shared/schema';
import { apiRequest } from '../lib/queryClient';
import { useToast } from './use-toast';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => void;
  logout: () => void;
  isLoading: boolean;
  loginMutation: ReturnType<typeof useMutation>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
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
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      return response;
    },
    onSuccess: (data) => {
      const { user } = data;
      setUser(user);
      setAuthToken(user.id.toString());
      localStorage.setItem('vmax-auth-token', user.id.toString());
      localStorage.setItem('vmax-user', JSON.stringify(user));
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${user.name}!`,
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

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading: loginMutation.isPending,
      loginMutation,
    }}>
      {children}
    </AuthContext.Provider>
  );
}