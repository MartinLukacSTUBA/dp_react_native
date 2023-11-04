import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import {NavigationContainer} from '@react-navigation/native';
import ShiftScreen from '../screen/ShiftScreen';
import DiagnosticScreen from '../screen/DiagnosticScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*<Stack.Screen*/}
        {/*  name="Try"*/}
        {/*  component={TryScreen}*/}
        {/*  options={{headerShown: false}}*/}
        {/*/>*/}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
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

        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
