// /**
//  * @format
//  */
//
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import {Screen} from 'react-native-screens';
// import navigation from './src/components/Navigation';
//
import {AppRegistry} from 'react-native';

AppRegistry.registerComponent(App, () => App);

import ScreenNativeComponent from 'react-native-screens/src/fabric/ScreenNativeComponent';

import react from 'react';
import Screen from './src/screen/Screen';
import App from './App';

export const LoginScreen = ({navigation}) => (
  <Screen navigation={navigation} name="LoginScreen" />
);
export const RegisterScreen = ({navigation}) => (
  <Screen navigation={navigation} name="RegisterScreen" />
);
export const DiagnosticScreen = ({navigation}) => (
  <Screen navigation={navigation} name="DiagnosticScreen" />
);

export const ShiftScreen = ({navigation}) => (
  <Screen navigation={navigation} name="ShiftScreen" />
);
export const HomeScreen = ({navigation}) => (
  <Screen navigation={navigation} name="HomeScreen" />
);
