import React from "react";

import {
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  SafeAreaView, Image,
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

function SingleNewsScreen({ route, navigation }) {
  const { item } = route.params;
  function goBack() {
    navigation.navigate("NewsScreen");
  }
  return (
    <SafeAreaView>
      <View style={{ width: "100%", height: "100%" }}>
        <ScrollView style={styles.container}>
          <View>
            {/*<TouchableOpacity onPress={() => goBack()}>*/}
            {/*  <View style={styles.topBar}>*/}
            {/*    /!*<Ionicons name={"arrow-back"} size={26} color={"black"} />*!/*/}
            {/*  </View>*/}
            {/*</TouchableOpacity>*/}
            <Image source={{uri: 'https://www.vzsar.ru/i/news/xxl/2020/06/202363_1591260720.jpg'}} style={{
              width: 400,
              height: 300,
            }}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.news}>{item.news}</Text>
            <Text style={styles.tag}>Тег: {item.tag}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 30,
    width: 30,
    margin: 8,
    // backgroundColor: "black"
  },
  container: {
    // padding: 30,
    // margin: 30,
  },
  title: {
    margin: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
  news: {
    margin: 8,
    fontSize: 16,
  },
  tag: {
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SingleNewsScreen;
