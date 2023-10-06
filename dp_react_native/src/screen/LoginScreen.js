import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacityComponent,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import {AuthContext, AuthProvider} from '../context/AuthContext';
import {isEnabled} from 'react-native/Libraries/Performance/Systrace';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const val = useContext(AuthContext);
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text>{val}</Text>
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

        <Button title="Login" />
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Dont have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*<Switch*/}
      {/*  trackColor={{false: '#767577', true: '#81b0ff'}}*/}
      {/*  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}*/}
      {/*  ios_backgroundColor="#3e3e3e"*/}
      {/*  onValueChange={toggleSwitch}*/}
      {/*  value={isEnabled}*/}
      {/*/>*/}
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
