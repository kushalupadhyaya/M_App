import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../AuthContext';

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
