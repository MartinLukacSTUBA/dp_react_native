import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';

const InfoHoverComponent = ({carId}) => {
  const [responseData, setResponseData] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchCarInfoDetails = async id => {
    try {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const url = `${BASE_URL}/api/v1/car/details/${id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      return mapResponseToObject(data);
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const mapResponseToObject = responseData => {
    if (!responseData) {
      throw new Error('Response data is null or undefined');
    }
    return {
      carId: responseData.id,
      vim: responseData.vim,
      carName: responseData.name,
      carType: responseData.carTypeEnum,
      transmissionType: responseData.transmittionTypeEnum,
      userName: responseData.userName,
      vehicleNumberPlate: responseData.vehicleNumberPlate,
      registration: responseData.registration,
      registrationExpiration: responseData.registration_expiration,
      lastService: responseData.lastService,
      fuel: responseData.fuel,
      note: responseData.note,
    };
  };

  const handleClick = async () => {
    try {
      setIsViewOpen(prevState => !prevState);
      const data = await fetchCarInfoDetails(carId);
      setIsModalVisible(true);
      setResponseData(data);
    } catch (error) {
      // Handle error gracefully, e.g., display an error message
      console.error('Handle error:', error);
    }
  };

  const handleClose = () => {
    // Close the modal
    setIsViewOpen(false);
    setIsModalVisible(false);
    setResponseData(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
        <View>
          <Image
            style={styles.tinyJpg}
            source={require('../images/informations.png')}
          />
        </View>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.modalContainer}>
            {responseData && (
              <View style={styles.responseContainer}>
                <Text style={styles.responseText}>Car Information:</Text>
                <Text>VIM: {responseData.vim}</Text>
                <Text>Name: {responseData.carName}</Text>
                <Text>Car Type: {responseData.carType}</Text>
                <Text>Transmission Type: {responseData.transmissionType}</Text>
                <Text>User Name: {responseData.userName}</Text>
                <Text>
                  Vehicle Number Plate: {responseData.vehicleNumberPlate}
                </Text>
                <Text>Registration: {responseData.registration}</Text>
                <Text>
                  Registration Expiration: {responseData.registrationExpiration}
                </Text>
                <Text>Last Service: {responseData.lastService}</Text>
                <Text>Fuel: {responseData.fuel}</Text>
                <Text>Note: {responseData.note}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
  tinyJpg: {
    width: 15,
    height: 15,
  },
  text: {
    fontSize: 16,
  },
  responseContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  responseText: {
    fontSize: 16,
    alignItems: 'center',
    position: 'relative',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
});

export default InfoHoverComponent;
