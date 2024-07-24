import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const getLocationDetails = () => {
  // Get current location coordinates
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      console.log(latitude, longitude);
      // Make API call to fetch address details
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=*****`,
      )
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            // Extract address and city from the response
            const address = data.results[0].formatted_address;
            let city = '';
            for (let component of data.results[0].address_components) {
              if (component.types.includes('locality')) {
                city = component.long_name;
                break;
              }
            }
            console.log('Address:', address);
            console.log('City:', city);
          } else {
            console.log('No address found for the provided coordinates.');
          }
        })
        .catch(error => {
          console.error('Error fetching location details:', error);
        });
    },
    error => {
      console.error('Error getting current location:', error);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

const LocationButton = () => (
  <View>
    <TouchableOpacity onPress={getLocationDetails}>
      <Text>Get Current Location Details</Text>
    </TouchableOpacity>
  </View>
);

export default LocationButton;
