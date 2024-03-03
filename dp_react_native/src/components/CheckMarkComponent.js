const React = require('react');
const {Image} = require('react-native');

const CheckmarkComponent = () => (
  <Image
    source={require('../images/checkmarks.png')}
    style={{width: 40, height: 40}}
  />
);

export default CheckmarkComponent;
