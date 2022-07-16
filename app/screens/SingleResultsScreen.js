import React, { useState } from "react";
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import keyboard from "react-native-web/dist/exports/Keyboard";
import { Keyboard } from "react-native";
import { SearchBar } from "react-native-screens";
import SearchableDropDown from "react-native-searchable-dropdown";
import {
  faXmark,
  faMagnifyingGlass,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useHeaderHeight } from "react-native-screens/native-stack";
import useInputScrollHandler from "react-native-use-input-scroll-handler";
import { LogBox } from "react-native";
import { actions, participantList, store, useStore } from "./TestGlobals";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

function SingleResultsScreen({ route, navigation }) {
  const { item } = route.params;
  console.log(item.results);
  return (
    <ScrollView style={{ paddingLeft: 8, paddingRight: 8 }}>
      <View
        style={{
          ...styles.container,
          paddingLeft: 16,
          paddingRight: 16,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            color: "#109696",
            paddingTop: 16,
            paddingBottom: 16,
          }}
        >
          {item.title}
        </Text>
        <Text style={{ paddingBottom: 16, color: "black", fontSize: 16 }}>
          {item.body}
        </Text>
        {item.results.map((res, index) => {
          return (
            <View key={index} style={{ width: "100%", height: 40, flexDirection: "row" }}>
              <Text style={{paddingBottom: 16, color: "black", fontSize: 16, fontWeight: "bold", color: "#109696",}}>
                {res.rank}
              </Text>
              <Text style={{paddingBottom: 16, color: "black", fontSize: 16, marginLeft: 20}}>
                {res.name}
              </Text>

            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default SingleResultsScreen;
