import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Video 
        source={require('../assets/backgroundVideo.mp4')} 
        style={StyleSheet.absoluteFill}
        shouldPlay
        isLooping
        resizeMode="cover"
        isMuted={true}
        rate={1}

      />
      <LinearGradient
        colors={['rgba(97, 242, 235, 0.4)', 'transparent']}
        style={styles.linearGradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>WELCOME TO</Text>
          <Text style={styles.title1}>PEACEPORT</Text>
          <Text style={styles.subtitle}>Start your journey to peace and inner tranquility</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
    // fontWeight: 'bold',
    color: '#f2fafa',
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    paddingVertical: 8,
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
    backgroundColor: 'rgba(32, 84, 115, 0.3)',
  },
  signupButton: {
    backgroundColor: 'rgba(18, 59, 99, 0.4)',
  },
  freeSelectionButton: {
    backgroundColor: 'rgba(242, 7, 27, 0.7)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
