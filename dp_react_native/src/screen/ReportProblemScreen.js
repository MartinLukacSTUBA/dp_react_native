import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';
import LoginScreen from './LoginScreen';
import DiagnosticScreen from './DiagnosticScreen';
import DiagnosticsDataScreen from './DiagnosticsDataScreen';
import OBDDashboard from '../components/OBDDashboard';

const ReportProblemScreen = ({navigation}) => {
  const LoginScreenNavigation = () => {
    navigation.navigate(LoginScreen); // Replace 'Screen2' with the name of the second screen.
  };
  const DiagnosticScreenNavigation = () => {
    navigation.navigate(DiagnosticScreen); // Replace 'Screen1' with the name of the screen you want to navigate to.
  };
  const DiagnosticsDataScreenNavigation = () => {
    navigation.navigate(DiagnosticsDataScreen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.dateContainer}>
          <Text>Report</Text>
          <Button
            title={'LoginScreenNavigation'}
            onPress={LoginScreenNavigation}
          />
          <Button
            title={'DiagnosticScreen'}
            onPress={DiagnosticScreenNavigation}
          />
          <Button
            title={'DiagnosticsDataScreen'}
            onPress={DiagnosticsDataScreenNavigation}
          />
        </View>
        <View style={styles.nameContainer}>
          <NameComponent />
          <DateComponent />
        </View>
      </View>
      <OBDDashboard />
      <View style={styles.wrapper}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  headerContainer: {
    // Add styles for your header container
    flexDirection: 'row', // You can adjust this layout as needed
    paddingHorizontal: 0, // Add padding as needed
    marginTop: 2,
    width: '100%', // Ensure it spans the entire width
    backgroundColor: 'lightblue', // Background color for the header
  },
  dateContainer: {
    padding: 10,
    backgroundColor: 'grey', // Background color for the header
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
  measuredContainer: {
    backgroundColor: '#00ffff',
    marginTop: '40%',
    textAlign: 'center',
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
});

export default ReportProblemScreen;
