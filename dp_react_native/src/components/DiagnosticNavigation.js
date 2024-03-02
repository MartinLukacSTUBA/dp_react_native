import {createDrawerNavigator} from '@react-navigation/drawer';
import MyCarHistoryScreen from '../screen/MyCarHistoryScreen';
import CreateAndAssignCarsScreen from '../screen/CreateAndAssignCarsScreen';
import DiagnosticScreen from '../screen/DiagnosticScreen';
import UsersScreen from '../screen/UsersScreen';

const Drawer = createDrawerNavigator();

function DiagnosticNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen component={DiagnosticScreen} name="Diagnostic" />
      <Drawer.Screen component={UsersScreen} name="Users" />
      <Drawer.Screen component={MyCarHistoryScreen} name="Diagnostic History" />
      <Drawer.Screen component={CreateAndAssignCarsScreen} name="Cars" />
    </Drawer.Navigator>
  );
}

export default DiagnosticNavigation;
