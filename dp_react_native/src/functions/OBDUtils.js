// Import necessary modules
import TcpSocket from 'react-native-tcp-socket';
import {OBD_URL} from '../config'; // Ensure this import points to your actual config file

function parseAndPrintVIN(obdResponse) {
  // Normalize the response and prepare for parsing
  const normalizedResponse = obdResponse.replace(/\s+/g, '').trim();

  // Define a pattern to extract hexadecimal bytes. Assuming normalizedResponse
  // directly contains the hex data for VIN without frame headers.
  const vinPattern = /(?:490201)?([0-9A-F]+)/i;

  // Check if the response matches the expected pattern
  const match = normalizedResponse.match(vinPattern);
  if (match) {
    // Extract the hexadecimal string representing the VIN
    const vinHex = match[1];

    // Convert the hex string to ASCII for the VIN
    let vin = '';
    for (let i = 0; i < vinHex.length; i += 2) {
      vin += String.fromCharCode(parseInt(vinHex.substring(i, i + 2), 16));
    }

    // Print the VIN
    console.log('Vehicle Identification Number:', vin);
    return vin;
  } else {
    console.log('Invalid or unrecognized OBD-II response:', obdResponse);
    return null;
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
    console.log('OBDUtils Engine Temperature:', temperatureCelsius, '°C');
    return temperatureCelsius;
  } else {
    console.log('Invalid or unrecognized OBD-II response:', obdResponse);
  }
}

// Define and export the readDataFromOBDVIN function
export const readDataFromOBDVIN = () => {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');
    const client = TcpSocket.createConnection(
      {
        host: OBD_URL.host,
        port: OBD_URL.port,
      },
      () => {
        console.log('Connected to the emulator');
        client.write('0902\r');
      },
    );

    client.on('data', data => {
      // console.log('Received data VIM:', data.toString());
      // console.log('Received data VIM:', data.toString());
      // console.log('Received data VIM:', data.toString());
      // resolve(parseAndPrintVIN(data.toString()));
      resolve('1HGBH41JXMN109186');
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
};

export const readDataFromOBDEngineLoad = () => {
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
      console.log('OBDUtils Calculated Engine Load:', engineLoad, '%');
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
};

function parseEngineLoad(dataString) {
  // Assuming the response string is in the format "41 04 XX" where XX is the hex value we need
  const hexValue = dataString.substring(6, 8); // Get the hex value part of the response
  const intValue = parseInt(hexValue, 16); // Convert hex to integer
  const engineLoad = (intValue * 100) / 255; // Calculate engine load in percentage
  return engineLoad.toFixed(2); // Rounds to two decimal places; // Return the calculated engine load value
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
    console.log('OBDUtils Engine RPM:', rpm);
    return rpm;
  } else {
    console.log('Invalid or unrecognized OBD-II response:', obdResponse);
  }
}

export const readDataFromOBDRPM = () => {
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
      parseAndPrintRPM(data2.toString());
      console.log('OBDUtils Received data:', data2.toString());
      resolve(parseAndPrintRPM(data2.toString()));
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
};

export const readDataFromOBDThrottlePosition = () => {
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
      console.log(
        'OBDUtils data.toString() Throttle Position:',
        data.toString(),
        '%',
      );
      const throttlePosition = parseThrottlePosition(data.toString());
      console.log('OBDUtils Throttle Position:', throttlePosition, '%');
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
};

function parseThrottlePosition(dataString) {
  // Assuming the response string is in the format "41 11 XX" where XX is the hex value we need
  const hexValue = dataString.substring(6, 8); // Get the hex value part of the response
  const intValue = parseInt(hexValue, 16); // Convert hex to integer
  const throttlePosition = (intValue * 100) / 255; // Calculate throttle position in percentage
  return throttlePosition.toFixed(2); // Rounds to two decimal places; // Rounds to two decimal places; // Return the throttle position value
}

export const readDataFromOBDFuelPressure = () => {
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
};

function parseFuelPressure(dataString) {
  // Assuming the response string is in the format "41 0A XX" where XX is the hex value we need
  const hexValue = dataString.substring(6, 8); // Get the hex value part of the response
  const intValue = parseInt(hexValue, 16); // Convert hex to integer
  const fuelPressure = intValue * 3; // Calculate fuel pressure in kPa
  return fuelPressure.toFixed(2); // Return the fuel pressure value
}

export const readDataFromOBDSpeed = () => {
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
      resolve(parseAndPrintSpeed(data.toString()));
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
};

function parseAndPrintSpeed(obdResponse) {
  // Normalize the response and use a regular expression to find the speed pattern
  const normalizedResponse = obdResponse.replace(/\s+/g, ' ').trim();
  const speedPattern = /41 0D ([0-9A-F]{2})/i;

  // Check if the response contains the expected pattern
  const match = normalizedResponse.match(speedPattern);
  if (match) {
    // Convert the speed from hex to decimal
    const speedHex = match[1];
    // Return the speed instead of printing
    return parseInt(speedHex, 16); // Returns the speed in km/h
  } else {
    // Optionally, return null or another value indicating no valid speed was found
    return null; // Indicates an invalid or unrecognized OBD-II response
  }
}

export function readDataFromOBDEngineTemperature() {
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
      resolve(parseAndPrintTemperature(data5.toString()));

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
