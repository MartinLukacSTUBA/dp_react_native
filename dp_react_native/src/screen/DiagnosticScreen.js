import React, {useState} from 'react';
import {Image, View} from 'react-native';
import LoginScreen from './LoginScreen';
import Speedometer from '../components/speedometer-utils/SpeedometerComponent';
import TemperatureMeterComponent from '../components/speedometer-utils/TemperatureMeterComponent';
import RPMMeterComponent from '../components/speedometer-utils/RPMMeterComponent';
import TableThrottleEngineLoadFuelPressure from '../components/TableComponent/TableThrottleEngineLoadFuelPressure';
import {myViewStyles} from '../styles/myViewStyles';
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
  const MyCarHistoryScreen = () => {
    navigation.navigate(MyCarHistoryScreen);
  };
  const CreateAndAssignCarsScreen = () => {
    navigation.navigate(CreateAndAssignCarsScreen);
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

      <View style={myViewStyles.middleView}>
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
      <View style={myViewStyles.centerContainer}></View>
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
      {/*<LocalStorageComponent />*/}
    </View>
  );
};
export default DiagnosticScreen;

{
  /*  <View style={myViewStyles.burgerMenuContainer}>*/
}
{
  /*    <TouchableOpacity*/
}
{
  /*      style={myButtonStyles.basicButton}*/
}
{
  /*      onPress={LoginScreenNavigation}>*/
}
{
  /*      <Text style={myTextStyles.basicText}>LoginScreenNavigation</Text>*/
}
{
  /*    </TouchableOpacity>*/
}

{
  /*    <TouchableOpacity*/
}
{
  /*      style={myButtonStyles.basicButton}*/
}
{
  /*      onPress={MyCarHistoryScreen}>*/
}
{
  /*      <Text style={myTextStyles.basicText}>MyCarHistoryScreen</Text>*/
}
{
  /*    </TouchableOpacity>*/
}

{
  /*    <TouchableOpacity*/
}
{
  /*      style={myButtonStyles.basicButton}*/
}
{
  /*      onPress={CreateAndAssignCarsScreen}>*/
}
{
  /*      <Text style={myTextStyles.basicText}>*/
}
{
  /*        CreateAndAssignCarsScreen*/
}
{
  /*      </Text>*/
}
{
  /*    </TouchableOpacity>*/
}
{
  /*  </View>*/
}
