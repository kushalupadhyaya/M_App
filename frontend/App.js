import React from 'react';
import { AuthProvider } from './AuthContext';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
  );
};

export default App;
