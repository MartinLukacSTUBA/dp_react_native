import React from 'react';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';
import {AppState, View, StyleSheet, Text} from 'react-native';

// const App = () => {
//   return (
//     // <NavigationContainer>
//     <AuthProvider>
//       <Navigation />
//     </AuthProvider>
//
//     // </NavigationContainer>
//   );
// };
//
// export default App;
//////////////////////////////////////////////
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>ASSSSS</Text>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//////////////////////////////////

import {createAppContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App'; // Import your root component here

import {Feather} from '@expo/vector-icons';
import {
  DiagnosticScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ShiftScreen,
} from './index';

const DrawerNavigator = createDrawerNavigator({
  DiagnosticScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ShiftScreen,
});
export default createAppContainer(DrawerNavigator);
