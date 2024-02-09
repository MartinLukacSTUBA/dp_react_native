import React, {useState} from 'react';
import {
  Image,
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

  const fetchCarInfoDetails = async id => {
    try {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      console.log(accessToken);
      const url = `${BASE_URL}/api/v1/car/details/${id}`;
      // Construct the equivalent curl command
      const curlCommand = `curl -X GET "${url}" -H "Authorization: Bearer ${accessToken}"`;
      console.log(curlCommand); // Log the curl command to the console
      console.log();
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
      const data = await response.json(); // Parse the response as JSON
      console.log('Data received:', data); // Log the data for debugging
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

  const handleClick = async () => {
    // Toggle the view
    setIsViewOpen(prevState => !prevState);
    setResponseData(await fetchCarInfoDetails(carId));
    console.log('Clicked on car with id:', carId);
    console.log('clicked');
  };

  const handleClose = () => {
    // Close the view
    setIsViewOpen(false);
    setResponseData(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleClick}>
          <View>
            <Image
              style={styles.tinyJpg}
              source={require('../images/informations.png')}
            />
          </View>
        </TouchableOpacity>
        {isViewOpen && responseData && (
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>Response Data:</Text>
            <Text>{JSON.stringify(responseData, null, 2)}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default InfoHoverComponent;
