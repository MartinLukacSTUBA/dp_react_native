import {
  readDataFromOBDSpeed,
  readDataFromOBDVIN,
  readDataFromOBDEngineTemperature,
} from '../functions/OBDUtils';
import {Button, View} from 'react-native';

const DoDiagnosticComponent = ({
  setVinData,
  setSpeedData,
  setRPMData,
  setEngineTemperatureData,
}) => {
  const diagnosticData = async () => {
    try {
      const vin = await readDataFromOBDVIN();
      console.log('VIN Data:', vin);
      setVinData(vin); // Update state in parent component

      const speed = await readDataFromOBDSpeed();
      console.log('Speed Data:', speed);
      if (speed != null) {
        setSpeedData(speed); // Update state in parent component
      }

      const RPM = await readDataFromOBDRPM();
      console.log('RPM Data: ', RPM);
      if (RPM != null) {
        setRPMData(RPM);
      }

      const engineTemperature = await readDataFromOBDEngineTemperature();
      console.log('Engine temperature Data:', engineTemperature);
      if (engineTemperature != null) {
        setEngineTemperatureData(engineTemperature);
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
