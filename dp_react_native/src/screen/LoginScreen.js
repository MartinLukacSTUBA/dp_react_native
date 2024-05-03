import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '../config';
import axios from 'axios';
import * as NetInfo from '@react-native-community/netinfo';

const getTokenFromLogin = (email, password) => {
  const url = `${BASE_URL}/api/v1/auth/authenticate`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};
//NEEEDED IN REAL DEV
const getPublicIPAddress = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip; // Extract and return the IP address from the response
  } catch (error) {
    console.error('Error getting public IP address:', error);
    return null;
  }
};

const getWifiIpAddress = () => {
  const [wifiIpAddress, setWifiIpAddress] = useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.type === 'wifi') {
        setWifiIpAddress(state.details.ipAddress || '');
      } else {
        setWifiIpAddress('');
      }
    });

    return () => unsubscribe();
  }, []);

  return wifiIpAddress;
};

const getWifiAddress = async () => {
  try {
    // Get the public IP address
    const publicIPAddress = await getPublicIPAddress();
    console.log('Public IP Address:', publicIPAddress);
    return publicIPAddress;
  } catch (error) {
    console.error('Error getting WiFi IP Address:', error);
    return null;
  }
};

getWifiAddress();
//NEEEDED IN REAL DEV

const LoginScreen = ({navigation}) => {
  const wifiIpAddress = getWifiIpAddress();
  console.log('wifina');
  console.log(wifiIpAddress);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenForLogin, setTokenForLogin] = useState('');
  const loginEmployee = () => {
    getTokenFromLogin(email, password)
      .then(response => response.json())
      .then(data => {
        if (data && data.token) {
          const token = data.token;
          console.log('Token:', token);

          // Store the token in local storage
          AsyncStorage.setItem('AccessToken', token)
            .then(() => {
              console.log('Token stored successfully');
              // Now, you can navigate to the next screen or perform other actions.
              navigation.navigate('DiagnosticScreen');
            })
            .catch(error => console.error('Error storing token:', error));
        } else {
          console.error('Token not found in the response');
          //navigation.navigate('DiagnosticScreen');//TODO during
          // development usefull, unlocks app without token
        }
      })
      .catch(error => {
        console.error('Error:', error);
        //navigation.navigate('DiagnosticScreen');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter Email"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Button title="Login" onPress={loginEmployee} />
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Dont have an account ?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
        <Text>{tokenForLogin}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default LoginScreen;
