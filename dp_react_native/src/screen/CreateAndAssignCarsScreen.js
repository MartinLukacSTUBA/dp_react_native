import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import LoginScreen from './LoginScreen';
import DiagnosticScreen from './DiagnosticScreen';
import {myViewStyles} from '../styles/myViewStyles';
import {myTextStyles} from '../styles/myTextStyles';
import CreateCarComponent from '../components/CarsComponent/CreateCarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, MY_LIGHT_GRAY} from '../config';
import DeleteCarComponent from '../components/CarsComponent/DeleteCarComponent';
import InfoHoverComponentCar from '../components/CarsComponent/InfoHoverComponentCar';
import EditCarComponent from '../components/CarsComponent/EditCarComponent';
import AssignCarToMeComponent from '../components/CarsComponent/AssignCarToMeComponent';

/**
 * Represents a Car object received from the backend.
 * @typedef {Object} Car
 * @property {number} id - The ID of the car.
 * @property {string} name - The name of the car.
 * @property {string} vehicleNumberPlate - The vehicle number plate of the car.
 *@property{boolean} owned - owned car or not
 */

const CreateAndAssignCarsScreen = ({navigation}) => {
  const LoginScreenNavigation = () => {
    navigation.navigate(LoginScreen);
  };
  const DiagnosticScreenNavigation = () => {
    navigation.navigate(DiagnosticScreen);
  };
  const DiagnosticHistory = () => {
    navigation.navigate(DiagnosticHistory);
  };

  const UsersScreen = () => {
    navigation.navigate(UsersScreen);
  };

  const [showCreateCar, setShowCreateCar] = useState(false);
  const [carsData, setCarsData] = useState([]);

  const handleToggleCreateCar = () => {
    setShowCreateCar(prevState => !prevState);
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getCars();
    });
  }, [navigation]);

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
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

    fetchUserRole();
  }, []);
  const getCars = async () => {
    const accessToken = await AsyncStorage.getItem('AccessToken');
    console.log(accessToken);
    const url = `${BASE_URL}/api/v1/car/all-basic-info`;
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
        return res.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setCarsData(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  return (
    <View style={myViewStyles.mainContainer}>
      <View style={myViewStyles.headerContainer}>
        <View style={myViewStyles.leftView}>
          <Image
            source={require('../images/carCarsHeader.png')}
            style={myViewStyles.imageHeader}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={myViewStyles.middleView}>
        <View style={styles.rowContainer}>
          <Text style={myTextStyles.bigText}>List of all cars </Text>
          {userRole === 'ADMIN' && (
            <TouchableOpacity onPress={handleToggleCreateCar}>
              <Text style={myTextStyles.bigText}>
                {showCreateCar ? '-' : '+'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {showCreateCar && <CreateCarComponent />}

        <View style={{height: 25}}></View>
        <View>
          <SafeAreaView>
            <ScrollView style={styles.scrollView}>
              {carsData.map(car => (
                <View
                  key={car.id}
                  style={
                    car.owned ? styles.rowContainerOwned : styles.rowContainer
                  }>
                  <Text style={styles.idText}>{car.id}</Text>
                  <Text style={styles.carNameText}>{car.name}</Text>
                  <Text style={styles.assignToMeIcon}>
                    <AssignCarToMeComponent
                      carId={car.id}
                      onAssign={() => getCars()}
                    />
                  </Text>

                  <InfoHoverComponentCar carId={car.id} />
                  {userRole === 'ADMIN' && (
                    <EditCarComponent carId={car.id} onEdit={() => getCars()} />
                  )}
                  <View style={styles.deleteButton}>
                    {userRole === 'ADMIN' && (
                      <DeleteCarComponent
                        carId={car.id}
                        onDelete={() => getCars()}
                      />
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
        <View style={{height: 50}}></View>
        <View style={{height: 50}}></View>
      </View>
      <View style={myViewStyles.centerContainer}></View>
      <View style={myViewStyles.centerContainer}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  rowContainerOwned: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: MY_LIGHT_GRAY,
  },
  idText: {
    width: '10%',
    textAlign: 'center',
  },
  carNameText: {
    width: '40%',
    textAlign: 'left',
  },
  assignToMeIcon: {
    width: '20%',
    textAlign: 'center',
  },
  otherFieldsText: {
    flex: 1,
    textAlign: 'left',
  },
  scrollView: {
    height: 500,
  },
});

export default CreateAndAssignCarsScreen;
