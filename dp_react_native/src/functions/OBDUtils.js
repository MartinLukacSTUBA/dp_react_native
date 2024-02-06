// Import necessary modules
import TcpSocket from 'react-native-tcp-socket';
import {OBD_URL} from '../config'; // Ensure this import points to your actual config file

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
    console.log('Engine Temperature:', temperatureCelsius, '°C');
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

export default  readDataFromOBDRPM() {
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
