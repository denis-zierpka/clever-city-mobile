import React from "react";

import {
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
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
import MainTabs from "./app/screens/MainTabs";
import SingleNewsScreen from "./app/screens/NewsScreens/SingleNewsScreen";
import EventRegistrationScreen from "./app/screens/EventRegistration";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SingleRegistrationScreen from "./app/screens/SingleRegistration";
import PushNotifications from "./app/components/PushNotifications";
import { getCredentials, setCredentials } from "./app/api";

const Stack = createNativeStackNavigator();

export default function App() {
  const [data, setData] = useState();

  const myFunction = async () => {
    // await setCredentials("by", "my");
    const asas = await getCredentials();
    if (asas !== null) {
      setData(asas);
      console.log(asas.login);
      console.log(asas.password);
    } else {
      setData({});
      console.log("No credentials");
    }
  };

  useEffect(() => {
    myFunction();

    //PushNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        {/* Моё тут */}
        <Stack.Screen
          name="SingleNewsScreen"
          component={SingleNewsScreen}
          options={{ headerShown: false, title: 'Новости' }}
        />
        <Stack.Screen
          name="EventRegistrationScreen"
          component={EventRegistrationScreen}
          options={{ headerShown: true, title: "Регистрация на соревнование" }}
        />
        <Stack.Screen
          name="SingleRegistrationScreen"
          component={SingleRegistrationScreen}
          options={{ headerShown: true, title: "Единоразовая регистрация" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
