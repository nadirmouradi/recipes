import { createContext, useState, useContext, useEffect } from 'react';
import { login, register } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const contextLogin = async (credentials) => {
    try {
      const { token, user } = await login(credentials);
      console.log("user in context ",user);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (error) {
      console.error('Login failed:', error.message);
      return { 
        success: false,
        error: error.message
      };
    }
  };

  const contextRegister = async (userData) => {
    try {
      await register(userData); 
      return true; 
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login: contextLogin,
        register: contextRegister,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);