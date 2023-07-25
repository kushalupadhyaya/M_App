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
    setUser(null);
    setIsAuthenticated(false);
  };

  const clearUser = () => {
    setUser(null);
  };

const bootstrapAsync = async () => {
    let userToken;

    try {
      userToken = await SecureStore.getItemAsync('userToken');
    } catch (e) {
      console.error(e);
    }

    setIsAuthenticated(userToken != null);
    setIsLoading(false);

    if (userToken) {
      axios
        .get('http://192.168.0.4:3000/api/auth/me', {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


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
