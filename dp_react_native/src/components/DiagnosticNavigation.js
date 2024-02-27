import {createDrawerNavigator} from '@react-navigation/drawer';
import MyCarHistoryScreen from '../screen/MyCarHistoryScreen';
import CreateAndAssignCarsScreen from '../screen/CreateAndAssignCarsScreen';

const Drawer = createDrawerNavigator();

function DiagnosticNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MyCarHistoryScreen" component={MyCarHistoryScreen} />
      <Drawer.Screen
        component={CreateAndAssignCarsScreen}
        name="CreateAndAssignCarsScreen"
      />
    </Drawer.Navigator>
  );
}

export default DiagnosticNavigation;
