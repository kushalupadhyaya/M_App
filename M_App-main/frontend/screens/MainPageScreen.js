import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  const handlePress = () => {
    alert('Button pressed!');
  };

  useEffect(() => {
    if(user){
      fetch('http://192.168.0.4:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        Alert.alert('Error fetching user data:', err.message);
      });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {user && userData && (
        <>
          <Text style={styles.title}>Welcome {userData.name}!</Text>

          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Daily Meditation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Session Categories</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Recommended for you</Text>
          </TouchableOpacity>

          <Text style={styles.text}>Your current streak: {userData.streak}</Text>

          <Text style={styles.text}>You have new notifications</Text>

          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Quick Start Session</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#344955',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(197, 211, 217, 0.8)',
    borderRadius: 50,
    width: '80%',
    height: 60,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#4a6572',
  },
});

export default HomeScreen;
