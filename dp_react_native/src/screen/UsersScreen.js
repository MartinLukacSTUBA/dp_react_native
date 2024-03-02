import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';
import LoginScreen from './LoginScreen';
import DiagnosticScreen from './DiagnosticScreen';
import {myViewStyles} from '../styles/myViewStyles';
import {myTextStyles} from '../styles/myTextStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';
import InfoHoverComponentUser from '../components/UserComponent/InfoHoverComponentUser';
import DeleteUserComponent from '../components/UserComponent/DeleteUserComponent';
import CreateUserComponent from '../components/UserComponent/CreateUserComponent';

/**
 * Represents a Car object received from the backend.
 * @typedef {Object} User
 * @property {number} id - The ID of the user.
 * @property {string} lastname - The name of the user.
 * @property {string} drivingLicense - The vehicle number plate of the user.
 */

const UsersScreen = ({navigation}) => {
  const LoginScreenNavigation = () => {
    navigation.navigate(LoginScreen); // Replace 'Screen2' with the name of the second screen.
  };
  const DiagnosticScreenNavigation = () => {
    navigation.navigate(DiagnosticScreen); // Replace 'Screen1' with the name of the screen you want to navigate to.
  };
  const MyCarHistoryScreen = () => {
    navigation.navigate(MyCarHistoryScreen);
  };

  const CreateAndAssignCarsScreen = () => {
    navigation.navigate(CreateAndAssignCarsScreen);
  };

  const [showCreateUser, setShowCreateUser] = useState(false);
  const [userData, setUserData] = useState([]); // State to store fetched cars data

  const handleToggleCreateUser = () => {
    setShowCreateUser(prevState => !prevState); // Toggle the state value
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      // Fetch cars data when the screen gains focus (navigated to)
      getUsers();
    });
  }, [navigation]); // Add navigation as a dependency

  const getUsers = async () => {
    const accessToken = await AsyncStorage.getItem('AccessToken');
    console.log(accessToken);
    const url = `${BASE_URL}/api/v1/user/all-basic-info`;
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
        setUserData(data); // Update state with fetched cars data
        // Check if firstname and lastname properties exist
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
            source={require('../images/usersBackgroundHeader.png')}
            style={myViewStyles.imageHeader}
            resizeMode="cover"
          />
        </View>

        <View style={myViewStyles.nameContainer}>
          <NameComponent />
          <DateComponent />
        </View>
      </View>

      <View style={myViewStyles.middleView}>
        <View style={styles.rowContainer}>
          <Text style={myTextStyles.bigText}>List of all users </Text>
          <TouchableOpacity onPress={handleToggleCreateUser}>
            <Text style={myTextStyles.bigText}>
              {showCreateUser ? '-' : '+'}
            </Text>
          </TouchableOpacity>
        </View>

        {showCreateUser && <CreateUserComponent />}

        <View style={{height: 25}}></View>
        <View>
          <Text>List of all users:</Text>
          <SafeAreaView>
            <ScrollView style={styles.scrollView}>
              {userData.map(user => (
                <View key={user.id}>
                  <View style={styles.rowContainer}>
                    <Text>{user.id}</Text>
                    <Text>{user.lastname}</Text>
                    <Text>{user.drivingLicense}</Text>
                    <InfoHoverComponentUser userId={user.id} />
                    <Text>{user.id}</Text>
                    <DeleteUserComponent
                      userId={user.id}
                      onDelete={() => getUsers()}
                    />
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
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Center children vertically
    justifyContent: 'space-between', // Distribute children evenly along the row
    paddingHorizontal: 16, // Add horizontal padding for spacing
    marginBottom: 10, // Add bottom margin for spacing
  },
  label: {
    width: '40%',
    textAlign: 'right',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
  },
  scrollView: {height: 500},
});

export default UsersScreen;


// <View style={myViewStyles.burgerMenuContainer}>
//   <TouchableOpacity
//       style={myButtonStyles.basicButton}
//       onPress={LoginScreenNavigation}>
//     <Text style={myTextStyles.basicText}>LoginScreenNavigation</Text>
//   </TouchableOpacity>
//
//   <TouchableOpacity
//       style={myButtonStyles.basicButton}
//       onPress={DiagnosticScreenNavigation}>
//     <Text style={myTextStyles.basicText}>
//       DiagnosticScreenNavigation
//     </Text>
//   </TouchableOpacity>
//
//   <TouchableOpacity
//       style={myButtonStyles.basicButton}
//       onPress={MyCarHistoryScreen}>
//     <Text style={myTextStyles.basicText}>MyCarHistoryScreen</Text>
//   </TouchableOpacity>
//
//   <TouchableOpacity
//       style={myButtonStyles.basicButton}
//       onPress={CreateAndAssignCarsScreen}>
//     <Text style={myTextStyles.basicText}>
//       CreateAndAssignCarsScreen
//     </Text>
//   </TouchableOpacity>
// </View>
