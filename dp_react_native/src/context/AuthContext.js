import React, {createContext} from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value="register">{children}</AuthContext.Provider>
  );
};

// // Define the value object that includes the register function
// const contextValue = {
//   register,
// };
//
// return (
//   <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
// );
