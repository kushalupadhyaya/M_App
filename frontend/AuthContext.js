import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import LoadingScreen from './screens//LoadingScreen';  // the exact path may vary depending on your project structure


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // new state for loading

  const logout = () => {
    SecureStore.deleteItemAsync('userToken');
    setIsAuthenticated(false);
  };

  const bootstrapAsync = async () => {
    let userToken;

    try {
      userToken = await SecureStore.getItemAsync('userToken');
    } catch (e) {
      console.error(e);
    }

    setIsAuthenticated(userToken != null);
    setIsLoading(false);  // set loading to false after checking the token
  };

  useEffect(() => {
    bootstrapAsync();
  }, []);

  if (isLoading) {
    // Render loading screen
    return <LoadingScreen />;  // You need to create a LoadingScreen component
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
