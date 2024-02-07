import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DateComponent from '../components/DateComponent';
import NameComponent from '../components/NameComponent';
import LoginScreen from './LoginScreen';
import DiagnosticsDataScreen from './DiagnosticsDataScreen';
import Speedometer from '../components/speedometer-utils/SpeedometerComponent';
import TemperatureMeterComponent from '../components/speedometer-utils/TemperatureMeterComponent';
import RPMMeterComponent from '../components/speedometer-utils/RPMMeterComponent';
import TableThrottleEngineLoadFuelPressure from '../components/TableComponent/TableThrottleEngineLoadFuelPressure';
import {myViewStyles} from '../styles/myViewStyles';
import {myButtonStyles} from '../styles/myButtonStyles';
import {myTextStyles} from '../styles/myTextStyles';
import DoDiagnosticComponent from '../components/DoDiagnosticComponent';

const DiagnosticScreen = ({navigation}) => {
  const [vinData, setVinData] = useState('');
  const [speedData, setSpeedData] = useState('');
  const [engineTemperatureData, setEngineTemperatureData] = useState('');
  const [RPMData, setRPMData] = useState('');
  const [throttlePosition, setThrottlePosition] = useState('');
  const [engineLoad, setEngineLoad] = useState('');
  const [fuelPressure, setFuelPressure] = useState('');
  const LoginScreenNavigation = () => {
    navigation.navigate(LoginScreen); // Replace 'Screen2' with the name of the second screen.
  };
  const DiagnosticsDataScreenNavigation = () => {
    navigation.navigate(DiagnosticsDataScreen);
  };
  const ReportProblemScreen = () => {
    navigation.navigate(ReportProblemScreen);
  };

  return (
    <View style={myViewStyles.mainContainer}>
      <View style={myViewStyles.headerContainer}>
        <View style={myViewStyles.burgerMenuContainer}>
          <TouchableOpacity
            style={myButtonStyles.basicButton}
            onPress={LoginScreenNavigation}>
            <Text style={myTextStyles.basicText}>LoginScreenNavigation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={myButtonStyles.basicButton}
            onPress={DiagnosticsDataScreenNavigation}>
            <Text style={myTextStyles.basicText}>
              DiagnosticsDataScreenNavigation
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={myButtonStyles.basicButton}
            onPress={ReportProblemScreen}>
            <Text style={myTextStyles.basicText}>ReportProblemScreen</Text>
          </TouchableOpacity>
        </View>

        <View style={myViewStyles.nameContainer}>
          <NameComponent />
          <DateComponent />
        </View>
      </View>

      <View style={myViewStyles.circleMeters}>
        <Speedometer value={parseInt(speedData, 10)} />
        <View style={{height: 50}}></View>
        <TemperatureMeterComponent
          value={parseInt(engineTemperatureData, 10)}
        />
        <View style={{height: 50}}></View>
        <RPMMeterComponent value={parseInt(RPMData, 10)} />
        <View style={{height: 50}}></View>
      </View>

      <View style={myViewStyles.centerContainer}>
        <TableThrottleEngineLoadFuelPressure
          throttlePosition={throttlePosition}
          engineLoad={engineLoad}
          fuelPressure={fuelPressure}
        />
      </View>

      <View style={myViewStyles.centerContainer}>
        <DoDiagnosticComponent
          setVinData={setVinData}
          setSpeedData={setSpeedData}
          setEngineTemperatureData={setEngineTemperatureData}
          setRPMData={setRPMData}
          setThrottlePosition={value => {
            if (value !== null && !isNaN(value)) {
              setThrottlePosition(value);
            }
          }} // throttle position nejak cudne ide
          setEngineLoad={value => {
            if (value !== null && !isNaN(value)) {
              setEngineLoad(value);
            }
          }}
          setFuelPressure={setFuelPressure}
        />
      </View>
      {/*<LocalStorageComponent />*/}
    </View>
  );
};
export default DiagnosticScreen;
