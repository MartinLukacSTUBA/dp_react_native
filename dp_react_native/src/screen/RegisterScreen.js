import React, {Children, useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../config';

const getTokenFromRegister = (firstname, lastname, email, password) => {
  if (!firstname && !lastname && !email && !password) {
    const errorMessage = 'Fill all data!';
    console.error(errorMessage); // Log an error to the console
    alert(errorMessage); // Display an alert with the error message
    return Promise.reject(errorMessage); // Reject the promise with the error message
  } else {
    const url = `${BASE_URL}/api/v1/auth/register`;
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    });
  }
};

const RegisterScreen = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [tokenForLogin, setTokenForLogin] = useState('');

  const registerUser = () => {
    getTokenFromRegister(firstname, lastname, email, password)
      .then(response => response.json())
      .then(data => {
        if (data && data.token) {
          const token = data.token; // Extract the token from the response
          // Now, you can use the 'token' variable as needed.
          console.log(token); // This will log the JWT token.
          setTokenForLogin(token);
          navigation.navigate('ShiftScreen');

          // You can also save it to your component's state if needed.
          // For example, you can add 'const [token, setToken] = useState(null);' at the beginning of your component.
          // Then, you can set the token using 'setToken(token);'.
        } else {
          console.error('Token not found in the response');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={firstname}
          placeholder="Enter Firstname"
          onChangeText={text => setFirstname(text)}
        />
        <TextInput
          style={styles.input}
          value={lastname}
          placeholder="Enter Lastname"
          onChangeText={text => setLastname(text)}
        />
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

        <Button title="Register" onPress={registerUser} />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text>{tokenForLogin}</Text>
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

export default RegisterScreen;
