import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';

const PhoneNumber = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleLogin = async () => {
    if (!phoneNumber) {
      Alert.alert('Please enter your phone number');
      return;
    }
  
    try {
      const response = await fetch('https://staging.fastor.in/v1/pwa/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "phone": phoneNumber,
          "dial_code": "+91"
        }),
      });
  
      const responseData = await response.json();
  
      if (responseData.status === "Success" && responseData.status_code === 200 && responseData.data === "otp sent") {
        const data = {
          number: phoneNumber,
        };
        navigation.navigate('AuthenticationScreen', { data: data });
      } else {
        Alert.alert('Registration failed', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Mobile Number</Text>
      <Text style={styles.text}>We will send you the 6 digit verification code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={text => {
          const numericValue = text.replace(/[^0-9]/g, '');
          if (numericValue.length <= 10) {
            setPhoneNumber(numericValue);
          }
        }}
        keyboardType="numeric"
      />
      <Pressable style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Send Code</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 5,
    fontWeight: '600',
  },
  text: {
    fontSize: 15,
    opacity: 0.5,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 60,
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#F7F8F9',
  },
  buttonContainer: {
    backgroundColor: '#FF6D6A',
    width: '80%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText:{
    color:"#fff"
  }
});

export default PhoneNumber;
