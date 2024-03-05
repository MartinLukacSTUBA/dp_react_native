import {StyleSheet} from 'react-native';

export const myButtonStyles = StyleSheet.create({
  basicButton: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  basicSmallButton: {
    width: '60%',
    height: '5%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  bottomButton: {
    position: 'absolute',
    right: '20%',
    left: '20%',
    bottom: '2%',
    width: '60%', // Take full width of the parent
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
});
