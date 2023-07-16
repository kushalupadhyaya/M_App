import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/calm00.jpg')} style={styles.background}>
        <LinearGradient
          colors={['rgba(2, 1, 26, 0.8)', 'transparent']}
          style={styles.linearGradient}
        >
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
              <Text style={styles.buttonText}>Free Meditation  </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  title1: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#f2fafa',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    paddingVertical: 8,  // reduced from 12 to 8
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  loginButton: {
    backgroundColor: 'rgba(163, 105, 201, 0.5)',
  },
  signupButton: {
    backgroundColor: 'rgba(102, 72, 161, 0.7)',
  },
  freeSelectionButton: {
    backgroundColor: 'rgba(242, 7, 27, 0.7)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,  // reduced from 18 to 14
    fontWeight: 'bold',
  },
});
