import React, {useState} from 'react';
import axios from 'axios';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TcpSocket from 'react-native-tcp-socket';

import {BASE_URL} from '../config';

export async function getHelloFromBE() {
  const accessToken = await AsyncStorage.getItem('AccessToken');
  const url = `${BASE_URL}/api/v1/user`;
  // Construct the equivalent curl command
  const curlCommand = `curl -X GET "${url}" -H "Authorization: Bearer ${accessToken}"`;
  console.log(curlCommand); // Log the curl command to the console
  console.log();
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP Error! Status: ${res.status}`);
      }
      return res.text();
    })
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}
const sendOBDIISpeedCommand = async () => {
  try {
    const serverUrl = 'https://0999-147-175-182-48.ngrok-free.app'; // Replace with the actual URL and port
    const obdCommand = '010D'; // OBD-II command for vehicle speed

    const response = await axios.get(`${serverUrl}`, {
      params: {command: obdCommand},
    });

    if (response.data) {
      console.log('Vehicle Speed:', response.data);
    } else {
      console.log('No data received');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

function readFromEmulatorXX() {
  return new Promise((resolve, reject) => {
    // Replace with your Ngrok URL and the exposed port
    const client = TcpSocket.createConnection(
      {host: '86ee-147-175-182-48.ngrok-free.app', port: 35005},
      () => {
        console.log('Connected to ELM327 emulator');

        // Send the command (e.g., '010D' for vehicle speed)
        client.write('010D\r');

        client.on('data', data => {
          // Handle the received data here.
          console.log('Received data:', data.toString());
          resolve(data.toString());

          client.destroy(); // Close the connection
        });
      },
    );

    client.on('error', error => {
      console.log('Error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  });
}

function parseAndPrintSpeed(obdResponse) {
  // Normalize the response and use a regular expression to find the speed pattern
  const normalizedResponse = obdResponse.replace(/\s+/g, ' ').trim();
  const speedPattern = /41 0D ([0-9A-F]{2})/i;

  // Check if the response contains the expected pattern
  const match = normalizedResponse.match(speedPattern);
  if (match) {
    // Convert the speed from hex to decimal
    const speedHex = match[1];
    const speedKmh = parseInt(speedHex, 16);

    // Print the speed
    console.log('Vehicle Speed:', speedKmh, 'km/h');
  } else {
    console.log('Invalid or unrecognized OBD-II response:', obdResponse);
  }
}

function readFromEmulator() {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');

    // Create a TCP connection to the emulator
    const client = TcpSocket.createConnection(
      {
        host: '0.tcp.eu.ngrok.io', // Corrected hostname without 'tcp://'
        port: 17545, // Corrected to the ngrok forwarded port
      },
      () => {
        console.log('Connected to the emulator');

        // Send OBD-II command for vehicle speed
        client.write('010D\r');
      },
    );

    client.on('data', data => {
      console.log('Received data:', data.toString());
      parseAndPrintSpeed(data.toString());
      resolve(data.toString());
      client.destroy(); // Close the connection
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  });
}
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

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenForLogin, setTokenForLogin] = useState('');

  const goToBluetoothScreen = () => {
    navigation.navigate('BluetoothScreen');
  };
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
        }
      })
      .catch(error => {
        console.error('Error:', error);
        navigation.navigate('DiagnosticScreen');
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Button title="Get" onPress={getHelloFromBE} />
        <Button title="Bluethoot" onPress={goToBluetoothScreen} />
        <Button title="ASDD" onPress={readFromEmulator} />
        <Button title="SENDOBD@" onPress={sendOBDIISpeedCommand} />

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
