import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, Platform } from 'react-native';
import axios from 'axios'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { countries } from '../countries';



export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState(new Date());
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
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
      .post('http://192.168.0.15:3000/api/auth/register', {
        name: fullName,
        location: { country: country, city: city },
        dob: dob,
        gender: gender,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate('SignIn');
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          // If the server responds with status code 409, show an alert that the email is already in use.
          if (error.response.status === 400) {
            alert('Email is already in use');
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
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <Picker
        selectedValue={country}
        style={styles.input}
        onValueChange={(itemValue) =>
          setCountry(itemValue)
        }>
        <Picker.Item label="Country" value="" />
        {countries.map((country, index) => (
          <Picker.Item label={country} value={country} key={index} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <View style={styles.datePickerButton}>
        <Button onPress={showDatepicker} title="Show date picker!" color="#2196F3" />
      </View>
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
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
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
      <Button title="Register" onPress={registerUser} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  datePickerButton: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#2196F3',
    color: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerButtonText: {
    color: '#fff',
  },
});
