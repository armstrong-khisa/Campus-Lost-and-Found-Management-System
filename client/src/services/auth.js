import api from "./api";

// Login user
export async function login(email, password) {
  const data = await api.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

// Register user
export async function register(userData) {
  return await api.post("/auth/register", userData);
}

// Logout user
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Get logged in user
export function getCurrentUser() {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
}
// Get JWT token
export function getToken() {
  return localStorage.getItem("token");
}

// Check if user is logged in
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}