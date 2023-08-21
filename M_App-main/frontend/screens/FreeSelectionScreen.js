import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const FreeSelectionScreen = () => {
  const navigation = useNavigation();
  const [meditations, setMeditations] = useState([]);

  useEffect(() => {
    fetch('http://192.168.0.4:3000/api/soundtracks')
      .then(response => {
        if (!response.ok) {
          console.error('Response status:', response.status);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          data = [data];
        }
        const freeMeditations = data.filter(meditation => meditation.free === true);
        setMeditations(freeMeditations);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <LinearGradient colors={['white', '#e1e7ed']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Free Selection</Text>
        {meditations.map((meditation, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('FreeScreen', { meditation })}
          >
            <Image style={styles.cardImage} source={{ uri: meditation.imageUrl }} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{meditation.name}</Text>
              {/* <Text style={styles.cardDescription}>{meditation.brief_description}</Text> */}
              <Text style={styles.cardDuration}>Duration: {meditation.duration} minutes</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    marginTop: '0%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingTop: 40,
    textAlign: 'center',
    color: '#0e536e',
  },
  card: {
    borderRadius: 10,
    width: 300,
    backgroundColor: 'rgba(200, 236, 250, 0.2)',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  cardContent: {
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: 'rgba(14, 83, 110, 0.6)',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 10,
    color: 'rgba(134, 173, 189, 0.8)',
  },
  cardDuration: {
    fontSize: 12,
    color: 'rgba(134, 173, 189, 0.8)',
    marginTop: 10,

  },
});

export default FreeSelectionScreen;
