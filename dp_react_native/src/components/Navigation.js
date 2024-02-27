import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDiagnostics from '../screen/MyCarHistoryScreen';
import MyCarHistoryScreen from '../screen/MyCarHistoryScreen';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import {NavigationContainer} from '@react-navigation/native';
import ShiftScreen from '../screen/ShiftScreen';
import CreateAndAssignCarsScreen from '../screen/CreateAndAssignCarsScreen';
import UsersScreen from '../screen/UsersScreen';
import DiagnosticNavigation from './DiagnosticNavigation';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShiftScreen"
          component={ShiftScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DiagnosticScreen"
          component={DiagnosticNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'MyCarHistoryScreen'}
          component={MyCarHistoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'CreateAndAssignCarsScreen'}
          component={CreateAndAssignCarsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'UsersScreen'}
          component={UsersScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={UserDiagnostics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
