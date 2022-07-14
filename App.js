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
import MainTabs from './app/screens/MainTabs';
import SingleNewsScreen from "./app/screens/SingleNewsScreen";
import EventRegistrationScreen from "./app/screens/EventRegistration";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SingleRegistrationScreen from "./app/screens/SingleRegistration";
import PushNotifications from "./app/components/PushNotifications";


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    //PushNotifications();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingleNewsScreen"
          component={SingleNewsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventRegistrationScreen"
          component={EventRegistrationScreen}
          options={{ headerShown: true, title: 'Регистрация на соревнование'}}
        />
        <Stack.Screen
          name="SingleRegistrationScreen"
          component={SingleRegistrationScreen}
          options={{ headerShown: true, title: 'Единоразовая регистрация'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
