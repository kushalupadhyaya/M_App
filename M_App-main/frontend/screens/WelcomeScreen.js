import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Video 
          source={{ uri: 'https://res.cloudinary.com/djmeitgwd/video/upload/v1689604466/backgroundVideo_nfghph.mp4' }} 
          style={StyleSheet.absoluteFill}
          shouldPlay
          isLooping
          resizeMode="cover"
          isMuted={true}
          rate={1}
      />

      <LinearGradient
        colors={['rgba(255, 255, 255, 0.3)', 'transparent']}
        style={styles.linearGradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>WELCOME TO</Text>
          <Text style={styles.title1}>PEACEPORT</Text>
          <Text style={styles.subtitle}>Start your journey to mental focus and inner tranquility</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.freeSelectionButton]} onPress={() => navigation.navigate('FreeSelection')}>
            <Text style={styles.buttonText}>Preview Access</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  linearGradient: {
    flex: 1,
    padding: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'rgba(235, 255, 242, 0.8)',
    marginBottom: 10,
  },
  title1: {
    fontSize: 42,
    color: 'white',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 20,
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
    backgroundColor: 'rgba(220, 237, 242, 0.25)',
  },
  signupButton: {
    backgroundColor: 'rgba(220, 237, 242, 0.25)',
  },
  freeSelectionButton: {
    backgroundColor: 'rgba(222, 52, 47, 0.3)',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    // fontWeight: 'bold',
  },
});
