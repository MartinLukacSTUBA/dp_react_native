import {
  readDataFromOBDEngineLoad,
  readDataFromOBDEngineTemperature,
  readDataFromOBDFuelPressure,
  readDataFromOBDRPM,
  readDataFromOBDSpeed,
  readDataFromOBDThrottlePosition,
  readDataFromOBDVIN,
} from '../functions/OBDUtils';
import {Text, TouchableOpacity, View} from 'react-native';
import {myButtonStyles} from '../styles/myButtonStyles';
import {myTextStyles} from '../styles/myTextStyles';
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

const DoDiagnosticComponent = ({
  setVinData,
  setSpeedData,
  setRPMData,
  setEngineTemperatureData,
  setThrottlePosition,
  setEngineLoad,
  setFuelPressure,
  setSelectedCar,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState('DO DIAGNOSTIC');
  const [speedValues, setSpeedValues] = useState([]);
  const [rpmValues, setRpmValues] = useState([]);
  const [engineTemperatureValues, setEngineTemperatureValues] = useState([]);
  const [throttlePositionValues, setThrottlePositionValues] = useState([]);
  const [engineLoadValues, setEngineLoadValues] = useState([]);
  const [fuelPressureValues, setFuelPressureValues] = useState([]);

  const [startAddress, setStartAddress] = useState('');
  const [startLatitude, setStartLatitude] = useState('');
  const [startLongitude, setStartLongitude] = useState('');

  const [endAddress, setEndAddress] = useState('');
  const [endLatitude, setEndLatitude] = useState('');
  const [endLongitude, setEndLongitude] = useState('');

  const [selectedCar, setSelectedCarValues] = useState('');

  const getLocationDetails = () => {
    return new Promise((resolve, reject) => {
      // Get current location coordinates
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          // Make API call to fetch address details
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBRBhE7q-l_JAAoatwocT0WQuwSOIM9bK8`,
          )
            .then(response => response.json())
            .then(data => {
              if (data.results && data.results.length > 0) {
                // Extract address from the response
                const address = data.results[0].formatted_address;
                // Resolve an object containing both address and coordinates
                resolve({address, latitude, longitude});
              } else {
                reject('No address found for the provided coordinates.');
              }
            })
            .catch(error => {
              reject('Error fetching location details:', error);
            });
        },
        error => {
          reject('Error getting current location:', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  };

  const getLocationDetailsAndUpdateStartingAddress = () => {
    getLocationDetails()
      .then(address => {
        setEndAddress(address);
      })
      .catch(error => {
        console.error('Error getting location details:', error);
      });
  };

  const getLocationDetailsAndUpdateEndingAddress = () => {
    getLocationDetails()
      .then(address => {
        setStartAddress(address);
      })
      .catch(error => {
        console.error('Error getting location details:', error);
      });
  };

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(diagnosticData, 300);

      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  // const startDiagnostic = () => {
  //   setIsRunning(true);
  //   getLocationDetailsAndUpdateStartingAddress(); // TODO UNCOMMENT if wanna real adress
  //
  //   // setStartAddress('Poľná 170/13, 082 71 Lipany, Slovakia');
  //   setButtonText('END LIVE DATA SAVE');
  // };

  // const startDiagnostic = async () => { TOOT JE DOBRE LEN BACHA
  //   setIsRunning(true);
  //   setButtonText('END LIVE DATA SAVE');
  //
  //   try {
  //     const address = await getLocationDetails(); // TODO UNCOMMENT if wanna real adress
  //     //setEndAddress('Staré Grunty 53, 842 07,Bratislava, Slovakia');
  //     setStartAddress(address);
  //   } catch (error) {
  //     console.error('Error getting location details:', error);
  //   }
  // };

  const startDiagnostic = async () => {
    setIsRunning(true);
    setButtonText('END LIVE DATA SAVE');
    setSelectedCarValues(setSelectedCar);

    try {
      const address = 'Poľná 170/13, 082 71 Lipany, Slovakia';
      const latitude = '49.1574247';
      const longitude = '20.9629973';
      //const {address, latitude, longitude} = await getLocationDetails(); // TODO UNCOMMENT if wanna real adress
      setStartAddress(address);
      setStartLatitude(latitude);
      setStartLongitude(longitude);
    } catch (error) {
      console.error('Error getting location details:', error);
    }
  };

  const stopDiagnostic = async () => {
    setIsRunning(false);
    setButtonText('DO LIVE DIAGNOSTIC');

    try {
      const address = 'Staré Grunty 53, 842 07,Bratislava, Slovakia';
      const latitude = '48.15866176719948';
      const longitude = '17.064047440537767';
      //const {address, latitude, longitude} = await getLocationDetails(); // TODO UNCOMMENT if wanna real adress  // TODO UNCOMMENT if wanna real adress
      if (address && typeof address === 'string' && address.trim() !== '') {
        setEndAddress(address);
        setEndLatitude(latitude);
        setEndLongitude(longitude);
      } else {
        console.error('Invalid address received:', address);
        // Set a default or fallback address here if needed
      }
    } catch (error) {
      console.error('Error getting location details:', error);
    }
  };

  // const stopDiagnostic = async () => {
  //   setIsRunning(false);
  //   setButtonText('DO LIVE DIAGNOSTIC');
  //
  //   try {
  //     const address = await getLocationDetails(); // TODO UNCOMMENT if wanna real adress
  //     //setEndAddress('Staré Grunty 53, 842 07,Bratislava, Slovakia');
  //
  //     setEndAddress(address);
  //   } catch (error) {
  //     console.error('Error getting location details:', error);
  //   }
  // };

  const calculateAverage = values => {
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return sum / values.length;
  };

  const calculateAverageValues = () => {
    const averageSpeed = calculateAverage(speedValues);
    const averageRpm = calculateAverage(rpmValues);
    const averageEngineTemperature = calculateAverage(engineTemperatureValues);
    const averageThrottlePosition = calculateAverage(throttlePositionValues);
    const averageEngineLoad = calculateAverage(engineLoadValues);
    const averageFuelPressure = calculateAverage(fuelPressureValues);

    // Optionally, you can update state or perform other actions with the averages
    console.log('Average Speed:', averageSpeed);
    console.log('Average RPM:', averageRpm);
    console.log('Average Engine Temperature:', averageEngineTemperature);
    console.log('Average Throttle Position:', averageThrottlePosition);
    console.log('Average Engine Load:', averageEngineLoad);
    console.log('Average Fuel Pressure:', averageFuelPressure);
    return {
      averageSpeed,
      averageRpm,
      averageEngineTemperature,
      averageThrottlePosition,
      averageEngineLoad,
      averageFuelPressure,
    };
  };

  const saveLiveDiagnosticToDb = async (
    averageSpeed,
    averageRpm,
    averageEngineTemperature,
    averageThrottlePosition,
    averageEngineLoad,
    averageFuelPressure,
    address,
  ) => {
    const url = `${BASE_URL}/api/v1/car-diagnostic`;
    const accessToken = await AsyncStorage.getItem('AccessToken');
    console.log(accessToken);

    try {
      console.log('SELECTED CAR');
      console.log(selectedCar);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          averageSpeed: averageSpeed,
          averageRpm: averageRpm,
          averageEngineTemperature: averageEngineTemperature,
          averageThrottlePosition: averageThrottlePosition,
          averageEngineLoad: averageEngineLoad,
          averageFuelPressure: averageFuelPressure,
          startAddress: startAddress,
          startLatitude: startLatitude,
          startLongitude: startLongitude,
          endAddress: endAddress,
          endLatitude: endLatitude,
          endLongitude: endLongitude,
          carId: selectedCar,
        }),
      });

      if (response.status === 200) {
        console.log('Live diagnostic data saved successfully');
        // You can display a notification, message, or update UI accordingly
      } else {
        // If response status is not 200 (OK), handle other status codes here
        console.error(
          'Error while saving live diagnostic data. Status:',
          response.status,
        );
        // You can provide appropriate error handling or user feedback for other status codes
      }
    } catch (error) {
      console.error('Error while saving live diagnostic data:', error);
      // Handle other errors such as network issues or server unreachable
      // You can provide appropriate error handling or user feedback for these errors
    }
  };

  const diagnosticData = async () => {
    try {
      const vin = await readDataFromOBDVIN();
      console.log('diagnosticData VIN Data:', vin);
      setVinData(vin); // Update state in parent component

      const speed = await readDataFromOBDSpeed();
      console.log('diagnosticData Speed Data:', speed);
      if (speed != null) {
        setSpeedData(speed); // Update state in parent component
        setSpeedValues(prev => [...prev, speed]);
      }

      const RPM = await readDataFromOBDRPM();
      console.log('diagnosticData RPM Data: ', RPM);
      if (RPM != null) {
        setRPMData(RPM);
        setRpmValues(prev => [...prev, RPM]);
      }

      const engineTemperature = await readDataFromOBDEngineTemperature();
      console.log('diagnosticData Engine temperature Data:', engineTemperature);
      if (engineTemperature != null) {
        setEngineTemperatureData(engineTemperature);
        setEngineTemperatureValues(prev => [...prev, engineTemperature]);
      }

      const throttlePosition = await readDataFromOBDThrottlePosition();
      console.log('diagnosticData Throttle position Data : ', throttlePosition);

      // Check if throttlePosition is not null and not NaN
      if (throttlePosition !== null && !isNaN(throttlePosition)) {
        setThrottlePosition(throttlePosition);
        setThrottlePositionValues(prev => [...prev, throttlePosition]);
      } else {
        //console.warn('Invalid throttle position data received COMPONENT');
        // Optionally, you can set a default value or handle the error here
      }

      const engineLoad = await readDataFromOBDEngineLoad();
      console.log('diagnosticData Engine load Data:', engineLoad);
      if (engineLoad != null || !isNaN(engineLoad)) {
        setEngineLoad(engineLoad);
        setEngineLoadValues(prev => [...prev, engineLoad]);
      }

      const fuelPressure = await readDataFromOBDFuelPressure();
      console.log('diagnosticData Fuel pressure Data : ', fuelPressure);

      // Check if fuelPressure is not null and not NaN
      if (fuelPressure !== null && !isNaN(fuelPressure)) {
        setFuelPressure(fuelPressure);
        setFuelPressureValues(prev => [...prev, fuelPressure]);
      } else {
        //console.warn('Invalid fuelPressure  data received COMPONENT');
        // Optionally, you can set a default value or handle the error here
      }
    } catch (error) {
      console.error('Error fetching diagnostic data:', error);
    }
  };

  const handleButtonPress = async () => {
    let averageValues;

    if (isRunning) {
      stopDiagnostic();
      averageValues = calculateAverageValues(); // Get average values
      // Call saveLiveDiagnosticToDb with average diagnostic data
      try {
        if (isNaN(averageValues.averageSpeed)) {
          averageValues.averageSpeed = 0;
        }
        if (isNaN(averageValues.averageRpm)) {
          averageValues.averageRpm = 0;
        }
        if (isNaN(averageValues.averageEngineTemperature)) {
          averageValues.averageEngineTemperature = 0;
        }
        if (isNaN(averageValues.averageThrottlePosition)) {
          averageValues.averageThrottlePosition = 0;
        }
        if (isNaN(averageValues.averageEngineLoad)) {
          averageValues.averageEngineLoad = 0;
        }
        if (isNaN(averageValues.averageFuelPressure)) {
          averageValues.averageFuelPressure = 0;
        }
        await saveLiveDiagnosticToDb(
          averageValues.averageSpeed,
          averageValues.averageRpm,
          averageValues.averageEngineTemperature,
          averageValues.averageThrottlePosition,
          averageValues.averageEngineLoad,
          averageValues.averageFuelPressure,
        );
      } catch (error) {
        console.error('Error while saving live diagnostic data:', error);
      }
    } else {
      startDiagnostic();
    }
  };

  return (
    <View style={myButtonStyles.bottomButton}>
      <TouchableOpacity
        style={myButtonStyles.basicButton}
        onPress={handleButtonPress}>
        <Text style={myTextStyles.basicText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoDiagnosticComponent;
