import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';
import LoginScreen from './LoginScreen';
import DiagnosticsDataScreen from './DiagnosticsDataScreen';
import DoDiagnosticComponent from '../components/DoDiagnosticComponent';
import Speedometer from '../components/speedometer-utils/SpeedometerComponent';
import TemperatureMeterComponent from '../components/speedometer-utils/TemperatureMeterComponent';
import RPMMeterComponent from '../components/speedometer-utils/RPMMeterComponent';

const DiagnosticScreen = ({navigation}) => {
  const [vinData, setVinData] = useState('');
  const [speedData, setSpeedData] = useState('');
  const [engineTemperatureData, setEngineTemperatureData] = useState('');
  const [RPMData, setRPMData] = useState('');
  const [throttlePosition, setThrottlePosition] = useState('');
  const [engineLoad, setEngineLoad] = useState('');
  const [fuelPressure, setFuelPressure] = useState('');
  const LoginScreenNavigation = () => {
    navigation.navigate(LoginScreen); // Replace 'Screen2' with the name of the second screen.
  };
  const DiagnosticsDataScreenNavigation = () => {
    navigation.navigate(DiagnosticsDataScreen);
  };
  const ReportProblemScreen = () => {
    navigation.navigate(ReportProblemScreen);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.dateContainer}>
          <Text>BurgerMenu</Text>

          <TouchableOpacity
            style={styles.basicButton}
            onPress={LoginScreenNavigation}>
            <Text>LoginScreenNavigation</Text>
          </TouchableOpacity>

          <Button
            style={styles.basicButton}
            title={'DiagnosticsDataScreenNavigation'}
            onPress={DiagnosticsDataScreenNavigation}
          />

          <Button title={'ReportProblemScreen'} onPress={ReportProblemScreen} />
        </View>

        <View style={styles.nameContainer}>
          <NameComponent />
          <DateComponent />
        </View>
      </View>
      <View style={styles.wrapper}></View>
      <View style={styles.carInfoContainer}></View>
      <View style={styles.circleDiv}>
        <View style={styles.singleCircleDiv}>
          <Speedometer value={parseInt(speedData, 10)} />
          <View style={{height: 50}}></View>
          <TemperatureMeterComponent
            value={parseInt(engineTemperatureData, 10)}
          />
          <View style={{height: 50}}></View>
          <RPMMeterComponent value={parseInt(RPMData, 10)} />
          <View style={{height: 50}}></View>
        </View>
      </View>
      {/*<View style={styles.runDiagnosticContainer}>*/}
      {/*  <Text style={styles.basicText}>Speed : {speedData} km/h</Text>*/}
      {/*  <Text style={styles.basicText}>RPM : {RPMData}</Text>*/}
      {/*  <Text style={styles.basicText}>*/}
      {/*    Engine temperature : {engineTemperatureData} °C*/}
      {/*  </Text>*/}
      {/*</View>*/}

      {/*<Text style={styles.basicText}>Car VIM : {vinData}</Text>
      <Text style={styles.basicText}>Car Owner :</Text>*/}
      <View style={{height: 10}}></View>
      <View>
        <Text>Throttle position : {throttlePosition} %</Text>
        <Text>Engine load : {engineLoad} % </Text>
        <Text>Fuel pressure : {fuelPressure} kPa</Text>
      </View>
      <DoDiagnosticComponent
        setVinData={setVinData}
        setSpeedData={setSpeedData}
        setEngineTemperatureData={setEngineTemperatureData}
        setRPMData={setRPMData}
        setThrottlePosition={value => {
          if (value !== null && !isNaN(value)) {
            setThrottlePosition(value);
          }
        }} // throttle position nejak cudne ide
        setEngineLoad={value => {
          if (value !== null && !isNaN(value)) {
            setEngineLoad(value);
          }
        }}
        setFuelPressure={setFuelPressure}
      />
      {/*<LocalStorageComponent />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  circleDiv: {
    backgroundColor: '#00FFFF',
  },
  singleCircleDiv: {
    width: '100%',
  },
  mainContainer: {},
  headerContainer: {
    // Add styles for your header container
    flexDirection: 'row', // You can adjust this layout as needed
    paddingHorizontal: 0, // Add padding as needed
    marginTop: 2,
    width: '100%', // Ensure it spans the entire width
    height: '10%',
    backgroundColor: 'red', // Background color for the header
  },
  dateContainer: {
    padding: 10,
    backgroundColor: 'green', // Background color for the header
  },
  nameContainer: {
    padding: 10,
    backgroundColor: 'brown',
    position: 'absolute',
    right: 10,
  },
  carInfoContainer: {
    backgroundColor: 'yellow',
    marginTop: '10%',
  },
  runDiagnosticContainer: {
    backgroundColor: '#f4fff9',
    marginTop: '15%',
    textAlign: 'center',
    fontSize: 15,
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
  basicText: {
    fontSize: 25,
  },
  basicButton: {
    width: '60%',
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10, // Set the width of the button to 30% of its container's width
    // Additional styles for the button
  },
});

export default DiagnosticScreen;
