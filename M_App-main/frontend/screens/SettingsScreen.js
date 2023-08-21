import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../AuthContext'; // Import your Auth context

function SettingsScreen() {
  const [message, setMessage] = useState(null); // State to hold the message
  const { logout } = useAuth(); // get the logout function from your Auth context

  const handleLogout = async () => {
    const result = await logout(); // get the result of logout function
    setMessage(result); // set the result to state
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen!</Text>
      <Button title="Logout" onPress={handleLogout} /> 
    </View>
  );
  
}

export default SettingsScreen;
