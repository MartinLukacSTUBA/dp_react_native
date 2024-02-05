import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';
import LoginScreen from './LoginScreen';
import DiagnosticsDataScreen from './DiagnosticsDataScreen';
import LocalStorageComponent from '../components/LocalStorageComponent';
import DoDiagnosticComponent from '../components/DoDiagnosticComponent';

const DiagnosticScreen = ({navigation}) => {
  const [vinData, setVinData] = useState('');
  const [speedData, setSpeedData] = useState('');
  const [engineTemperatureData, setEngineTemperatureData] = useState('');

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

          <Button
            title={'LoginScreenNavigation'}
            onPress={LoginScreenNavigation}
          />
          <Button
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

      <View style={styles.runDiagnosticContainer}>
        <Text style={styles.basicText}>Car VIM : {vinData}</Text>
        <Text style={styles.basicText}>Car Owner :</Text>
        <Text style={styles.basicText}>Speed : {speedData} km/h</Text>
        <Text style={styles.basicText}>RPM : </Text>
        <Text style={styles.basicText}>
          Engine temperature : {engineTemperatureData} °C
        </Text>
        <View style={{height: 20}}></View>
        <Text style={styles.basicText}>Last diagnostic : </Text>
        <View style={{height: 40}}></View>

        <DoDiagnosticComponent
          setVinData={setVinData}
          setSpeedData={setSpeedData}
          setEngineTemperatureData={setEngineTemperatureData}
        />
        <LocalStorageComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  headerContainer: {
    // Add styles for your header container
    flexDirection: 'row', // You can adjust this layout as needed
    paddingHorizontal: 0, // Add padding as needed
    marginTop: 2,
    width: '100%', // Ensure it spans the entire width
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
    marginTop: '20%',
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
});

export default DiagnosticScreen;
