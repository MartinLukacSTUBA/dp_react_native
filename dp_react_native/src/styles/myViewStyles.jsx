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
    backgroundColor: 'transparent', // Set background color to transparent since the image will cover it
    // backgroundColor: MY_GRAY, // Background color for the header
  },
  centerContainer: {
    justifyContent: 'center',
    paddingTop: '5%',
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
  imageHeader: {
    flex: 2,
    width: '100%',
    height: '100%',
  },
});
