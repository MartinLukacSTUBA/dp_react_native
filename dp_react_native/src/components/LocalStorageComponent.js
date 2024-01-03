import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalStorageComponent = () => {
  const [data1, setData1] = useState('');

  useEffect(() => {
    // Function to retrieve data from storage
    const getDataFromStorage = async () => {
      try {
        const storedData = await AsyncStorage.getItem('AccessToken');
        if (storedData) {
          setData1(storedData);
        }
      } catch (error) {
        console.error('Error getting data from storage:', error);
      }
    };

    // Call the function to retrieve data when the component mounts
    getDataFromStorage();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return <Text>{data1}</Text>;
};

const styles = StyleSheet.create({
  measuredContainer: {
    backgroundColor: '#00ffff',
    marginTop: '40%',
    textAlign: 'center',
  },
});

export default LocalStorageComponent;
