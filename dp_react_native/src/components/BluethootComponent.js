import {
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import {BleManager} from 'react-native-ble-plx';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const App = () => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let stopListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('Scan is stopped');
      },
    );
  }, []);

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <SafeAreaView>
      ......
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={startScan}>
        <Text style={styles.buttonTextStyle}>
          {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
