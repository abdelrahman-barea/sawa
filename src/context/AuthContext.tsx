import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication on app load
    const storedUser = localStorage.getItem('sawaUser');
    const storedAuth = localStorage.getItem('sawaAuth');
    
    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const storedUsers = JSON.parse(localStorage.getItem('sawaUsers') || '[]');
    const foundUser = storedUsers.find((u: User) => u.email === email);
    
    if (foundUser) {
      const updatedUser = { ...foundUser, lastLogin: new Date() };
      setUser(updatedUser);
      setIsAuthenticated(true);
      
      localStorage.setItem('sawaUser', JSON.stringify(updatedUser));
      localStorage.setItem('sawaAuth', 'true');
      
      // Update user in storage
      const updatedUsers = storedUsers.map((u: User) => 
        u.email === email ? updatedUser : u
      );
      localStorage.setItem('sawaUsers', JSON.stringify(updatedUsers));
      
      return true;
    }
    return false;
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const storedUsers = JSON.parse(localStorage.getItem('sawaUsers') || '[]');
    const existingUser = storedUsers.find((u: User) => u.email === email);
    
    if (existingUser) {
      return false; // User already exists
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      fullName,
      email,
      isRegistered: true,
      isPremium: false,
    };
    
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('sawaUsers', JSON.stringify(updatedUsers));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sawaUser');
    localStorage.removeItem('sawaAuth');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate sending reset email
    const storedUsers = JSON.parse(localStorage.getItem('sawaUsers') || '[]');
    const foundUser = storedUsers.find((u: User) => u.email === email);
    return !!foundUser;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};