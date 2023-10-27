import React, {createContext} from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value="register">{children}</AuthContext.Provider>
  );
};
