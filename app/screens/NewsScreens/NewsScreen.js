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
  ImageBackground,
  Image,
} from "react-native";

import {
  NavigationContainer,
  validatePathConfig,
} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {news_data} from "../TestData";
import {useState, useEffect} from "react";

const availableFilters = [
  "бадминтон",
  "баскетбол",
  "волейбол",
  "плавание",
  "шахматы",
  "силовой экстрим",
  "футбол",
  "хоккей",
  "настольный теннис",
];

const filterIcons = {
  бадминтон: "https://cdn-icons-png.flaticon.com/512/2829/2829107.png",
  баскетбол: "https://cdn-icons-png.flaticon.com/512/1584/1584021.png",
  волейбол:
    "https://img2.freepng.ru/20181113/wjf/kisspng-beach-volleyball-vector-graphics-volleyball-net-sp-volleyball-beach-ball-play-svg-png-icon-free-downl-5beb393eef9717.6236570815421422709814.jpg",
  плавание:
    "https://cdn.icon-icons.com/icons2/1364/PNG/512/swimmingman_89145.png",
  шахматы: "https://cdn-icons-png.flaticon.com/512/3410/3410963.png",
  "силовой экстрим":
    "https://w7.pngwing.com/pngs/698/556/png-transparent-logo-physical-strength-strength-training-computer-icons-strength-miscellaneous-hand-monochrome-thumbnail.png",
  футбол: "https://cdn-icons-png.flaticon.com/512/53/53283.png",
  хоккей: "https://cdn-icons-png.flaticon.com/512/3062/3062042.png",
  "настольный теннис": "https://cdn-icons-png.flaticon.com/512/933/933900.png",
};

LogBox.ignoreAllLogs();

function NewsScreen({navigation}) {
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
      // if (filterList.length !== 0) 
      // setTimeout(() => setLoading(false), 500);
      // else 
      setLoading(false);
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
              borderWidth: 1,
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
    <View style={{flex: 1}}>
      <View style={styles.page}>
        <ScrollView>
          {/*<View style={styles.titleView}>*/}
          {/*  <Text style={styles.titleText}>Новости</Text>*/}
          {/*</View>*/}
          <View style={{
            ...styles.filterButtonHolder,
            backgroundColor: 'white',
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 8
          }}>{renderButtons()}</View>
          {isLoading ? (
            <ActivityIndicator style={styles.activityIndicator}/>
          ) : (
            data.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => pressNews(item)}>

                  <View style={{
                    backgroundColor: 'grey',
                    marginLeft: 16,
                    marginRight: 16, ...styles.container, ...styles.shadow,
                    padding: 16,
                    paddingLeft: 16,
                    // alignItems: 'center',
                    // alignContent: 'center'
                  }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{...styles.newsText, width: '80%'}}>{item.title}</Text>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                        }}
                        source={{
                          uri: filterIcons[item.tag],
                        }}
                      />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
                      <Text style={{...styles.newsText, color: 'grey'}}>{'#плавание'}</Text>
                      <Text style={{...styles.newsText, color: 'grey'}}>{'05.08 12:22'}</Text>
                    </View>
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
            <View/>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    marginLeft: 12,
    marginRight: 12,
    // padding: 10,
    // paddingRight: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',

  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

  },
  page: {
    // marginTop: 50,
    flex: 1,
    //backgroundColor: "white",
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
    // padding: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
  },
  newsText: {
    // padding: 10,
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
    margin: 12,
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
