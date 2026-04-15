import React, { createContext, useState, useContext, useEffect } from 'react';
import api from './api';
import jwtDecode from 'jwt-decode';  // Fixed: default import

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username });
      } catch (e) {
        localStorage.removeItem('access_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await api.post('login/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    const decoded = jwtDecode(res.data.access);
    setUser({ username: decoded.username });
    return res;
  };

  const register = async (username, email, password) => {
    const res = await api.post('register/', { username, email, password });
    return res;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
