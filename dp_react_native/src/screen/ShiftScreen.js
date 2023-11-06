import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';

const ShiftScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.dateContainer}>
          <Text>Place for menu</Text>
        </View>
        <View style={styles.nameContainer}>
          <NameComponent />
          <DateComponent />
        </View>
      </View>
      <View style={styles.wrapper}></View>
      <View style={styles.carInfoContainer}>
        <Text>Car</Text>
        <Text>SPZ</Text>
        <Text>Owner</Text>
        <Text>Last full diagnostic</Text>
        <Text></Text>
        <Text>FuelStatus</Text>
        <Text>Range</Text>
        <Text>Average fuel consumption</Text>
        <Text>Todays fuel consumption</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <Text>UserName</Text>
        <Text>Shift Start</Text>
        <Text>Shift end</Text>
        <Text>Hours for today</Text>
        <Text>Todays travelled distance</Text>
      </View>
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
  userInfoContainer: {
    backgroundColor: '#00ffff',
    marginTop: '40%',
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

export default ShiftScreen;
