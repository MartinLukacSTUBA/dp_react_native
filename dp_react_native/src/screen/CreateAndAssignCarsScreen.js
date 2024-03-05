import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';
import LoginScreen from './LoginScreen';
import DiagnosticScreen from './DiagnosticScreen';
import {myViewStyles} from '../styles/myViewStyles';
import {myTextStyles} from '../styles/myTextStyles';
import CreateCarComponent from '../components/CarsComponent/CreateCarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';
import DeleteCarComponent from '../components/CarsComponent/DeleteCarComponent';
import InfoHoverComponentCar from '../components/CarsComponent/InfoHoverComponentCar';

/**
 * Represents a Car object received from the backend.
 * @typedef {Object} Car
 * @property {number} id - The ID of the car.
 * @property {string} name - The name of the car.
 * @property {string} vehicleNumberPlate - The vehicle number plate of the car.
 */

const CreateAndAssignCarsScreen = ({navigation}) => {
  const LoginScreenNavigation = () => {
    navigation.navigate(LoginScreen); // Replace 'Screen2' with the name of the second screen.
  };
  const DiagnosticScreenNavigation = () => {
    navigation.navigate(DiagnosticScreen); // Replace 'Screen1' with the name of the screen you want to navigate to.
  };
  const DiagnosticHistory = () => {
    navigation.navigate(DiagnosticHistory);
  };

  const UsersScreen = () => {
    navigation.navigate(UsersScreen);
  };

  const [showCreateCar, setShowCreateCar] = useState(false);
  const [carsData, setCarsData] = useState([]); // State to store fetched cars data

  const handleToggleCreateCar = () => {
    setShowCreateCar(prevState => !prevState); // Toggle the state value
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      // Fetch cars data when the screen gains focus (navigated to)
      getCars();
    });
  }, [navigation]); // Add navigation as a dependency

  const getCars = async () => {
    const accessToken = await AsyncStorage.getItem('AccessToken');
    console.log(accessToken);
    const url = `${BASE_URL}/api/v1/car/all-basic-info`;
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
        setCarsData(data); // Update state with fetched cars data
        // Check if firstname and lastname properties exist
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  return (
    <View style={myViewStyles.mainContainer}>
      <View style={myViewStyles.headerContainer}>
        <View style={myViewStyles.leftView}>
          <Image
            source={require('../images/carCarsHeader.png')}
            style={myViewStyles.imageHeader}
            resizeMode="cover"
          />
        </View>
        <View style={myViewStyles.nameContainer}>
          <NameComponent />
          <DateComponent />
        </View>
      </View>

      <View style={myViewStyles.middleView}>
        <View style={styles.rowContainer}>
          <Text style={myTextStyles.bigText}>List of all cars </Text>
          <TouchableOpacity onPress={handleToggleCreateCar}>
            <Text style={myTextStyles.bigText}>
              {showCreateCar ? '-' : '+'}
            </Text>
          </TouchableOpacity>
        </View>

        {showCreateCar && <CreateCarComponent />}

        <View style={{height: 25}}></View>
        <View>
          <SafeAreaView>
            <ScrollView style={styles.scrollView}>
              {carsData.map(car => (
                <View key={car.id} style={styles.rowContainer}>
                  <Text style={styles.idText}>{car.id}</Text>
                  <Text style={styles.carNameText}>{car.name}</Text>
                  <Text style={styles.vehiclePlateText}>
                    {car.vehicleNumberPlate}
                  </Text>
                  <InfoHoverComponentCar carId={car.id} />
                  <View style={styles.deleteButton}>
                    <DeleteCarComponent
                      carId={car.id}
                      onDelete={() => getCars()}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
        <View style={{height: 50}}></View>
        <View style={{height: 50}}></View>
      </View>
      <View style={myViewStyles.centerContainer}></View>
      <View style={myViewStyles.centerContainer}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  idText: {
    width: '10%',
    textAlign: 'center',
  },
  carNameText: {
    width: '40%', // Adjusted width for the name of the car
    textAlign: 'left',
  },
  vehiclePlateText: {
    width: '30%', // Adjusted width for the vehicle number plate
    textAlign: 'center',
  },
  otherFieldsText: {
    flex: 1, // Take remaining space
    textAlign: 'left',
  },
  scrollView: {
    height: 500,
  },
});

export default CreateAndAssignCarsScreen;
