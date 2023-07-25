import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const FreeSelectionScreen = ({ navigation }) => {
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
        //console.log('Data:', data);
        if(!Array.isArray(data)) {
          data = [data];
        }
        const freeMeditations = data.filter(meditation => meditation.free === true);
        setMeditations(freeMeditations);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <LinearGradient 
      colors={['white', '#e1e7ed']} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Text h2 style={styles.title}>Free Selection</Text>
        {meditations.map((meditation, index) => {
          return (
            <Card key={index} containerStyle={styles.card}>
              <View style={styles.cardHeader}>
                <Image
                  style={styles.cardImage}
                  source={{ uri: meditation.imageUrl }}
                />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle}>{meditation.name}</Text>
                  <Text style={styles.cardDescription}>{meditation.brief_description}</Text>
                </View>
              </View>
              <Button
                title="Listen"
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                onPress={() => navigation.navigate('FreeScreen', { meditation })}
              />
            </Card>
          )
        })}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a425c',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(176, 203, 214, 0.8)',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});

export default FreeSelectionScreen;