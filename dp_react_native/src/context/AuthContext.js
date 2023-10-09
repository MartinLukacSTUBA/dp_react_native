import React, {createContext} from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const register = (firstname, lastname, email, password) => {
    console.log(
      'Register function called with:',
      firstname,
      lastname,
      email,
      password,
    );

    axios
      .post(`${BASE_URL}/auth/register`, {
        firstname,
        lastname,
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
      });
  };

  // // Define the value object that includes the register function
  // const contextValue = {
  //   register,
  // };
  //
  // return (
  //   <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  // );

  return (
    <AuthContext.Provider value={register}>{children}</AuthContext.Provider>
  );
};
