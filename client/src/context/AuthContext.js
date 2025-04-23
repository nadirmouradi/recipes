import { createContext, useState, useContext } from 'react';
import { login, register } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  // Fonction de connexion modifiée
  const contextLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false,
        error: error.message // On récupère le message standardisé
      };
    }
  };

  // Fonction d'inscription modifiée
  const contextRegister = async (userData) => {
    try {
      await register(userData); // Appel API seulement
      return true; // Succès de l'inscription
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  // Fonction de déconnexion
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