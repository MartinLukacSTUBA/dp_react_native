import React from 'react';
import {Text, View} from 'react-native';

const DateComponent = () => {
  const currentDate = new Date();

  // Get the day (1-31)
  const day = currentDate.getDate();

  // Get the month (0-11, so add 1 to get 1-12)
  const month = currentDate.getMonth() + 1;

  // Get the year (4-digit year)
  const year = currentDate.getFullYear();

  // Create a formatted date string
  const formattedDate = `${day} ${month} ${year}`;

  return (
    <View>
      <Text>{formattedDate}</Text>
    </View>
  );
};

export default DateComponent;
