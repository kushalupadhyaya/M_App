import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/calm111.jpg')} style={styles.background}>
      <View style={styles.content}>
        <Text style={styles.title}>WELCOME TO</Text>
        <Text style={styles.title1}>PEACEPORT</Text>
        <Text style={styles.subtitle}>Start your journey to inner tranquility</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.freeSelectionButton]} onPress={() => navigation.navigate('FreeSelection')}>
          <Text style={styles.buttonText}>Try Our Free Selection</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  title1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 18,
    color: '#018f77',
    marginTop: 10,
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 3,
  },
  loginButton: {
    backgroundColor: 'rgba(149, 116, 214, 0.4)',
  },
  signupButton: {
    backgroundColor: 'rgba(102, 72, 161, 0.75)',
  },
  freeSelectionButton: {
    backgroundColor: 'rgba(242, 7, 27, 0.8)',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
