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

function getEmployees() {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSIsImlhdCI6MTY5NzIwMDM4MiwiZXhwIjoxNjk3MjAxODIyfQ.2SkAGHgh_wgCrydJ4eOcfpL2BKWd0qMdDYAJiBQO99k'; // Replace with your actual Bearer Token

  fetch('https://ec70-213-81-199-22.ngrok-free.app/api/v1/employee', {
    method: 'GET', // Specify the HTTP method
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      console.log(res.status);
      console.log(res.headers);
      return res.json();
    })
    .then(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      },
    );
}

async function getEmployeesS() {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSIsImlhdCI6MTY5NzU1ODYwNSwiZXhwIjoxNjk3NTYwMDQ1fQ.uIov3cVaFgtSb5k9mm6q4Gr7mLB_d_zVPtdtV1QH6PU';
  const url = `${BASE_URL}/api/v1/employee`;
  // Construct the equivalent curl command
  const curlCommand = `curl -X GET "${url}" -H "Authorization: Bearer ${token}"`;

  console.log(curlCommand); // Log the curl command to the console

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

async function loginEmployee(email, password) {
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

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

        <Button
          title="Login"
          onPress={() => {
            loginEmployee(email, password).then(r =>
              navigation.navigate('Try'),
            );
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Dont have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
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
