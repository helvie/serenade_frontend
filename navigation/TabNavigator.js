import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MessagesScreen from "../src/screens/MessagesScreen";
import HomeScreen from "../src/screens/HomeScreen";
import MatchesScreen from "../src/screens/MatchesScreen";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "../utils/globalStyles";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const tabBarHeight = Platform.select({
    ios: 80,
    android: 60,
    default: 80,
  });
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let icon;

          if (route.name === "MatchesScreen") {
            icon = (
              <MaterialCommunityIcons
                name="heart-flash"
                size={30}
                color={color}
              />
            );
          }
          if (route.name === "HomeScreen") {
            icon = <Foundation name="home" size={30} color={color} />;
          }
          if (route.name === "MessagesScreen") {
            icon = (
              <Ionicons name="chatbubbles-sharp" size={30} color={color} />
            );
          }

          return icon;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: globalStyles.iconActiveColor,
        tabBarInactiveTintColor: globalStyles.iconInactiveColor,
        headerShown: false,
        tabBarStyle: {
          height: tabBarHeight,
        },
        tabBarOptions: {
          showLabel: false, // Hide the labels of the tabs
        },
      })}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen name="MatchesScreen" component={MatchesScreen} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="MessagesScreen" component={MessagesScreen} />
    </Tab.Navigator>
  );
}
