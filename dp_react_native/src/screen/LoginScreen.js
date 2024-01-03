import React, {useState} from 'react';
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
import {GLOBAL_TOKEN} from '../config';

export async function getHelloFromBE() {
  const token = `${GLOBAL_TOKEN}`;
  const url = `${BASE_URL}/api/v1/user`;
  // Construct the equivalent curl command
  const curlCommand = `curl -X GET "${url}" -H "Authorization: Bearer ${token}"`;
  console.log(curlCommand); // Log the curl command to the console
  console.log();
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
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
