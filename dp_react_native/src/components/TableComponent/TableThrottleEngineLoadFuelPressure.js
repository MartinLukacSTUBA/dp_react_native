import React from 'react';
import {View} from 'react-native';
import {Rows, Table} from 'react-native-table-component';
import {myTextStyles} from '../../styles/myTextStyles';

const TableThrottleEngineLoadFuelPressure = ({
  throttlePosition,
  engineLoad,
  fuelPressure,
}) => {
  const tableData = [
    ['Throttle position', `${throttlePosition} %`],
    ['Engine load', `${engineLoad} %`],
    ['Fuel pressure', `${fuelPressure} kPa`],
  ];

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Table>
        <Rows
          data={tableData}
          textStyle={myTextStyles.basicTextInCenter}
          style={{height: 30, width: 300, backgroundColor: '#ffffff'}} // Adjust width as needed
        />
      </Table>
    </View>
  );
};

export default TableThrottleEngineLoadFuelPressure;
