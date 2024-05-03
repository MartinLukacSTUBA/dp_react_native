import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import LoginScreen from './LoginScreen';
import Speedometer from '../components/speedometer-utils/SpeedometerComponent';
import TemperatureMeterComponent from '../components/speedometer-utils/TemperatureMeterComponent';
import RPMMeterComponent from '../components/speedometer-utils/RPMMeterComponent';
import TableThrottleEngineLoadFuelPressure from '../components/TableComponent/TableThrottleEngineLoadFuelPressure';
import {myViewStyles} from '../styles/myViewStyles';
import DoDiagnosticComponent from '../components/DoDiagnosticComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';
import * as PropTypes from 'prop-types';
import CarPickerComponent from '../components/PickerComponent/CarPickerComponent';

function PickerComponent(props) {
  return null;
}

PickerComponent.propTypes = {carsData: PropTypes.string};
const DiagnosticScreen = ({navigation}) => {
  const [vinData, setVinData] = useState('');
  const [speedData, setSpeedData] = useState('');
  const [engineTemperatureData, setEngineTemperatureData] = useState('');
  const [RPMData, setRPMData] = useState('');
  const [throttlePosition, setThrottlePosition] = useState('');
  const [engineLoad, setEngineLoad] = useState('');
  const [fuelPressure, setFuelPressure] = useState('');

  const [selectedCar, setSelectedCar] = useState(null);

  const LoginScreenNavigation = () => {
    navigation.navigate(LoginScreen);
  };
  const DiagnosticHistory = () => {
    navigation.navigate(DiagnosticHistory);
  };
  const CreateAndAssignCarsScreen = () => {
    navigation.navigate(CreateAndAssignCarsScreen);
  };

  const [cars, setCars] = useState([]);

  async function getCarsOfLoggedUser() {
    try {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const url = `${BASE_URL}/api/v1/car/logged-user/all-basic-info`;
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
      const result = await response.json();
      setCars(result);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCarsOfLoggedUser();
    });
    return unsubscribe;
  }, [navigation]);

  const handleCarSelection = carId => {
    setSelectedCar(carId);
  };

  return (
    <View style={myViewStyles.mainContainer}>
      <View style={myViewStyles.headerContainer}>
        <CarPickerComponent carsData={cars} onSelectCar={handleCarSelection} />
      </View>

      <View style={myViewStyles.middleView}>
        <Speedometer value={parseInt(speedData, 10)} />
        <View style={{height: 50}}></View>
        <TemperatureMeterComponent
          value={parseInt(engineTemperatureData, 10)}
        />
        <View style={{height: 48}}></View>
        <RPMMeterComponent value={parseInt(RPMData, 10)} />
        <View style={{height: 48}}></View>
      </View>

      <View style={myViewStyles.centerContainer}>
        <TableThrottleEngineLoadFuelPressure
          throttlePosition={throttlePosition}
          engineLoad={engineLoad}
          fuelPressure={fuelPressure}
        />
        {/*//<Text>{selectedCar}</Text>*/}
      </View>
      <View style={myViewStyles.centerContainer}></View>
      <DoDiagnosticComponent
        setVinData={setVinData}
        setSpeedData={setSpeedData}
        setEngineTemperatureData={setEngineTemperatureData}
        setRPMData={setRPMData}
        setThrottlePosition={value => {
          if (value !== null && !isNaN(value)) {
            setThrottlePosition(value);
          }
        }}
        setEngineLoad={value => {
          if (value !== null && !isNaN(value)) {
            setEngineLoad(value);
          }
        }}
        setFuelPressure={setFuelPressure}
        setSelectedCar={selectedCar}
      />
    </View>
  );
};
export default DiagnosticScreen;
