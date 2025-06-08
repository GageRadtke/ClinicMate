// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/api'; // Assuming you have an apiClient setup

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user object (e.g., { id, role, email, etc. })
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // Added loading state for initial authentication check

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Verify the token with the backend and fetch user details.
          // This is a more secure approach than just client-side JWT decoding,
          // as it accounts for token revocation or invalidation.
          const res = await apiClient.get('/auth/me'); // Adjust endpoint as per your backend for fetching user profile
          setUser(res.data); // Assuming res.data contains the full user object including role
        } catch (error) {
          console.error("Failed to load user or token invalid:", error);
          // If token verification fails, clear the token and user data
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false); // Authentication check is complete whether successful or not
    };

    loadUser();
  }, [token]); // Re-run this effect if the 'token' state changes

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData); // Set user data directly from login response, includes role
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);