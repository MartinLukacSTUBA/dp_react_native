import React from 'react';
import {Text} from 'react-native';

const DateTimeComponent = () => {
  const currentDate = new Date();

  // Get the date in 'YYYY-MM-DD' format
  const date = currentDate.toISOString().split('T')[0];

  // Get the time in 'HH:MM:SS' format
  const time = currentDate.toLocaleTimeString();

  return (
    <Text>
      {date} {time}
    </Text>
  );
};

export default DateTimeComponent;
