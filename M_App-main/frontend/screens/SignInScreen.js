import React, { useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function SignInScreen() {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const loginUser = () => {
    axios
      .post('http://192.168.0.4:3000/api/auth/login', { email: email, password: password })
      .then(function (response) {
        console.log(response.data);
        SecureStore.setItemAsync('userToken', response.data.token);
        setUser({ ...response.data.user, token: response.data.token }); // Save user data along with the token to context
        setIsAuthenticated(true);
        navigation.navigate('Main');
      })
      .catch(function (error) {
        console.log(error); // This is where the error message will be logged
      });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
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
      <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#344955',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 16,
    width: '100%',
  },
  loginButton: {
    height: 40,
    marginBottom: 10,
    backgroundColor: 'rgba(176, 203, 214, 0.9)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
