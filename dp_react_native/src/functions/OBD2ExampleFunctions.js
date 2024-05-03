import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, OBD_URL} from '../config';
import TcpSocket from 'react-native-tcp-socket';

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

const readDataFromOBDRPH = () => {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the OBD2 adapter via WebSocket...');

    // Create a WebSocket connection to the OBD2 adapter
    const socket = new WebSocket(`ws://${OBD_URL.host}:${OBD_URL.port}`);

    socket.onopen = () => {
      console.log('Connected to the OBD2 adapter via WebSocket');

      // Send OBD-II command for revolutions per hour (mode 01, PID 0x0C)
      socket.send('010C\r');
    };

    let responseData = '';

    socket.onmessage = event => {
      console.log('Received data:', event.data);
      responseData += event.data;
    };

    socket.onerror = error => {
      console.error('Connection error:', error);
      reject(error);
    };

    socket.onclose = () => {
      console.log('Connection closed');
      resolve(responseData.trim()); // Resolve the promise with the received data (trimmed)
      socket.close(); // Close the connection
    };

    // Preventing unhandled promise rejection with isTrusted: false
    socket.addEventListener('error', event => {
      console.error('WebSocket error:', event.message);
      reject(new Error('WebSocket error'));
    });
  });
};

const readDataFromOBDSpeed = () => {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the OBD2 adapter via WebSocket...');

    // Create a WebSocket connection to the OBD2 adapter
    const socket = new WebSocket(`ws://${OBD_URL.host}:${OBD_URL.port}`);

    socket.onopen = () => {
      console.log('Connected to the OBD2 adapter via WebSocket');

      // Send OBD-II command for vehicle speed (mode 01, PID 0x0D)
      socket.send('010D\r');
    };

    let responseData = '';

    socket.onmessage = event => {
      console.log('Received data:', event.data);
      responseData += event.data;
    };

    socket.onerror = error => {
      console.error('Connection error:', error);
      reject(error);
    };

    socket.onclose = () => {
      console.log('Connection closed');
      resolve(responseData.trim()); // Resolve the promise with the received data (trimmed)
      socket.close(); // Close the connection
    };
  });
};

function readDataFromOBDSpeedOLD() {
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

    let responseData = '';

    client.on('data', data => {
      console.log('Received data:', data.toString());
      responseData += data.toString();
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
      resolve(responseData); // Resolve the promise with the received data
      client.destroy(); // Close the connection
    });
  });
}

function readDataFromOBDError() {
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

        // Send OBD-II command for error codes retrieval
        client.write('0101\r');
      },
    );

    client.on('data', data => {
      console.log('Received data:', data.toString());
      parseAndPrintErrorCodes(data.toString());
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

function parseAndPrintErrorCodes(obdResponse) {
  // Normalize the response and split it into individual bytes
  const bytes = obdResponse.trim().split(' ');

  // Check if the response contains any error codes
  if (bytes.length >= 4 && bytes[0] === '43') {
    // Extract the error codes (assuming two bytes for error codes)
    const firstErrorCode = parseInt(bytes[1], 16);
    const secondErrorCode = parseInt(bytes[2], 16);

    // Print the error codes
    console.log('Error Codes:');
    console.log('First Error Code:', firstErrorCode);
    console.log('Second Error Code:', secondErrorCode);
  } else {
    console.log('No error codes found in the OBD-II response.');
  }
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
