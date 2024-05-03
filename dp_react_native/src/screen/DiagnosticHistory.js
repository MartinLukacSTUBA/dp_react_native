import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import LoginScreen from './LoginScreen';
import DiagnosticScreen from './DiagnosticScreen';
import {myViewStyles} from '../styles/myViewStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';
import InfoHoverComponentDiagnostic from '../components/CarsComponent/InfoHoverComponentDiagnostic';
import DeleteCarDiagnosticComponent from '../components/CarsComponent/DeleteCarDiagnosticComponent';

const DiagnosticHistory = ({navigation}) => {
  const LoginScreenNavigation = () => {
    navigation.navigate(LoginScreen);
  };
  const DiagnosticScreenNavigation = () => {
    navigation.navigate(DiagnosticScreen);
  };
  const CreateAndAssignCarsScreen = () => {
    navigation.navigate(CreateAndAssignCarsScreen);
  };

  const [diagnosticHistory, setDiagnosticHistoryData] = useState([]);
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    return navigation.addListener('focus', () => {
      getDiagnosticHistory();
      const fetchUserRole = async () => {
        try {
          const accessToken = await AsyncStorage.getItem('AccessToken');
          const response = await fetch(`${BASE_URL}/api/v1/user/role/logged`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (response.ok) {
            const role = await response.json();
            console.log(role);
            setUserRole(role);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      };
    });
  }, [navigation]);

  const getDiagnosticHistory = async () => {
    const accessToken = await AsyncStorage.getItem('AccessToken');
    console.log(accessToken);
    const url = `${BASE_URL}/api/v1/car-diagnostic/logged-user`;
    const curlCommand = `curl -X GET "${url}" -H "Authorization: Bearer ${accessToken}"`;
    console.log(curlCommand);
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
        console.log('Data received:', data);
        setDiagnosticHistoryData(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  return (
    <View style={myViewStyles.mainContainer}>
      <View style={myViewStyles.middleView}>
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
                  <Text style={styles.carName}>
                    {diagnosticHistory.carName}
                  </Text>
                  <View style={styles.carInfoContainer}>
                    <Text>
                      <InfoHoverComponentDiagnostic
                        diagnosticHistoryId={diagnosticHistory.id}
                      />
                    </Text>
                  </View>

                  <View style={styles.deleteButton}>
                    {userRole === 'ADMIN' && (
                      <DeleteCarDiagnosticComponent
                        carDiagnostic={diagnosticHistory.id}
                        onDelete={() => getDiagnosticHistory()}
                      />
                    )}
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  idText: {
    width: '10%',
    textAlign: 'center',
  },
  lastname: {
    paddingLeft: '5%',
    width: '30%',
    textAlign: 'left',
  },
  carName: {
    width: '30%',
    textAlign: 'left',
  },
  carInfoContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  deleteButton: {
    marginLeft: 10,
  },
  scrollView: {
    height: 500,
  },
});

export default DiagnosticHistory;
