import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDiagnostics from '../screen/DiagnosticsDataScreen';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import {NavigationContainer} from '@react-navigation/native';
import ShiftScreen from '../screen/ShiftScreen';
import DiagnosticScreen from '../screen/DiagnosticScreen';
import DiagnosticsDataScreen from '../screen/DiagnosticsDataScreen';
import ReportProblemScreen from '../screen/ReportProblemScreen';

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
          component={DiagnosticScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'DiagnosticsDataScreen'}
          component={DiagnosticsDataScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'ReportProblemScreen'}
          component={ReportProblemScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={UserDiagnostics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
