import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';
import MultiSelectDropdown from '../components/SelectComponent';
import MultiSelectExample from '../components/SelectComponent';
import MySelectOption from '../components/SelectComponent';
import Select from 'react-select';
import SelectComponent from '../components/SelectComponent';
import DateTimeComponent from '../components/DateTimeComponent';

const PlanningScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.dateContainer}></View>
        <View style={styles.nameContainer}>
          <NameComponent />
          <DateComponent />
        </View>
      </View>
      <View style={styles.wrapper}></View>
      <View style={styles.carInfoContainer}>
        <Text>Choose vehicle : dropdown box moznost vybrat jeden</Text>
        <Text>Vehicle</Text>
        <Text>Vehicle</Text>
        <Text>Vehicle</Text>
        <Text></Text>
        <Text></Text>
        <Text>Choose Pracovisko : dropdown box moznost vybrat jeden</Text>
        <Text>Pracovisko </Text>
        <Text>Pracovisko</Text>
        <Text>Pracovisko</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <View style={styles.center}>
          <DateTimeComponent />
        </View>
        <Button width="30%" title={'Start Shift'}></Button>
        <Text> Start shift zabezpeci citanie dat z auta a zapnutie sichty</Text>
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
  center: {
    backgroundColor: 'lightblue', // Example background color
    padding: 10, // Add padding to the center box
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

export default PlanningScreen;
