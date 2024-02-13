import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import PrivateStackTabs from "./Private/Private";
import EditProfileScreen from "../screens/EditProfileScreen";
import TaskDetailScreen from "../screens/TaskDetailsScreen";
import HandleTaskScreen from "../screens/HandleTaskScreen";
import AuthCheck from "../screens/AuthCheck";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarStyle: "dark",
        animation: "fade",
      }}
      initialRouteName="AuthCheck"
    >
      <Stack.Screen name="AuthCheck" component={AuthCheck} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={PrivateStackTabs} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailScreen} />
      <Stack.Screen name="HandleTaskScreen" component={HandleTaskScreen} />
    </Stack.Navigator>
  );
}
