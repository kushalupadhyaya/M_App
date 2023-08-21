import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import LoadingScreen from './screens/LoadingScreen';
import axios from 'axios';


export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  clearUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const clearUser = () => {
    setUser(null);
  };

  const bootstrapAsync = async () => {
    let userToken;
    let userData;

    try {
      userToken = await SecureStore.getItemAsync('userToken');
      userData = await SecureStore.getItemAsync('userData');
      if (userData) {
        userData = JSON.parse(userData); // Parse string to JSON
      }
    } catch (e) {
      console.error(e);
    }

    setUser(userData); // Set user data from SecureStore
    setIsAuthenticated(userToken != null);
    setIsLoading(false);
  };

  // Store user data in SecureStore whenever user state changes
  useEffect(() => {
    if (user) {
      SecureStore.setItemAsync('userData', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, clearUser, isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
