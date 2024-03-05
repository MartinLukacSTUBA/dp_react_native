import {createDrawerNavigator} from '@react-navigation/drawer';
import DiagnosticHistory from '../screen/DiagnosticHistory';
import CreateAndAssignCarsScreen from '../screen/CreateAndAssignCarsScreen';
import DiagnosticScreen from '../screen/DiagnosticScreen';
import UsersScreen from '../screen/UsersScreen';
import ErrorCodeScreen from '../screen/ErrorCodeScreen';

const Drawer = createDrawerNavigator();

function DiagnosticNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen component={DiagnosticScreen} name="Diagnostic" />
      <Drawer.Screen component={ErrorCodeScreen} name="Check engine" />
      <Drawer.Screen component={UsersScreen} name="Users" />
      <Drawer.Screen component={DiagnosticHistory} name="Diagnostic History" />
      <Drawer.Screen component={CreateAndAssignCarsScreen} name="Cars" />
    </Drawer.Navigator>
  );
}

export default DiagnosticNavigation;
