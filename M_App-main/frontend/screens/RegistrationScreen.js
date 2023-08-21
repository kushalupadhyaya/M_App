import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const registerUser = () => {
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){7,}$/;

    if (!fullName || !email || !password) {
      alert('Please fill out all fields in the form to register');
      return;
    }

    if (!emailRegex.test(email.trim().toLowerCase())) {
      alert('Please enter a valid email address');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('The password must be at least 7 characters long and include at least one number');
      return;
    }

    if (email !== repeatEmail) {
      alert('Emails do not match');
      return;
    }

    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    axios
      .post('http://192.168.0.4:3000/api/auth/register', {
        name: fullName,
        email: email.trim().toLowerCase(),
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Subscription' }],
        });        
      })
      .catch(function (error) {
        // ... (rest of the error handling code remains unchanged)
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
          style={styles.input}
          placeholder="Repeat Email"
          value={repeatEmail}
          onChangeText={setRepeatEmail}
        />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        secureTextEntry={true}
        value={repeatPassword}
        onChangeText={setRepeatPassword}
      />
      <TouchableOpacity style={styles.registerButton} onPress={registerUser}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

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
  registerButton: {
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

export default RegistrationScreen;
