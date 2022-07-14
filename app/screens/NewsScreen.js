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
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

// const news = [
//   {
//     id: 1,
//     title: "Горячие звонки: как уберечь гаджеты от перегрева и поломки",
//     news:
//       'Высокое тепловыделение — "родовая травма" электроники. "Тонкие" техпроцессы ситуацию улучшили, но все равно получить 100 градусов довольно легко. Особенно в жару.\n' +
//       "Одно из решений — приток дополнительного воздуха. Но в ноутбуках это практически невозможно: корпус и система охлаждения рассчитаны производителем без запаса. Некогда популярные подставки с кулерами фактически исчезли с рынка из-за низкой эффективности — громоздкая конструкция, требующая внешнего питания, давала мизерный выигрыш в температуре. А при энергозатратных задачах эффекта и вовсе не было.",
//     tag: "technology",
//   },
//   {
//     id: 2,
//     title: "Ученые поняли, как управлять поведением нефти в скважине",
//     news: "рафен — одноатомный слой углерода. Как рассказали специалисты, так называемые наножидкости (или нанофлюиды), то есть смеси из дистиллированной воды и графена, сегодня применяются как хладагенты в охлаждающих системах, а также для повышения эффективности солнечной энергетики и нефтедобычи.",
//     tag: "nature",
//   },
//   {
//     id: 3,
//     title: "Китай запустит собственную космическую солнечную обсерваторию",
//     news: "Китай в октябре 2022 года запустит свой первый космический аппарат, специально разработанный для исследования происходящих на Солнце процессов, сообщили в обсерватории Цзыцзиньшань при Китайской академии наук.\nЗапуск 888-килограмовой передовой космической солнечной обсерватории (ASO-S) состоится с космодрома Цзюцюань в провинции Ганьсу на северо-западе Китая, точная дата старта пока неизвестна.\nОбсерватория, целью которой является изучение формирования и взаимосвязи магнитного поля Солнца, солнечных вспышек и корональных выбросов массы, будет работать на солнечно-синхронной орбите высотой 720 километров над поверхностью Земли. Проектный срок службы составляет 4 года.",
//     tag: "space",
//   },
//   {
//     id: 4,
//     title: "Горячие звонки: как уберечь гаджеты от перегрева и поломки",
//     news:
//       'Высокое тепловыделение — "родовая травма" электроники. "Тонкие" техпроцессы ситуацию улучшили, но все равно получить 100 градусов довольно легко. Особенно в жару.\n' +
//       "Одно из решений — приток дополнительного воздуха. Но в ноутбуках это практически невозможно: корпус и система охлаждения рассчитаны производителем без запаса. Некогда популярные подставки с кулерами фактически исчезли с рынка из-за низкой эффективности — громоздкая конструкция, требующая внешнего питания, давала мизерный выигрыш в температуре. А при энергозатратных задачах эффекта и вовсе не было.",
//     tag: "technology",
//   },
//   {
//     id: 5,
//     title: "Ученые поняли, как управлять поведением нефти в скважине",
//     news: "рафен — одноатомный слой углерода. Как рассказали специалисты, так называемые наножидкости (или нанофлюиды), то есть смеси из дистиллированной воды и графена, сегодня применяются как хладагенты в охлаждающих системах, а также для повышения эффективности солнечной энергетики и нефтедобычи.",
//     tag: "nature",
//   },
//   {
//     id: 6,
//     title: "Китай запустит собственную космическую солнечную обсерваторию",
//     news: "Китай в октябре 2022 года запустит свой первый космический аппарат, специально разработанный для исследования происходящих на Солнце процессов, сообщили в обсерватории Цзыцзиньшань при Китайской академии наук.\nЗапуск 888-килограмовой передовой космической солнечной обсерватории (ASO-S) состоится с космодрома Цзюцюань в провинции Ганьсу на северо-западе Китая, точная дата старта пока неизвестна.\nОбсерватория, целью которой является изучение формирования и взаимосвязи магнитного поля Солнца, солнечных вспышек и корональных выбросов массы, будет работать на солнечно-синхронной орбите высотой 720 километров над поверхностью Земли. Проектный срок службы составляет 4 года.",
//     tag: "space",
//   },
// ];

const availableFilters = [
  "technology",
  "nature",
  "space",
  "adventure",
  "plants",
  "cars",
  "competition",
  "advertisment",
];

function NewsScreen({ navigation }) {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredNews, setFilteredNews] = useState(news);

  // useEffect(() => {
  //   const newNews = news.filter(
  //     (newsElement) =>
  //       searchTerm === "" ||
  //       newsElement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       newsElement.news.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       newsElement.tag.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredNews(newNews);
  // }, [searchTerm]);

  // console.log(searchTerm);

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
      console.error(error);
    } finally {
      // setTimeout(() => setLoading(false), 500);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getMovies();
  // }, []);

  useEffect(() => {
    setLoading(true);
    getMovies();
  }, [filterList]);

  // {isLoading ? <ActivityIndicator/> : (<View/>)}

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
              ...styles.filterButtons,
              backgroundColor: checkIfExists(item) ? "#0384fc" : "#75aeeb",
            }}
          >
            <Text style={styles.filterButtonsText}>{item}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.page}>
        <ScrollView>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Новости</Text>
          </View>
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
          {data.length <= 1 ? (
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
    marginTop: 50,
    flex: 1,
    padding: 15,
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
    width: "100%",
    height: 150,
    marginTop: 20,
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
    borderRadius: 1,
    borderWidth: 1,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    // backgroundColor: checkIfExists(item) ? "#0384fc" : "#75aeeb",
    // !! the backgroundColor parameter is defined directly in code
  },
  filterButtonsText: {
    color: "black",
    fontSize: 20,
  },
  filterButtonHolder: {
    marginTop: 30,
    // borderWidth: 1,
    width: "100%",
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
