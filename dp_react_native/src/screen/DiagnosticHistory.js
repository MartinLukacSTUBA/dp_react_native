import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';
import LoginScreen from './LoginScreen';
import DiagnosticScreen from './DiagnosticScreen';
import {myViewStyles} from '../styles/myViewStyles';
import {myTextStyles} from '../styles/myTextStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';
import InfoHoverComponentDiagnostic from '../components/CarsComponent/InfoHoverComponentDiagnostic';

const DiagnosticHistory = ({navigation}) => {
  const LoginScreenNavigation = () => {
    navigation.navigate(LoginScreen); // Replace 'Screen2' with the name of the second screen.
  };
  const DiagnosticScreenNavigation = () => {
    navigation.navigate(DiagnosticScreen); // Replace 'Screen1' with the name of the screen you want to navigate to.
  };
  const CreateAndAssignCarsScreen = () => {
    navigation.navigate(CreateAndAssignCarsScreen);
  };

  const [diagnosticHistory, setDiagnosticHistoryData] = useState([]); // State to store fetched cars data

  useEffect(() => {
    return navigation.addListener('focus', () => {
      // Fetch cars data when the screen gains focus (navigated to)
      getDiagnosticHistory();
    });
  }, [navigation]); // Add navigation as a dependency

  const getDiagnosticHistory = async () => {
    const accessToken = await AsyncStorage.getItem('AccessToken');
    console.log(accessToken);
    const url = `${BASE_URL}/api/v1/car-diagnostic`;
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
        setDiagnosticHistoryData(data); // Update state with fetched cars data
        // Check if firstname and lastname properties exist
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  return (
    <View style={myViewStyles.mainContainer}>
      <View style={myViewStyles.headerContainer}>
        <View style={myViewStyles.nameContainer}>
          <NameComponent />
          <DateComponent />
        </View>
      </View>

      <View style={myViewStyles.middleView}>
        <Text style={myTextStyles.bigText}>Diagnostic History </Text>
        <View style={{height: 50}}></View>
        <View style={{height: 50}}></View>
        <View>
          <SafeAreaView>
            <ScrollView style={styles.scrollView}>
              {diagnosticHistory.map(diagnosticHistory => (
                <View key={diagnosticHistory.id} style={styles.rowContainer}>
                  <Text style={styles.idText}>{diagnosticHistory.id}</Text>
                  <Text style={styles.lastname}>
                    {diagnosticHistory.lastname}
                  </Text>
                  {/*<Text style={styles.carName}>*/}
                  {/*  {diagnosticHistory.carName}*/}
                  {/*</Text>*/}
                  <InfoHoverComponentDiagnostic
                    diagnosticHistoryId={diagnosticHistory.id}
                  />
                  <View style={styles.deleteButton}>
                    <Text>D</Text>
                    {/*<DeleteUserComponent*/}
                    {/*  userId={user.id}*/}
                    {/*  onDelete={() => getUsers()}*/}
                    {/*/>*/}
                  </View>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
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
  rowContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  lastnameText: {
    width: '50%',
    textAlign: 'left',
    marginLeft: 30,
  },
  carName: {
    width: '30%',
    textAlign: 'right',
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

export default DiagnosticHistory;
