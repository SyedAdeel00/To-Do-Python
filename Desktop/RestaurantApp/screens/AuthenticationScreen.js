import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';


const AuthenticationScreen = ({ navigation }) => {
  const [otp, setOTP] = useState('');
const route = useRoute()
console.log(route.params.data.number)
const handleOTPConfirmation = async () => {
  if (!otp) {
    Alert.alert('Please fill the OTP field');
    return;
  }

  try {
    const response = await fetch('https://staging.fastor.in/v1/pwa/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "phone": route.params.data.number,
        "otp": otp,
        "dial_code": "+91"
      }),
    });

    const responseData = await response.json();

    if (response.status === 200 && responseData.status === "Success" && responseData.status_code === 200) {
      const userData = responseData.data;
      const token = userData.token;
      AsyncStorage.setItem('userData', JSON.stringify(userData));
      AsyncStorage.setItem('token', token);
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Incorrect OTP', 'Please enter the correct OTP and try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error', 'An unexpected error occurred');
  }
};

  const handleDigitChange = (index, text) => {
    const otpArray = otp.split('');
    otpArray[index] = text;
    const newOTP = otpArray.join('');
    setOTP(newOTP);

    if (text !== '' && index < 5) {
      refs[index + 1].focus();
    }
  };

  const refs = [];
  const setRef = ref => {
    refs.push(ref);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
        </View>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.text}>Enter the verification code we just sent to your mobile number.</Text>
      <View style={styles.otpContainer}>
        {[0, 1, 2, 3, 4, 5].map(index => (
          <TextInput
            key={index}
            ref={setRef}
            style={styles.otpInput}
            placeholder=""
            value={otp[index] || ''}
            onChangeText={text => handleDigitChange(index, text)}
            keyboardType="numeric"
            maxLength={1}
            returnKeyType={index === 5 ? 'done' : 'next'}
            onSubmitEditing={() => {
              if (index === 5) {
                Keyboard.dismiss();
              } else {
                refs[index + 1].focus();
              }
            }}
          />
        ))}
      </View>
     
      <Pressable style={styles.buttonContainer} onPress={handleOTPConfirmation}>
  <Text style={styles.buttonText}>Confirm OTP</Text>
</Pressable>
<Text style={{marginTop:10}}>Didn’t received code? <Text style={{color:'blue'}}>Resend</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
    borderWidth:1,
    borderColor:'#D3D3D3',
    borderRadius:18,
    top:5
  },
  otpContainer: {
    flexDirection: 'row',
    marginTop:10,
    marginBottom:20
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    marginLeft: -160,
    fontWeight: '600',
  },
  text: {
    fontSize: 18,
    opacity: 0.5,
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderColor: 'lightgrey',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
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

export default AuthenticationScreen;
