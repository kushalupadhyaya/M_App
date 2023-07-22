import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PlanCard = ({ plan, price, onSelect }) => (
  <View style={styles.card}>
    <LinearGradient
      colors={['#2056ba', '#6ab9eb']}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.gradient}
    >
      <Text style={styles.plan}>{plan}</Text>
      <Text style={styles.price}>{price}</Text>
      <TouchableOpacity style={styles.button} onPress={onSelect}>
        <Text style={styles.buttonText}>Select Plan</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

export default function SubscriptionScreen({ navigation }) {
  const plans = [
    { plan: 'Monthly Plan', price: '$4.99/month' },
    { plan: 'Yearly Plan', price: '$14.99/year' },
  ];

  return (
    <ImageBackground source={require('../assets/calm00.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Choose Your Plan</Text>
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan.plan}
            price={plan.price}
            onSelect={() => navigation.navigate('PaymentScreen', { plan: plan })}
          />
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: Dimensions.get('window').width - 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plan: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  price: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    marginTop: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#018f77',
    fontSize: 18,
    fontWeight: '700',
  },
});
