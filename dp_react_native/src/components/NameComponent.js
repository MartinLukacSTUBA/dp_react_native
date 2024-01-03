import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {BASE_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NameComponent = () => {
  const [name, setName] = useState('');

  // Function to fetch name from backend
  const fetchNameFromBackend = async () => {
    const accessToken = await AsyncStorage.getItem('AccessToken');
    console.log(accessToken);
    const url = `${BASE_URL}/api/v1/user/logged`;
    // Construct the equivalent curl command
    const curlCommand = `curl -X GET "${url}" -H "Authorization: Bearer ${accessToken}"`;
    console.log(curlCommand); // Log the curl command to the console
    console.log();
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        return res.json(); // Parse the response as JSON
      })
      .then(data => {
        console.log('Data received:', data); // Log the data for debugging
        // Check if firstname and lastname properties exist
        if (data.firstname && data.lastname) {
          const fullName = `${data.firstname} ${data.lastname}`;
          setName(fullName); // Set the name in state
        } else {
          console.error('Firstname or lastname is missing in the response');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  useEffect(() => {
    fetchNameFromBackend();
  }, []);

  return (
    <View>
      {/* Display the name fetched from backend */}
      <Text>{name || 'Loading...'}</Text>
    </View>
  );
};

export default NameComponent;
