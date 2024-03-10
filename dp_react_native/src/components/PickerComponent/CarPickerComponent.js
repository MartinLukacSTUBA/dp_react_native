import React, {useState} from 'react';
import {View} from 'react-native';

import {myViewStyles} from '../../styles/myViewStyles';
import {Picker} from 'native-base';

const CarPickerComponent = ({carsData, onSelectCar}) => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarChange = carId => {
    setSelectedCar(carId);
    onSelectCar(carId); // Call onSelectCar with the selected car ID
  };

  return (
    <View style={myViewStyles.mainContainer}>
      <Picker
        selectedValue={selectedCar}
        onValueChange={itemValue => handleCarChange(itemValue)}>
        <Picker.Item label="Select a car" value={null} />
        {carsData.map(car => (
          <Picker.Item key={car.id} label={car.name} value={car.id} />
        ))}
      </Picker>
    </View>
  );
};

export default CarPickerComponent;
