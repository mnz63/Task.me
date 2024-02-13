import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import { HomeTabIcon, TaskTabIcon, UserTabIcon } from "../../../assets/icons";
import ProfileScreen from "../../screens/ProfileScreen";
import { useEffect, useState } from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { StatusBar } from "react-native";
import TasksScreen from "../../screens/TasksScreen";

const Tab = createBottomTabNavigator();

export default function PrivateStackTabs() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      const route =
        navigation.getState()?.routes[navigation.getState().index].name;
      if (route === "Profile") {
        StatusBar.setBackgroundColor("#006EE9");
        StatusBar.setBarStyle("light-content");
      } else {
        StatusBar.setBackgroundColor("#FFF");
        StatusBar.setBarStyle("dark-content");
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#006EE9",
        tabBarInactiveTintColor: "#ABCEF5",
        tabBarStyle: {
          height: 70,
        },
      }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeTabIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color }) => <TaskTabIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <UserTabIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
