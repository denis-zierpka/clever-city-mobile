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
import ResultsForYouScreen from "./ResultsForYouScreen";
import ResultsYourScreen from "./ResultsYourScreen";
import ResultsAllScreen from "./ResultsAllScreen";

const TopTab = createMaterialTopTabNavigator();

function ResultsScreen({ navigation }) {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.page}>
        <TopTab.Navigator>
          <TopTab.Screen
            name="ResultsAllScreen"
            component={ResultsAllScreen}
            options={{ title: "Все", headerShown: false }}
          />
          <TopTab.Screen
            name="ResultsYourScreen"
            component={ResultsYourScreen}
            options={{ title: "Ваши", headerShown: false }}
          />
          <TopTab.Screen
            name="ResultsForYouScreen"
            component={ResultsForYouScreen}
            options={{ title: "Для вас", headerShown: false }}
          />

        </TopTab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "white",
  },
});

export default ResultsScreen;
