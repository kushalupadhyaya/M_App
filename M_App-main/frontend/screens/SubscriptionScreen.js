import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PlanCard = ({ plan, price, onSelect }) => (
  <LinearGradient
    colors={['#6b9dc2', '#d0cbf2']} // softer colors for the card
    start={[0, 0]}
    end={[1, 0]}
    style={styles.card}
  >
    <View style={styles.cardContent}>
      <Text style={styles.plan}>{plan}</Text>
      <Text style={styles.price}>{price}</Text>
      <TouchableOpacity style={styles.button} onPress={onSelect}>
        <Text style={styles.buttonText}>Select Plan</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

export default function SubscriptionScreen({ navigation }) {
  const plans = [
    { plan: 'Monthly Plan', price: '$6.99/month' },
    { plan: 'Yearly Plan', price: '$14.99/year' },
    { plan: 'Corporate Plan', price: 'From $799.99/year' },
  ];

  return (
    <LinearGradient 
      colors={['#FFFFFF', '#e1e7ed']} 
      style={styles.container}
    >
      <Text style={styles.title}>Choose Your Plan</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan.plan}
            price={plan.price}
            onSelect={() => navigation.navigate('PaymentScreen', { plan: plan })}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0a425c',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plan: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // darker text for better readability on lighter card
    marginTop: 15,
  },
  price: {
    fontSize: 20,
    color: 'white', // darker text for better readability on lighter card
    marginBottom: 15,
    marginTop: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
    marginTop: 15,
    backgroundColor: 'rgba(176, 203, 214, 0.8)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
