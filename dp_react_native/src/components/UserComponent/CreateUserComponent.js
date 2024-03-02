import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {myTextStyles} from '../../styles/myTextStyles';
import {BASE_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateUserComponent = ({}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); //sedan suv truck
  const [address, setAddress] = useState(''); // Manual or automatic
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');

  const saveUser = async () => {
    try {
      console.log(
        firstname,
        lastname,
        email,
        role,
        address,
        phoneNumber,
        position,
        drivingLicense,
      );
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const url = `${BASE_URL}/api/v1/user`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          role: role,
          phoneNumber: phoneNumber,
          address: address,
          position: position,
          drivingLicense: drivingLicense,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from backend:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        label="Insert firstname:"
        value={firstname}
        onChangeText={setFirstname}
        placeholder="Enter firstname"
      />
      <InputField
        label="Insert lastname:"
        value={lastname}
        onChangeText={setLastname}
        placeholder="Enter lastname"
      />
      <InputField
        label="Email:"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
      />
      <InputField
        label="Role :"
        value={role}
        onChangeText={setRole}
        placeholder="USER/ADMIN"
      />
      <InputField
        label="Address:"
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
      />
      <InputField
        label="Phone Number:"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter phone number "
      />
      <InputField
        label="Position:"
        value={position}
        onChangeText={setPosition}
        placeholder="Position"
      />
      <InputField
        label="Driving license type:"
        value={drivingLicense}
        onChangeText={setDrivingLicense}
        placeholder="A/B/C/D"
      />

      <TouchableOpacity
        style={styles.basicButton}
        onPress={() =>
          saveUser(
            firstname,
            lastname,
            email,
            role,
            address,
            phoneNumber,
            position,
            drivingLicense,
          )
        }>
        <Text style={myTextStyles.basicText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: '40%',
    textAlign: 'right',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  basicButton: {
    width: '40%',
    left: '30%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
});

export default CreateUserComponent;
