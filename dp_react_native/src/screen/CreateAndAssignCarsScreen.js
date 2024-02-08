import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';
import LoginScreen from './LoginScreen';
import DiagnosticScreen from './DiagnosticScreen';
import {myViewStyles} from '../styles/myViewStyles';
import {myButtonStyles} from '../styles/myButtonStyles';
import {myTextStyles} from '../styles/myTextStyles';

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
        <Text style={myTextStyles.bigText}>List of all cars </Text>
        {/*<Speedometer value={parseInt(speedData, 10)} />*/}
        <View style={{height: 50}}></View>
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

export default CreateAndAssignCarsScreen;
