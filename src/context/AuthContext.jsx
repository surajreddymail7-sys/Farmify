import { createContext, useContext, useState, useEffect } from 'react';
import { getUser, setUser as saveUser, getToken, removeToken, removeUser } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = getToken();
    const savedUser = getUser();
    
    if (token && savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    saveUser(userData);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUser(null);
  };

  const updateUser = (userData) => {
    saveUser(userData);
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
