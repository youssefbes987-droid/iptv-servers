import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  role: 'manager' | 'salesman' | 'customer-service';
  name: string;
  email: string;
  targets?: {
    monthly: number;
    achieved: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    role: 'manager',
    name: 'John Manager',
    email: 'admin@vmax.com',
  },
  {
    id: '2',
    username: 'sales1',
    role: 'salesman',
    name: 'Mike Salesman',
    email: 'mike@vmax.com',
    targets: { monthly: 50, achieved: 32 },
  },
  {
    id: '3',
    username: 'cs1',
    role: 'customer-service',
    name: 'Sarah Support',
    email: 'sarah@vmax.com',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('vmax-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === 'password') { // Simple mock password
      setUser(foundUser);
      localStorage.setItem('vmax-user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vmax-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}