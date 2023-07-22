import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { countries } from '../countries';

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState(new Date());
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShow(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const registerUser = () => {
    console.log(fullName, country, city, dob, gender, email, password);
    if (!fullName || !country || !city || !dob || !gender || !email || !password) {
      alert('Please fill out all fields in the form to register');
      return;
    }

    axios
      .post('http://192.168.0.4:3000/api/auth/register', {
        name: fullName,
        location: { country: country, city: city },
        dob: dob,
        gender: gender,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate('Subscription');
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);


    
          // If the server responds with status code 409, show an alert that the email is already in use.
          if (error.response.status === 409) {
            alert('Email is already in use');
          }
    
          // If the server responds with status code 400, show an alert that some fields are missing or not correct.
          if (error.response.status === 400) {
            alert(`Error: ${error.response.data.error}`);
          }
          
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={country}
          style={styles.picker}
          onValueChange={(itemValue) => setCountry(itemValue)}
        >
          <Picker.Item label="Country" value="" />
          {countries.map((country, index) => (
            <Picker.Item label={country} value={country} key={index} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker}>
        <Text style={styles.buttonText}>Select Date of Birth</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dob}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.registerButton} onPress={registerUser}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  )};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#344955',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 16,
    width: '100%',
  },
  pickerContainer: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    width: '100%',
  },
  picker: {
    height: 50,
    fontSize: 16,
    width: '100%',
  },
  datePickerButton: {
    height: 40,
    marginBottom: 10,
    backgroundColor: 'rgba(176, 203, 214, 0.9)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  registerButton: {
    height: 40,
    marginBottom: 10,
    backgroundColor: 'rgba(176, 203, 214, 0.9)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});