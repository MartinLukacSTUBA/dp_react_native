import React from 'react';
import Navigation from './src/components/Navigation';
import 'react-native-gesture-handler';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    // <NavigationContainer>
    <AuthProvider>
      <Navigation />
    </AuthProvider>

    // </NavigationContainer>
  );
};

export default App;
