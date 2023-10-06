import React from 'react';
import Navigation from './src/components/Navigation';

import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Login"
  //         component={LoginScreen}
  //         options={{headerShown: false}}
  //       />
  //       <Stack.Screen
  //         name="Register"
  //         component={RegisterScreen}
  //         options={{headerShown: false}}
  //       />
  //
  //       <Stack.Screen name="Home" component={HomeScreen} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
  return (
    // <NavigationContainer>
    <AuthProvider>
      <Navigation />
    </AuthProvider>

    // </NavigationContainer>
  );
};

export default App;
