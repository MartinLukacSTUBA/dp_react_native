import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';
import {myButtonStyles} from '../../styles/myButtonStyles';

const EditComponentUser = ({userId}) => {
  const [responseData, setResponseData] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State variables to store form data
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [position, setPosition] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');

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

  const handleClick = async () => {
    // Fetch user info and display modal
    setIsViewOpen(prevState => !prevState);
    setIsModalVisible(true);
    setResponseData(data);
  };

  const handleClose = () => {
    // Close the modal
    setIsViewOpen(false);
    setIsModalVisible(false);
    setResponseData(null);
  };

  const handleSave = async () => {
    try {
      // Construct request body
      const body = {
        firstname,
        lastname,
        email,
        address,
        phoneNumber,
        position,
        drivingLicense,
      };
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const url = `${BASE_URL}/api/v1/user/${userId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      // Refresh user info after saving
      setIsModalVisible(false); // Close the modal
    } catch (error) {
      // Handle error gracefully, e.g., display an error message
      console.error('Handle error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
        <View>
          <Image
            style={styles.tinyJpg}
            source={require('../images/edit.png')}
          />
        </View>
      </TouchableOpacity>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide">
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalContainer}>
              <View style={styles.responseContainer}>
                <Text style={styles.responseText}>Edit User Information:</Text>
                <TextInput
                  style={styles.textInput}
                  value={firstname}
                  onChangeText={setFirstname}
                  placeholder="Enter firstname"
                  autoFocus={true}
                />
                <TextInput
                  style={styles.textInput}
                  value={lastname}
                  onChangeText={setLastname}
                  placeholder="Enter lastname"
                />
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email"
                />
                <TextInput
                  style={styles.textInput}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter address"
                />
                <TextInput
                  style={styles.textInput}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Enter phone number "
                />
                <TextInput
                  style={styles.textInput}
                  value={position}
                  onChangeText={setPosition}
                  placeholder="Position"
                />
                <TextInput
                  style={styles.textInput}
                  value={drivingLicense}
                  onChangeText={setDrivingLicense}
                  placeholder="A/B/C/D"
                />
              </View>

              <TouchableOpacity
                style={[myButtonStyles.basicSmallButton, {marginBottom: 10}]}
                onPress={handleSave}>
                <Text style={styles.buttonTexts}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={myButtonStyles.basicSmallButton}
                onPress={handleClose}>
                <Text style={styles.buttonTexts}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
  tinyJpg: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 16,
  },
  buttonTexts: {
    fontSize: 16,
  },
  responseContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    borderRadius: 5,
  },
  responseText: {
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});

export default EditComponentUser;
