import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {BASE_URL} from '../config';
import {response} from 'express';
import DiagnosticScreen from './DiagnosticScreen';

async function getEmployeesS() {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjk4NDA5MjgxLCJleHAiOjE2OTg0MTA3MjF9.XAtm_OOym84C2nPAZ_silQDFDNhSwNMo3RPVLNItzA0';
  const url = `${BASE_URL}/api/v1/employee`;
  // Construct the equivalent curl command
  const curlCommand = `curl -X GET "${url}" -H "Authorization: Bearer ${token}"`;
  const vzpis = token;

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
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}
async function loginEmployPicaee(email, password) {
  const url = `${BASE_URL}/api/v1/auth/authenticate`;
  // Construct the equivalent curl command
  const curlCommand = `curl -X POST "${url}" -H "Authorization: Bearer ${token}"`;

  console.log(curlCommand); // Log the curl command to the console

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      email: email,
      password: password,
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
          const token = data.token; // Extract the token from the response
          // Now, you can use the 'token' variable as needed.
          console.log(token); // This will log the JWT token.
          setTokenForLogin(token);

          navigation.navigate('DiagnosticScreen');

          // You can also save it to your component's state if needed.
          // For example, you can add 'const [token, setToken] = useState(null);' at the beginning of your component.
          // Then, you can set the token using 'setToken(token);'.
        } else {
          console.error('Token not found in the response');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        console.log('ASD'); // This will log the JWT token.
        console.log('token'); // This will log the JWT token.
        navigation.navigate('DiagnosticScreen');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Button title="Get" onPress={getEmployeesS} />
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
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
