import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const CreateCarComponent = ({
  VIM,
  setVIM,
  name,
  setName,
  type,
  setType,
  transmittionType,
  setTransmittionType,
  owner,
  setOwner,
  vehicleNumberPlate,
  setVehicleNumberPlate,
  registrationDate,
  setRegistrationDate,
  registrationExpiration,
  setRegistrationExpiration,
  serviceHistory,
  setServiceHistory,
  fuel,
  setFuel,
  note,
  setNote,
}) => {
  return (
    <View style={styles.container}>
      <InputField
        label="Insert VIM:"
        value={VIM}
        onChangeText={setVIM}
        placeholder="Enter VIM"
      />
      <InputField
        label="Insert Name:"
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <InputField
        label="Type (Sedan, SUV, Truck):"
        value={type}
        onChangeText={setType}
        placeholder="Enter vehicle type"
      />
      <InputField
        label="Transmission Type (Manual/Automatic):"
        value={transmittionType}
        onChangeText={setTransmittionType}
        placeholder="Enter transmission type"
      />
      <InputField
        label="Owner:"
        value={owner}
        onChangeText={setOwner}
        placeholder="Enter owner"
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
        placeholder="Enter registration date"
      />
      <InputField
        label="Registration Expiration:"
        value={registrationExpiration}
        onChangeText={setRegistrationExpiration}
        placeholder="Enter registration expiration"
      />
      <InputField
        label="Service History:"
        value={serviceHistory}
        onChangeText={setServiceHistory}
        placeholder="Enter service history"
      />
      <InputField
        label="Fuel:"
        value={fuel}
        onChangeText={setFuel}
        placeholder="Enter FUEL"
      />
      <InputField
        label="Note:"
        value={note}
        onChangeText={setNote}
        placeholder="Enter note"
      />
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
});

export default CreateCarComponent;
