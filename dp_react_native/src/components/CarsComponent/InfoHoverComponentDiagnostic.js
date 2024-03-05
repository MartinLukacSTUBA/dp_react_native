import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../config';

const InfoHoverComponentDiagnostic = ({diagnosticHistoryId}) => {
  const [responseData, setResponseData] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchDiagnosticHistory = async diagnosticHistoryId => {
    try {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      const url = `${BASE_URL}/api/v1/car-diagnostic/${diagnosticHistoryId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      return mapResponseToObject(data);
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const mapResponseToObject = responseData => {
    if (!responseData) {
      throw new Error('Response data is null or undefined');
    }
    return {
      lastname: responseData.lastname,
      averageSpeed: responseData.averageSpeed,
      averageRpm: responseData.averageRpm,
      averageEngineTemperature: responseData.averageEngineTemperature,
      averageThrottlePosition: responseData.averageThrottlePosition,
      averageEngineLoad: responseData.averageEngineLoad,
      averageFuelPressure: responseData.averageFuelPressure,
      startAddress: responseData.startAddress,
      endAddress: responseData.endAddress,
      startLatitude: responseData.startLatitude,
      startLongitude: responseData.startLongitude,
      endLatitude: responseData.endLatitude,
      endLongitude: responseData.endLongitude,
    };
  };

  const handleClick = async () => {
    try {
      setIsViewOpen(prevState => !prevState);
      const data = await fetchDiagnosticHistory(diagnosticHistoryId);
      setIsModalVisible(true);
      setResponseData(data);
    } catch (error) {
      // Handle error gracefully, e.g., display an error message
      console.error('Handle error:', error);
    }
  };

  const handleClose = () => {
    // Close the modal
    setIsViewOpen(false);
    setIsModalVisible(false);
    setResponseData(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
        <View>
          <Image
            style={styles.tinyJpg}
            source={require('../images/informations.png')}
          />
        </View>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.modalContainer}>
            {responseData && (
              <View style={styles.responseContainer}>
                <Text style={styles.responseText}>Car Diagnostic:</Text>
                {/*<MapView*/}
                {/*  style={styles.map}*/}
                {/*  initialRegion={{*/}
                {/*    latitude: parseFloat(responseData.startLatitude),*/}
                {/*    longitude: parseFloat(responseData.startLongitude),*/}
                {/*    latitudeDelta: 0.0922,*/}
                {/*    longitudeDelta: 0.0421,*/}
                {/*  }}>*/}
                {/*  <Marker*/}
                {/*    coordinate={{*/}
                {/*      latitude: parseFloat(responseData.startLatitude),*/}
                {/*      longitude: parseFloat(responseData.startLongitude),*/}
                {/*    }}*/}
                {/*    title="Start Point"*/}
                {/*    description="This is the start point"*/}
                {/*  />*/}
                {/*  <Marker*/}
                {/*    coordinate={{*/}
                {/*      latitude: parseFloat(responseData.endLatitude),*/}
                {/*      longitude: parseFloat(responseData.endLongitude),*/}
                {/*    }}*/}
                {/*    title="End Point"*/}
                {/*    description="This is the end point"*/}
                {/*  />*/}
                {/*</MapView>TODO UNCOMMENT WHEN NEEDED*/}
                <View style={styles.map}></View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Average speed:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.averageSpeed}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Engine temperature:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.averageEngineTemperature}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>Start address:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.startAddress}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellLabel}>End address:</Text>
                  <Text style={styles.tableCellValue}>
                    {responseData.endAddress}
                  </Text>
                </View>
              </View>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
  tinyJpg: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 16,
  },
  responseContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    borderRadius: 5,
  },
  additionalInfoText: {
    fontSize: 16,
  },

  responseText: {
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  tableCellLabel: {
    fontWeight: 'bold',
  },

  tableCellValue: {
    flex: 1,
    marginLeft: 10,
  },
  map: {
    height: 400,
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'red',
  },
});

export default InfoHoverComponentDiagnostic;
