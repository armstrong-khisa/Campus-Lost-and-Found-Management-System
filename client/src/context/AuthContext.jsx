import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  async function login(email, password) {
    const data = await api.post('/auth/login', {
      email,
      password,
    });

    // Ensure backend returned what we expect
    if (!data || !data.access_token || !data.user) {
      throw new Error('Invalid email or password.');
    }

    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.access_token);
    setUser(data.user);

    return data;
  }
  async function register(userData) {
    return await api.post('/auth/register', userData);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isLoggedIn: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
