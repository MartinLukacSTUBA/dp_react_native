import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TcpSocket from 'react-native-tcp-socket';

import {BASE_URL, OBD_URL} from '../config';

export async function getHelloFromBE() {
  const accessToken = await AsyncStorage.getItem('AccessToken');
  const url = `${BASE_URL}/api/v1/user`;
  // Construct the equivalent curl command
  const curlCommand = `curl -X GET "${url}" -H "Authorization: Bearer ${accessToken}"`;
  console.log(curlCommand); // Log the curl command to the console
  console.log();
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP Error! Status: ${res.status}`);
      }
      return res.text();
    })
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

function parseAndPrintSpeed(obdResponse) {
  // Normalize the response and use a regular expression to find the speed pattern
  const normalizedResponse = obdResponse.replace(/\s+/g, ' ').trim();
  const speedPattern = /41 0D ([0-9A-F]{2})/i;

  // Check if the response contains the expected pattern
  const match = normalizedResponse.match(speedPattern);
  if (match) {
    // Convert the speed from hex to decimal
    const speedHex = match[1];
    const speedKmh = parseInt(speedHex, 16);

    // Print the speed
    console.log('Vehicle Speed:', speedKmh, 'km/h');
  } else {
    console.log('Invalid or unrecognized OBD-II response:', obdResponse);
  }
}

function parseAndPrintRPM(obdResponse) {
  // Normalize the response and use a regular expression to find the RPM pattern
  const normalizedResponse = obdResponse.replace(/\s+/g, ' ').trim();
  const rpmPattern = /41 0C ([0-9A-F]{2} [0-9A-F]{2})/i;

  // Check if the response contains the expected pattern
  const match = normalizedResponse.match(rpmPattern);
  if (match) {
    // Extract the two bytes representing RPM
    const rpmBytes = match[1].split(' ');
    const rpmHex = rpmBytes.join(''); // Concatenate the bytes
    const rpm = parseInt(rpmHex, 16);

    // Print the RPM
    console.log('Engine RPM:', rpm);
  } else {
    console.log('Invalid or unrecognized OBD-II response:', obdResponse);
  }
}

function parseAndPrintFuelLevel(obdResponse) {
  // Normalize the response and use a regular expression to find the fuel level pattern
  const normalizedResponse = obdResponse.replace(/\s+/g, ' ').trim();
  const fuelLevelPattern = /41 2F ([0-9A-F]{2})/i;

  // Check if the response contains the expected pattern
  const match = normalizedResponse.match(fuelLevelPattern);
  if (match) {
    // Extract the byte representing fuel level
    const fuelLevelHex = match[1];
    const fuelLevel = parseInt(fuelLevelHex, 16);

    // Convert the hexadecimal value to percentage
    const fuelLevelPercent = (fuelLevel / 255) * 100;

    // Return the fuel level percentage
    return fuelLevelPercent.toFixed(2); // Returns fuel level as a string formatted to two decimal places
  } else {
    return null; // Indicates an invalid or unrecognized OBD-II response
  }
}

function parseAndPrintTemperature(obdResponse) {
  // Normalize the response and use a regular expression to find the temperature pattern
  const normalizedResponse = obdResponse.replace(/\s+/g, ' ').trim();
  const temperaturePattern = /41 05 ([0-9A-F]{2})/i;

  // Check if the response contains the expected pattern
  const match = normalizedResponse.match(temperaturePattern);
  if (match) {
    // Extract the byte representing temperature in Celsius
    const temperatureHex = match[1];
    const temperatureCelsius = parseInt(temperatureHex, 16) - 40; // Convert to Celsius

    // Print the temperature
    console.log('Engine Temperature:', temperatureCelsius, '°C');
  } else {
    console.log('Invalid or unrecognized OBD-II response:', obdResponse);
  }
}

function readDataFromOBDSpeed() {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');

    // Create a TCP connection to the emulator
    const client = TcpSocket.createConnection(
      {
        host: OBD_URL.host, // Corrected hostname without 'tcp://'
        port: OBD_URL.port, // Corrected to the ngrok forwarded port
      },
      () => {
        console.log('Connected to the emulator');

        // Send OBD-II command for vehicle speed
        client.write('010D\r');
      },
    );

    client.on('data', data => {
      console.log('Received data:', data.toString());
      parseAndPrintSpeed(data.toString());
      resolve(data.toString());
      client.destroy(); // Close the connection
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  });
}

function readDataFromOBDRPM() {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');

    // Create a TCP connection to the emulator
    const client = TcpSocket.createConnection(
      {
        host: OBD_URL.host, // Corrected hostname without 'tcp://'
        port: OBD_URL.port, // Corrected to the ngrok forwarded port
      },
      () => {
        console.log('Connected to the emulator');

        // Send OBD-II command for vehicle speed
        client.write('010C\r');
      },
    );

    client.on('data', data2 => {
      console.log('Received data:', data2.toString());
      parseAndPrintRPM(data2.toString());
      resolve(data2.toString());
      client.destroy(); // Close the connection
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  });
}

function readDataFromOBDFuelLevel() {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');

    // Create a TCP connection to the emulator
    const client = TcpSocket.createConnection(
      {
        host: OBD_URL.host, // Corrected hostname without 'tcp://'
        port: OBD_URL.port, // Corrected to the ngrok forwarded port
      },
      () => {
        console.log('Connected to the emulator');

        // Send OBD-II command for fuel level
        client.write('015E\r');
      },
    );

    client.on('data', data3 => {
      const response = data3.toString();
      console.log('Received data:', response);

      // Process the received data for fuel level
      parseAndPrintFuelLevel(response);

      resolve(response);
      client.destroy(); // Close the connection
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  });
}

function readDataFromOBDVIN() {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');

    // Create a TCP connection to the emulator
    const client = TcpSocket.createConnection(
      {
        host: OBD_URL.host, // Corrected hostname without 'tcp://'
        port: OBD_URL.port, // Corrected to the ngrok forwarded port
      },
      () => {
        console.log('Connected to the emulator');

        // Send OBD-II command for vehicle speed
        client.write('0902\r');
      },
    );

    client.on('data', data4 => {
      console.log('Received data:', data4.toString());
      resolve(data4.toString());
      client.destroy(); // Close the connection
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  });
}

function readDataFromOBDThrottlePosition() {
  /* Poloha škrtiacej klapky*/
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');

    // Assuming TcpSocket and OBD_URL are defined elsewhere correctly
    const client = TcpSocket.createConnection(
      {
        host: OBD_URL.host, // Assuming OBD_URL is defined correctly
        port: OBD_URL.port,
      },
      () => {
        console.log('Connected to the emulator');

        // Send OBD-II command for throttle position
        client.write('0111\r'); // PID for throttle position
      },
    );

    client.on('data', data => {
      console.log('Received data:', data.toString());
      // Parse throttle position from the response and resolve the promise
      const throttlePosition = parseThrottlePosition(data.toString());
      console.log('Throttle Position:', throttlePosition, '%');
      resolve(throttlePosition);
      client.destroy(); // Close the connection
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  });
}

function parseThrottlePosition(dataString) {
  // Assuming the response string is in the format "41 11 XX" where XX is the hex value we need
  const hexValue = dataString.substring(6, 8); // Get the hex value part of the response
  const intValue = parseInt(hexValue, 16); // Convert hex to integer
  const throttlePosition = (intValue * 100) / 255; // Calculate throttle position in percentage
  return throttlePosition; // Return the throttle position value
}

function readDataFromOBDFuelPressure() {
  /*Tlak paliva*/
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');

    // Assuming TcpSocket and OBD_URL are defined elsewhere correctly
    const client = TcpSocket.createConnection(
      {
        host: OBD_URL.host, // Assuming OBD_URL is defined correctly
        port: OBD_URL.port,
      },
      () => {
        console.log('Connected to the emulator');

        // Send OBD-II command for fuel pressure
        client.write('010A\r'); // PID for fuel pressure
      },
    );

    client.on('data', data => {
      console.log('Received data:', data.toString());
      // Parse fuel pressure from the response and resolve the promise
      const fuelPressure = parseFuelPressure(data.toString());
      console.log('Fuel Pressure:', fuelPressure, 'kPa');
      resolve(fuelPressure);
      client.destroy(); // Close the connection
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  });
}

function parseFuelPressure(dataString) {
  // Assuming the response string is in the format "41 0A XX" where XX is the hex value we need
  const hexValue = dataString.substring(6, 8); // Get the hex value part of the response
  const intValue = parseInt(hexValue, 16); // Convert hex to integer
  const fuelPressure = intValue * 3; // Calculate fuel pressure in kPa
  return fuelPressure; // Return the fuel pressure value
}

function readDataFromOBDEngineLoad() {
  /*Zatazenie motora*/
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');

    // Assuming TcpSocket and OBD_URL are defined elsewhere correctly
    const client = TcpSocket.createConnection(
      {
        host: OBD_URL.host, // Assuming OBD_URL is defined correctly
        port: OBD_URL.port,
      },
      () => {
        console.log('Connected to the emulator');

        // Send OBD-II command for calculated engine load
        client.write('0104\r'); // PID for calculated engine load
      },
    );

    client.on('data', data => {
      console.log('Received data:', data.toString());
      // Parse calculated engine load from the response and resolve the promise
      const engineLoad = parseEngineLoad(data.toString());
      console.log('Calculated Engine Load:', engineLoad, '%');
      resolve(engineLoad);
      client.destroy(); // Close the connection
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  });
}

function parseEngineLoad(dataString) {
  // Assuming the response string is in the format "41 04 XX" where XX is the hex value we need
  const hexValue = dataString.substring(6, 8); // Get the hex value part of the response
  const intValue = parseInt(hexValue, 16); // Convert hex to integer
  const engineLoad = (intValue * 100) / 255; // Calculate engine load in percentage
  return engineLoad; // Return the calculated engine load value
}

function readDataFromOBDTemp() {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');

    // Create a TCP connection to the emulator
    const client = TcpSocket.createConnection(
      {
        host: OBD_URL.host, // Corrected hostname without 'tcp://'
        port: OBD_URL.port, // Corrected to the ngrok forwarded port
      },
      () => {
        console.log('Connected to the emulator');

        // Send OBD-II command for vehicle speed
        client.write('0105\r');
      },
    );

    client.on('data', data5 => {
      console.log('Received data:', data5.toString());
      resolve(data5.toString());
      parseAndPrintTemperature(data5.toString());
      client.destroy(); // Close the connection
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  });
}

const getTokenFromLogin = (email, password) => {
  const url = `${BASE_URL}/api/v1/auth/authenticate`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenForLogin, setTokenForLogin] = useState('');
  const loginEmployee = () => {
    getTokenFromLogin(email, password)
      .then(response => response.json())
      .then(data => {
        if (data && data.token) {
          const token = data.token;
          console.log('Token:', token);

          // Store the token in local storage
          AsyncStorage.setItem('AccessToken', token)
            .then(() => {
              console.log('Token stored successfully');
              // Now, you can navigate to the next screen or perform other actions.
              navigation.navigate('DiagnosticScreen');
            })
            .catch(error => console.error('Error storing token:', error));
        } else {
          console.error('Token not found in the response');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        navigation.navigate('DiagnosticScreen');
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/*<Button title="Get" onPress={getHelloFromBE} />*/}
        {/*<Button title="ReadButtonVin" onPress={readDataFromOBDVIN} />*/}
        <Button title="ReadButtonSpeed" onPress={readDataFromOBDSpeed} />
        <Button
          title="ReadButtonZatazenieMotora"
          onPress={readDataFromOBDEngineLoad}
        />
        <Button
          title="ReadButtonTlakPaliva"
          onPress={readDataFromOBDFuelPressure}
        />
        <Button
          title="ReadButtonPolohaškrtiacejKlapky"
          onPress={readDataFromOBDThrottlePosition}
        />

        {/*<Button title="ReadButtonRPM" onPress={readDataFromOBDRPM} />*/}
        {/*<Button title="ReadButtonTemperature" onPress={readDataFromOBDTemp} />*/}
        {/*<Button*/}
        {/*  title="ReadButtonFuelLevel"*/}
        {/*  onPress={readDataFromOBDFuelLevel}*/}
        {/*/>*/}
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter Email"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Button title="Login" onPress={loginEmployee} />
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Dont have an account ?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
        <Text>{tokenForLogin}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default LoginScreen;
