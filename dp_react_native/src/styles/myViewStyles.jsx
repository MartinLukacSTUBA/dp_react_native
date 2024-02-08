import {StyleSheet} from 'react-native';
import {MY_GRAY, MY_LIGHT_GRAY, MY_PLATINUM_GRAY, MY_WHITE} from '../config';

export const myViewStyles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: MY_WHITE,
  },
  headerContainer: {
    flexDirection: 'row', // You can adjust this layout as needed
    paddingHorizontal: 0, // Add padding as needed
    marginTop: 0,
    width: '100%', // Ensure it spans the entire width
    height: '15%',
    backgroundColor: MY_GRAY, // Background color for the header
  },
  centerContainer: {
    justifyContent: 'center',
    paddingTop: '5%',
  },
  burgerMenuContainer: {
    width: '65%',
    paddingTop: '5%',
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
});
