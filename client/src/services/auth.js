import api from './api';

// Login user
export async function login(email, password) {
  const data = await api.post('/auth/login', {
    email,
    password,
  });

  localStorage.setItem('token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data;
}

// Register user
export async function register(userData) {
  return await api.post('/auth/register', userData);
}

// Logout user
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// Get logged-in user from localStorage
export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Get JWT token
export function getToken() {
  return localStorage.getItem('token');
}

// Check login status
export function isLoggedIn() {
  return !!getToken();
}

// Fetch latest user from backend
export async function refreshCurrentUser() {
  try {
    const user = await api.get('/users/me');

    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (err) {
    // Token is invalid or expired
    logout();
    throw err;
  }
}
