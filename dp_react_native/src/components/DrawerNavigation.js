import {createDrawerNavigator} from '@react-navigation/drawer';
import ReportProblemScreen from '../screen/ReportProblemScreen';
import LoginScreen from '../screen/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      {/* Configure your drawer screens here */}
      <Drawer.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      {/* Add other screens as needed */}
    </Drawer.Navigator>
  );
};
const NavigationDrawer = () => {
  return <DrawerNavigation />;
};

export default NavigationDrawer;
