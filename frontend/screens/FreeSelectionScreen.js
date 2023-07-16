import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';

const FreeSelectionScreen = ({ navigation }) => {
  const meditations = ['Meditation 1', 'Meditation 2', 'Meditation 3', 'Meditation 4', 'Meditation 5']; // replace with actual data

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <Text h2 style={styles.title}>Free Selection</Text>
      {meditations.map((meditation, index) => (
        <Card key={index} containerStyle={styles.card}>
          <View style={styles.cardHeader}>
            <Image
              style={styles.cardImage}
              source={require('../assets/placeholder.jpg')} // Replace with actual image
            />
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle}>{meditation}</Text>
              <Text style={styles.cardText}>Some description of the meditation...</Text>
            </View>
          </View>
          <Button
            title="Listen"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </Card>
      ))}
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
    overflow: 'hidden', // for rounded corners
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
    color: '#666',
    fontSize: 16,
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
