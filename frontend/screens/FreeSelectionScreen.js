import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';

const FreeSelectionScreen = ({ navigation }) => {
  const meditations = ['Meditation 1', 'Meditation 2', 'Meditation 3', 'Meditation 4', 'Meditation 5']; // replace with actual data
  
  return (
    <ScrollView style={styles.container}>
      <Text h1 style={styles.title}>Free Selection</Text>
      {meditations.map((meditation, index) => (
        <Card key={index} containerStyle={styles.card}>
          <Card.Title>{meditation}</Card.Title>
          <Card.Divider/>
          <Card.Image source={require('../assets/placeholder.jpg')}> 
            {/* Replace with actual image */}
          </Card.Image>
          <Text style={styles.cardText}>Some description of the meditation...</Text>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
  cardText: {
    marginTop: 10,
  },
});

export default FreeSelectionScreen;
