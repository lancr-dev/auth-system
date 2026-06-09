import { createContext, useEffect, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUser = (userData) => {
    setUser(userData);
  };

  const checkAuth = async () => {
    try {
      const response = await api.get('/users/profile');

      setUser(response.data.data);

      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,

        isAuthenticated,

        loading,

        login,

        logout,

        refreshUser,

        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
