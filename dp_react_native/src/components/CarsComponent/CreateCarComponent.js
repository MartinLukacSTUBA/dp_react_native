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

const CreateCarComponent = ({}) => {
  const [vim, setVim] = useState('');
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [type, setType] = useState(''); //sedan suv truck
  const [transmittionType, setTransmittionType] = useState(''); // Manual or automatic
  const [currentUser, setCurrentUser] = useState('');
  const [vehicleNumberPlate, setVehicleNumberPlate] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [registrationExpiration, setRegistrationExpiration] = useState('');
  const [serviceHistory, setServiceHistory] = useState('');
  const [note, setNote] = useState('');
  const [fuel, setFuel] = useState('');

  const saveCar = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const url = `${BASE_URL}/api/v1/car`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vim: vim,
          name: name,
          carTypeEnum: type,
          transmittionTypeEnum: transmittionType,
          userId: owner,
          vehicleNumberPlate: vehicleNumberPlate,
          registration: registrationDate,
          registration_expiration: registrationExpiration,
          lastService: serviceHistory,
          fuel: fuel,
          note: note,
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
        label="Insert vim:"
        value={vim}
        onChangeText={setVim}
        placeholder="Enter VIM"
      />
      <InputField
        label="Insert Name:"
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <InputField
        label="Type:"
        value={type}
        onChangeText={setType}
        placeholder="SUV/TRUCK/TATRAS/EXCAVATOR"
      />
      <InputField
        label="Transmission Type:"
        value={transmittionType}
        onChangeText={setTransmittionType}
        placeholder="MANUAL/AUTOMATIC"
      />
      <InputField
        label="Owner:"
        value={owner}
        onChangeText={setOwner}
        placeholder="Enter owner ID"
      />
      <InputField
        label="Vehicle Number Plate:"
        value={vehicleNumberPlate}
        onChangeText={setVehicleNumberPlate}
        placeholder="Enter vehicle number plate"
      />
      <InputField
        label="Registration Date:"
        value={registrationDate}
        onChangeText={setRegistrationDate}
        placeholder="YYYY-MM-DD"
      />
      <InputField
        label="Registration Expiration:"
        value={registrationExpiration}
        onChangeText={setRegistrationExpiration}
        placeholder="YYYY-MM-DD"
      />
      <InputField
        label="Service History:"
        value={serviceHistory}
        onChangeText={setServiceHistory}
        placeholder="YYYY-MM-DD"
      />
      <InputField
        label="Fuel:"
        value={fuel}
        onChangeText={setFuel}
        placeholder="DIESEL/GASOLINE/GAS/ELECTRIC"
      />
      <InputField
        label="Note:"
        value={note}
        onChangeText={setNote}
        placeholder="Enter note"
      />

      <TouchableOpacity
        style={styles.basicButton}
        onPress={() =>
          saveCar(
            vim,
            name,
            type,
            transmittionType,
            owner,
            vehicleNumberPlate,
            registrationDate,
            registrationExpiration,
            serviceHistory,
            fuel,
            note,
          )
        }>
        <Text style={myTextStyles.basicText}>Save</Text>
        <Text>
          asd
          {name}
          {type}
        </Text>
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

export default CreateCarComponent;
