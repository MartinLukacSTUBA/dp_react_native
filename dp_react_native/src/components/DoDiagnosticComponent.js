import {
  readDataFromOBDEngineLoad,
  readDataFromOBDEngineTemperature,
  readDataFromOBDFuelPressure,
  readDataFromOBDRPM,
  readDataFromOBDSpeed,
  readDataFromOBDThrottlePosition,
  readDataFromOBDVIN,
} from '../functions/OBDUtils';
import {Button, View} from 'react-native';

const DoDiagnosticComponent = ({
  setVinData,
  setSpeedData,
  setRPMData,
  setEngineTemperatureData,
  setThrottlePosition,
  setEngineLoad,
  setFuelPressure,
}) => {
  const diagnosticData = async () => {
    try {
      const vin = await readDataFromOBDVIN();
      console.log('diagnosticData VIN Data:', vin);
      setVinData(vin); // Update state in parent component

      const speed = await readDataFromOBDSpeed();
      console.log('diagnosticData Speed Data:', speed);
      if (speed != null) {
        setSpeedData(speed); // Update state in parent component
      }

      const RPM = await readDataFromOBDRPM();
      console.log('diagnosticData RPM Data: ', RPM);
      if (RPM != null) {
        setRPMData(RPM);
      }

      const engineTemperature = await readDataFromOBDEngineTemperature();
      console.log('diagnosticData Engine temperature Data:', engineTemperature);
      if (engineTemperature != null) {
        setEngineTemperatureData(engineTemperature);
      }

      const throttlePosition = await readDataFromOBDThrottlePosition();
      console.log('diagnosticData Throttle position Data : ', throttlePosition);

      // Check if throttlePosition is not null and not NaN
      if (throttlePosition !== null && !isNaN(throttlePosition)) {
        setThrottlePosition(throttlePosition);
      } else {
        console.warn('Invalid throttle position data received COMPONENT');
        // Optionally, you can set a default value or handle the error here
      }

      const engineLoad = await readDataFromOBDEngineLoad();
      console.log('diagnosticData Engine load Data:', engineLoad);
      if (engineLoad != null || !isNaN(engineLoad)) {
        setEngineLoad(engineLoad);
      }

      const fuelPressure = await readDataFromOBDFuelPressure();
      console.log('diagnosticData Fuel pressure Data : ', fuelPressure);

      // Check if fuelPressure is not null and not NaN
      if (fuelPressure !== null && !isNaN(fuelPressure)) {
        setFuelPressure(fuelPressure);
      } else {
        console.warn('Invalid fuelPressure  data received COMPONENT');
        // Optionally, you can set a default value or handle the error here
      }
    } catch (error) {
      console.error('Error fetching diagnostic data:', error);
    }
  };

  return (
    <View>
      <Button title="DO DIAGNOSTIC" onPress={diagnosticData} />
    </View>
  );
};

export default DoDiagnosticComponent;
