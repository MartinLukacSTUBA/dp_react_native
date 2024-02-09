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
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>VIM:</Text>
                  <Text style={styles.tableCellValue}>{responseData.vim}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Name:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.carName}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Car Type:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.carType}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Transmission Type:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.transmissionType}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>User Name:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.userName}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>
                    Vehicle Number Plate:
                  </Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.vehicleNumberPlate}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Registration:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.registration}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>
                    Registration Expiration:
                  </Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.registrationExpiration}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Last Service:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.lastService}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Fuel:</Text>
                  <Text style={styles.tableCellValue}>{responseData.fuel}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Note:</Text>
                  <Text style={styles.tableCellValue}>{responseData.note}</Text>
                </View>
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
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 16,
  },
  responseContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    borderRadius: 5,
  },
  additionalInfoText: {
    fontSize: 16,
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

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  tableCellLabel: {
    fontWeight: 'bold',
  },

  tableCellValue: {
    flex: 1,
    marginLeft: 10,
  },
});

export default InfoHoverComponent;
