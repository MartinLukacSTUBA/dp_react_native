import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {myTextStyles} from '../styles/myTextStyles';
import {myButtonStyles} from '../styles/myButtonStyles';
import {myViewStyles} from '../styles/myViewStyles';
import TcpSocket from 'react-native-tcp-socket';
import {OBD_URL} from '../config';
import CheckmarkComponent from '../components/CheckMarkComponent';

function readDataFromOBDError(setShowCheckmark) {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to the emulator...');

    // Create a TCP connection to the emulator
    const client = TcpSocket.createConnection(
      {
        host: OBD_URL.host,
        port: OBD_URL.port,
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
      const errorCodes = parseAndPrintErrorCodes(data.toString());
      setShowCheckmark(true);
      console.log('asdasdasd');
      // Hide the checkmark after 2 seconds
      setTimeout(() => {
        setShowCheckmark(false);
      }, 2000);

      resolve(errorCodes);
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
    return firstErrorCode, secondErrorCode;
  } else {
    console.log('No error codes found in the OBD-II response.');

    return 'No error codes found in the OBD-II response.';
  }
}

const ErrorCodeScreen = ({navigation}) => {
  const [errorCodeResponse, setErrorCodeResponse] = useState(null);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const handleCheckEnginePress = () => {
    readDataFromOBDError(setShowCheckmark)
      .then(response => {
        setErrorCodeResponse(response);
      })
      .catch(error => {
        console.error('Error reading data from OBD-II:', error);
      });
  };

  return (
    <View style={myViewStyles.mainContainer}>
      <View style={myViewStyles.headerContainer}>
        <Image
          source={require('../images/headerContainer.png')}
          style={myViewStyles.imageHeader}
          resizeMode="cover"
        />
      </View>

      <View style={myViewStyles.middleView}></View>

      <View style={myViewStyles.centerContainer}>
        {/* Render the stored error code response */}
        <Text>Error Code Response: </Text>
        <View style={myViewStyles.textContainer}>
          <Text>{errorCodeResponse}</Text>
        </View>
      </View>

      {showCheckmark && (
        <View style={myViewStyles.middleOfViewCheckmark}>
          <CheckmarkComponent />
        </View>
      )}

      <View style={myButtonStyles.bottomButton}>
        <TouchableOpacity
          style={myButtonStyles.basicButton}
          onPress={handleCheckEnginePress}>
          <Text style={myTextStyles.basicText}>Check engine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ErrorCodeScreen;
