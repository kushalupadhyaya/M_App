import React, { useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    axios
      .post('http://192.168.0.15:3000/api/auth/login', { email: email, password: password })
      .then(function (response) {
        console.log(response.data);
        SecureStore.setItemAsync('userToken', response.data.token);
        setIsAuthenticated(true);
        navigation.navigate('Main');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={loginUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
