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
  TextInput,
  TouchableOpacity,
  LogBox,
} from "react-native";

import {
  NavigationContainer,
  validatePathConfig,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { news_data } from "../TestData";
import { useState, useEffect } from "react";

const availableFilters = [
  "волейбол",
  "баскетбол",
  "гребля",
  "плавание",
  "теннис",
  "борьба",
  "бадминтон",
  "настольный теннис",
];

LogBox.ignoreAllLogs();

function NewsScreen({ navigation }) {
  const [filterList, setFilterList] = useState([]);

  //----------- start request block --------------
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      var filter_str = "$";
      for (let i = 0; i < filterList.length; i++) {
        filter_str += filterList[i];
        filter_str += "$";
      }
      const response = await fetch("http://127.0.0.1:5000/news/" + filter_str); // change
      const json = await response.json(); // change to .json()
      setData(json.news); // change
    } catch (error) {
      validateProcess(error);
      console.error(error);
    } finally {
      if (filterList.length !== 0) setTimeout(() => setLoading(false), 500);
      else setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMovies();
  }, [filterList]);

  // ------------ end request block ----------------

  const pressNews = (item) => {
    navigation.navigate("SingleNewsScreen", {
      item: item,
    });
  };

  function pressedFilterOption(item) {
    if (checkIfExists(item)) {
      const newFilterList = filterList.filter((element) => element !== item);
      setFilterList(newFilterList);
    } else {
      const newFilterList = [...filterList, item];
      setFilterList(newFilterList);
    }
    console.log(item);
  }

  function checkIfExists(item) {
    if (filterList.find((elem) => item === elem)) {
      return true;
    } else {
      return false;
    }
  }

  function renderButtons() {
    return availableFilters.map((item) => {
      return (
        <TouchableOpacity key={item} onPress={() => pressedFilterOption(item)}>
          <View
            style={{
              // ...styles.filterButtons,
              borderRadius: 10,
              padding: 4,
              paddingLeft: 8,
              paddingRight: 8,
              marginLeft: 4,
              marginBottom: 4,
              color: "#ffffff",
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: "#109696",
              backgroundColor: checkIfExists(item) ? "#109696" : "transparent",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...styles.filterButtonsText,
                color: checkIfExists(item) ? "white" : "#109696",
                textAlign: "center",
              }}
            >
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  function validateProcess(error) {
    console.log(filterList);
    if (filterList.length === 0) {
      setData(news_data);
      return;
    }
    const new_news_data = news_data.filter((element) => {
      for (let i = 0; i < filterList.length; i++) {
        if (element.tag === filterList[i]) {
          return true;
        }
      }
      return false;
    });
    setData(new_news_data);
    return;
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.page}>
        <ScrollView>
          {/*<View style={styles.titleView}>*/}
          {/*  <Text style={styles.titleText}>Новости</Text>*/}
          {/*</View>*/}
          <View style={styles.filterButtonHolder}>{renderButtons()}</View>
          {isLoading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : (
            data.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => pressNews(item)}>
                  <View style={styles.newsBox}>
                    <Text style={styles.newsText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
          {data.length <= 0 ? (
            <View style={styles.emptyDataView}>
              <Text style={styles.emptyDataText}>
                Нет записей, выберите фильтры
              </Text>
            </View>
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    // marginTop: 50,
    flex: 1,
    backgroundColor: "white",
  },
  titleView: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  newsBox: {
    marginHorizontal: 10,
    // width: "100%",
    height: 150,
    marginTop: 10,
    padding: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
  },
  newsText: {
    padding: 10,
    fontSize: 16,
  },
  filterButtons: {
    height: 30,
    padding: 2,
    borderColor: "black",
    margin: 5,
    //borderRadius: 1,
    borderWidth: 1,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    // backgroundColor: checkIfExists(item) ? "#0384fc" : "#75aeeb",
    // !! the backgroundColor parameter is defined directly in code
  },
  filterButtonsText: {
    color: "black",
    fontSize: 16,
  },
  filterButtonHolder: {
    margin: 15,
    // borderWidth: 1,
    // width: "100%",
    // height: 100,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  activityIndicator: {
    marginTop: 150,
  },
  emptyDataView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyDataText: {
    fontSize: 16,
  },
});

export default NewsScreen;
