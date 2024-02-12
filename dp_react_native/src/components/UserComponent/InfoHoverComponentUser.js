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

const InfoHoverComponentUser = ({userId}) => {
  const [responseData, setResponseData] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUserInfoDetails = async userId => {
    try {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const url = `${BASE_URL}/api/v1/user/details/${userId}`;
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
      id: responseData.id,
      firstname: responseData.firstname,
      lastname: responseData.lastname,
      email: responseData.email,
      role: responseData.role,
      address: responseData.address,
      phoneNumber: responseData.phoneNumber,
      position: responseData.position,
      drivingLicense: responseData.drivingLicense,
    };
  };

  const handleClick = async () => {
    try {
      setIsViewOpen(prevState => !prevState);
      const data = await fetchUserInfoDetails(userId);
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
                <Text style={styles.responseText}>User Information:</Text>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Firstname:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.firstname}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Lastname:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.lastname}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Email:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.email}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Role:</Text>
                  <Text style={styles.tableCellValue}>{responseData.role}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Address:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.address}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Phone number:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.phoneNumber}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Position:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.position}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Driving license:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.drivingLicense}
                  </Text>
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

export default InfoHoverComponentUser;
