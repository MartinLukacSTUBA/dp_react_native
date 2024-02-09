import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';
import LoginScreen from './LoginScreen';
import DiagnosticScreen from './DiagnosticScreen';
import {myViewStyles} from '../styles/myViewStyles';
import {myButtonStyles} from '../styles/myButtonStyles';
import {myTextStyles} from '../styles/myTextStyles';
import CreateCarComponent from '../components/CreateCarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';
import {string} from 'prop-types';

/**
 * @typedef {Object} Car
 * @property {string} id - The ID of the car.
 * @property {string} fuel
 * @property {boolean} companyCar - Indicates if the car is a company car.
 * Add other properties here as needed.
 */

const CreateAndAssignCarsScreen = ({navigation}) => {
  const LoginScreenNavigation = () => {
    navigation.navigate(LoginScreen); // Replace 'Screen2' with the name of the second screen.
  };
  const DiagnosticScreenNavigation = () => {
    navigation.navigate(DiagnosticScreen); // Replace 'Screen1' with the name of the screen you want to navigate to.
  };
  const MyCarHistoryScreen = () => {
    navigation.navigate(MyCarHistoryScreen);
  };

  const [showCreateCar, setShowCreateCar] = useState(false);
  const [carsData, setCarsData] = useState([]); // State to store fetched cars data

  useEffect(() => {
    getCars(); // Fetch cars data when component mounts
  }, []);

  const handleToggleCreateCar = () => {
    setShowCreateCar(prevState => !prevState); // Toggle the state value
  };

  const [VIM, setVIM] = useState('');
  const [name, setName] = useState('');
  const [yearOfPurchase, setYearOfPurchase] = useState('');
  const [type, setType] = useState(''); //sedan suv truck
  const [transmittionType, setTransmittionType] = useState(''); // Manual or automatic
  const [owner, setOwner] = useState('');
  const [vehicleNumberPlate, setVehicleNumberPlate] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [registrationExpiration, setRegistrationExpiration] = useState('');
  const [serviceHistory, setServiceHistory] = useState('');
  const [note, setNote] = useState('');

  const getCars = async () => {
    const accessToken = await AsyncStorage.getItem('AccessToken');
    console.log(accessToken);
    const url = `${BASE_URL}/api/v1/car`;
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
        <View style={myViewStyles.burgerMenuContainer}>
          <TouchableOpacity
            style={myButtonStyles.basicButton}
            onPress={LoginScreenNavigation}>
            <Text style={myTextStyles.basicText}>LoginScreenNavigation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={myButtonStyles.basicButton}
            onPress={DiagnosticScreenNavigation}>
            <Text style={myTextStyles.basicText}>
              DiagnosticScreenNavigation
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={myButtonStyles.basicButton}
            onPress={MyCarHistoryScreen}>
            <Text style={myTextStyles.basicText}>MyCarHistoryScreen</Text>
          </TouchableOpacity>
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

        {showCreateCar && (
          <CreateCarComponent
            setVIM={setVIM}
            setName={setName}
            setYearOfPurchase={setYearOfPurchase}
            setType={setType}
            setTransmittionType={setTransmittionType}
            setOwner={setOwner}
            setVehicleNumberPlate={setVehicleNumberPlate}
            setRegistrationDate={setRegistrationDate}
            setRegistrationExpiration={setRegistrationExpiration}
            setServiceHistory={setServiceHistory}
            setNote={setNote}
          />
        )}

        {/*<Speedometer value={parseInt(speedData, 10)} />*/}
        <View style={{height: 25}}></View>
        <View>
          <View>
            <Text>List of all cars:</Text>
            {carsData.map(car => (
              <View key={car.id}>
                <Text>ID: {car.id}</Text>
                <Text>Fuel:{car.fuel}</Text>
                <Text>Company Car: {car.companyCar}</Text>
                {/* Render other car properties similarly */}
              </View>
            ))}
          </View>

          {/*HERE I WANT PRINTED ALL DATA FROM GETCARS*/}
        </View>
        {/*<TemperatureMeterComponent*/}
        {/*// value={parseInt(engineTemperatureData, 10)}*/}
        {/*/>*/}
        <View style={{height: 50}}></View>
        {/*<RPMMeterComponent value={parseInt(RPMData, 10)} />*/}
        <View style={{height: 50}}></View>
      </View>

      <View style={myViewStyles.centerContainer}></View>
      <View style={myViewStyles.centerContainer}></View>
      {/*<LocalStorageComponent />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Center children vertically
    justifyContent: 'space-between', // Distribute children evenly along the row
    paddingHorizontal: 16, // Add horizontal padding for spacing
    marginBottom: 10, // Add bottom margin for spacing
  },
  label: {
    width: '40%',
    textAlign: 'right',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
  },
});

export default CreateAndAssignCarsScreen;
