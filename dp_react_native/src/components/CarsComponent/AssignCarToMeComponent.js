import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';

const AssignCarToMeComponent = ({carId}) => {
  const handleClick = async () => {
    await assignToMe(carId);
  };

  const assignToMe = async carId => {
    try {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const url = `${BASE_URL}/api/v1/car/assign/${carId}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      console.log('settted');
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
        <Image
          style={styles.tinyJpg}
          source={require('../images/assignIcon.png')}
        />
      </TouchableOpacity>

      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -50}, {translateY: -50}],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  okText: {
    fontSize: 20,
    color: 'white',
  },
  container: {
    padding: 10,
    borderRadius: 5,
  },
  tinyJpg: {
    width: 20,
    height: 20,
  },
});

export default AssignCarToMeComponent;
