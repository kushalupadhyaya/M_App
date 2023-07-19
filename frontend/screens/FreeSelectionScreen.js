import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';

const FreeSelectionScreen = ({ navigation }) => {
  const [meditations, setMeditations] = useState([]);
    
  useEffect(() => {
    fetch('http://192.168.0.15:3000/api/soundtracks')
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
  );
};


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5A9',
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
    backgroundColor: '#5A9',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});

export default FreeSelectionScreen;
