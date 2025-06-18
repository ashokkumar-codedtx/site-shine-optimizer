
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@news.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01',
    isActive: true
  },
  {
    id: '2',
    email: 'creator@news.com',
    name: 'Content Creator',
    role: 'creator',
    createdAt: '2024-01-01',
    isActive: true
  },
  {
    id: '3',
    email: 'reader@news.com',
    name: 'Regular Reader',
    role: 'reader',
    createdAt: '2024-01-01',
    isActive: true
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('newsapp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('newsapp_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('newsapp_user');
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'reader',
      createdAt: new Date().toISOString(),
      isActive: true
    };
    setUser(newUser);
    localStorage.setItem('newsapp_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
