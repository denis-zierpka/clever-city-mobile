import React from "react";

import { Text, View, Button, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

import NewsScreen from "./NewsScreen";
import ScheduleScreen from "./ScheduleScreen";

const BottomTab = createBottomTabNavigator();




function MainTabs(props)  {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "NewsScreen") {
            iconName = focused ? "home" : "home-outline";
            // iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === "ScheduleScreen") {
            iconName = focused ? "list-circle" : "list-circle-outline";
          } 

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
{/* component={() => <NewsScreen navigator={navigator} />} */}
      <BottomTab.Screen name="NewsScreen"  >
        {props => <NewsScreen {...props}/>}
      </BottomTab.Screen>
      <BottomTab.Screen name="ScheduleScreen"  >
        {props => <ScheduleScreen {...props}/>}
      </BottomTab.Screen>
      {/* <BottomTab.Screen name="ScheduleScreen" component={() => <ScheduleScreen navigator={navigator} />} /> */}

    </BottomTab.Navigator>
  );
}

export default MainTabs;



