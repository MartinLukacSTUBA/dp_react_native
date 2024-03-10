import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DiagnosticHistory from '../screen/DiagnosticHistory';
import CreateAndAssignCarsScreen from '../screen/CreateAndAssignCarsScreen';
import DiagnosticScreen from '../screen/DiagnosticScreen';
import UsersScreen from '../screen/UsersScreen';
import ErrorCodeScreen from '../screen/ErrorCodeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';

const Drawer = createDrawerNavigator();

function DiagnosticNavigation() {
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

  return (
    <Drawer.Navigator>
      <Drawer.Screen component={DiagnosticScreen} name="Diagnostic" />
      <Drawer.Screen component={ErrorCodeScreen} name="Check engine" />
      <Drawer.Screen component={DiagnosticHistory} name="Diagnostic History" />
      <Drawer.Screen component={CreateAndAssignCarsScreen} name="Cars" />
      {userRole === 'ADMIN' && (
        <Drawer.Screen component={UsersScreen} name="Admin - Users" />
      )}
    </Drawer.Navigator>
  );
}

export default DiagnosticNavigation;
