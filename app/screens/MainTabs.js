import React from "react";

import {
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCirclePlay,
  faClapperboard,
  faPlay,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons";

import NewsScreen from "./NewsScreens/NewsScreen";
import ScheduleScreen from "./ScheduleScreen";
import ParticipateScreen from "./ParticipateScreen";
import ResultsScreen from "./ResultsScreens/ResultsScreen";
import logo from "../assets/logo1.png";
import VideoScreen from "./VideoScreen";

const BottomTab = createBottomTabNavigator();
StatusBar.setBarStyle("light-content", true);

function LogoTitle() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        marginLeft: 16,
        marginBottom: 6,
      }}
    >
      <Image style={{ width: 24, height: 36 }} source={logo} />
      <View style={{ marginLeft: 8 }}>
        <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
          Умный
        </Text>
        <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
          город
        </Text>
      </View>
    </View>
  );
}

function MainTabs({ navigation }) {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "NewsScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "ResultsScreen") {
            iconName = focused ? "ribbon" : "ribbon-outline";
          } else if (route.name === "ScheduleScreen") {
            iconName = focused ? "list-circle" : "list-circle-outline";
          } else if (route.name === "ParticipateScreen") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "VideoScreen") {
            iconName = focused ? "tv" : "tv-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={"#109696"} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <BottomTab.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          headerLeft: (props) => <LogoTitle {...props} />,
          //headerTitle: (props) => <LogoTitle {...props} />,
          title: "Новости",
          headerStyle: { backgroundColor: "#109696" },
          headerTitleStyle: { color: "white" },
        }}
      />
      <BottomTab.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{
          headerLeft: (props) => <LogoTitle {...props} />,
          title: "Расписание",
          headerStyle: { backgroundColor: "#109696" },
          headerTitleStyle: { color: "white" },
        }}
      />
      <BottomTab.Screen
        name={"ParticipateScreen"}
        component={ParticipateScreen}
        options={{
          headerLeft: (props) => <LogoTitle {...props} />,
          //headerTitle: (props) => <LogoTitle {...props} />,
          title: "Участие",
          headerStyle: { backgroundColor: "#109696" },
          headerTitleStyle: { color: "white" },
        }}
      />
      <BottomTab.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        options={{
          headerLeft: (props) => <LogoTitle {...props} />,
          //headerTitle: (props) => <LogoTitle {...props} />,
          title: "Результаты",
          headerStyle: { backgroundColor: "#109696" },
          headerTitleStyle: { color: "white" },
        }}
      />
      <BottomTab.Screen
        name={"VideoScreen"}
        component={VideoScreen}
        options={{
          headerLeft: (props) => <LogoTitle {...props} />,
          //headerTitle: (props) => <LogoTitle {...props} />,
          title: "Трансляции",
          headerStyle: { backgroundColor: "#109696" },
          headerTitleStyle: { color: "white" },
        }}
      />

      {/* <BottomTab.Screen name="NewsScreen">
        {(props) => <NewsScreen {...props} />}
      </BottomTab.Screen>
      <BottomTab.Screen name="ScheduleScreen">
        {(props) => <ScheduleScreen {...props} />}
      </BottomTab.Screen> */}

      {/* <BottomTab.Screen name="ScheduleScreen" component={() => <ScheduleScreen navigator={navigator} />} /> */}
    </BottomTab.Navigator>
  );
}

export default MainTabs;
