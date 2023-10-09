import React, {Children, useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const RegisterScreen = ({navigation}) => {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // const {register} = useContext(AuthContext);

  const {register} = useContext(AuthContext);

  const val = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text>{val}</Text>
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

        {/*<Button*/}
        {/*  title="Register"*/}
        {/*  onPress={() => {*/}
        {/*    register(firstname, lastname, email, password);*/}
        {/*  }}*/}
        {/*/>*/}
        <Button
          title="Register"
          onPress={() => {
            console.log(
              'Register button pressed with:',
              firstname,
              lastname,
              email,
              password,
            );
            register(firstname, lastname, email, password);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
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

export default RegisterScreen;
