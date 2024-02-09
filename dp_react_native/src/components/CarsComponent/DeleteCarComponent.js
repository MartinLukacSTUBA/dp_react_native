import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';
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

const DeleteCarComponent = ({carId, onDelete}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deletedCar, setDeletedCar] = useState('');

  const deleteCarInfo = async id => {
    try {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const url = `${BASE_URL}/api/v1/car/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      onDelete(); // Call the onDelete callback after successful deletion
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const handleClick = async () => {
    try {
      await deleteCarInfo(carId);
    } catch (error) {
      // Handle error gracefully
      console.error('Handle error:', error);
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
        <View>
          <Image style={styles.tinyJpg} source={require('../images/bin.png')} />
        </View>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text>Deleted !</Text>
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
    width: 25,
    height: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});

export default DeleteCarComponent;
