import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';

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
        console.log('Data:', data);
        if(!Array.isArray(data)) {
          data = [data];
        }
        setMeditations(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <Text h2 style={styles.title}>Free Selection</Text>
      {meditations.map((meditation, index) => {
        // We move the descriptionHTML variable here
        let descriptionHTML = `${meditation.description}`;
        descriptionHTML = descriptionHTML.substring(1, descriptionHTML.length - 1);

        return (
          <Card key={index} containerStyle={styles.card}>
            <View style={styles.cardHeader}>
              <Image
                style={styles.cardImage}
                source={{ uri: meditation.imageUrl }}
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{meditation.name}</Text>
      
                <WebView
                  originWhitelist={['*']}
                  source={{ html: `<html><head><style>body { font-size: 50px; }</style></head><body style="overflow: hidden; margin: 0; padding: 0;">${descriptionHTML}</body></html>` }}
                  style={{ ...styles.cardText, flex: 1 }}
                  javaScriptEnabled
                  scrollEnabled={false}
                />
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }} />

              </View>
            </View>
            <Button
              title="Listen"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              onPress={() => navigation.navigate('MeditationScreen', { meditation })}
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
    marginTop: 15,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',

  },
  cardText: {
    flex: 1,
  },
  button: {
    backgroundColor: '#05203b',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});

export default FreeSelectionScreen;
