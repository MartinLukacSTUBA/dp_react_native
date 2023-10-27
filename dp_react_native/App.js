import React from 'react';
import Navigation from './src/components/Navigation';

import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/AuthContext';
import {BASE_URL} from './src/config';

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
