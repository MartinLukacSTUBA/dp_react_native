import {StyleSheet} from 'react-native';
import {MY_LIGHT_GRAY, MY_PLATINUM_GRAY, WHITE} from '../config';

export const myViewStyles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: WHITE,
  },
  headerContainer: {
    flexDirection: 'row', // You can adjust this layout as needed
    paddingHorizontal: 0, // Add padding as needed
    marginTop: 0,
    width: '100%', // Ensure it spans the entire width
    height: '15%',
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
    backgroundColor: 'transparent', // Set background color to transparent since the image will cover it
    // backgroundColor: MY_GRAY, // Background color for the header
  },
  centerContainer: {
    justifyContent: 'center',
    paddingTop: '0%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: '5%',
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '5%',
  },
  burgerMenuContainer: {
    width: '65%',
    backgroundColor: MY_LIGHT_GRAY, // Background color for the header
  },
  nameContainer: {
    padding: 10,
    backgroundColor: MY_PLATINUM_GRAY,
    position: 'absolute',
    right: 10,
  },
  middleView: {
    width: '100%',
    backgroundColor: 'white',
  },
  middleOfViewCheckmark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  leftView: {
    width: '30%',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  imageHeader: {
    flex: 2,
    width: '100%',
    height: '100%',
  },
});
