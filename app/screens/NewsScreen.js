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

const news = [
  {
    id: 1,
    title: "Горячие звонки: как уберечь гаджеты от перегрева и поломки",
    news:
      'Высокое тепловыделение — "родовая травма" электроники. "Тонкие" техпроцессы ситуацию улучшили, но все равно получить 100 градусов довольно легко. Особенно в жару.\n' +
      "Одно из решений — приток дополнительного воздуха. Но в ноутбуках это практически невозможно: корпус и система охлаждения рассчитаны производителем без запаса. Некогда популярные подставки с кулерами фактически исчезли с рынка из-за низкой эффективности — громоздкая конструкция, требующая внешнего питания, давала мизерный выигрыш в температуре. А при энергозатратных задачах эффекта и вовсе не было.",
    tag: "technology",
  },
  {
    id: 2,
    title: "Ученые поняли, как управлять поведением нефти в скважине",
    news: "рафен — одноатомный слой углерода. Как рассказали специалисты, так называемые наножидкости (или нанофлюиды), то есть смеси из дистиллированной воды и графена, сегодня применяются как хладагенты в охлаждающих системах, а также для повышения эффективности солнечной энергетики и нефтедобычи.",
    tag: "nature",
  },
  {
    id: 3,
    title: "Китай запустит собственную космическую солнечную обсерваторию",
    news: "Китай в октябре 2022 года запустит свой первый космический аппарат, специально разработанный для исследования происходящих на Солнце процессов, сообщили в обсерватории Цзыцзиньшань при Китайской академии наук.\nЗапуск 888-килограмовой передовой космической солнечной обсерватории (ASO-S) состоится с космодрома Цзюцюань в провинции Ганьсу на северо-западе Китая, точная дата старта пока неизвестна.\nОбсерватория, целью которой является изучение формирования и взаимосвязи магнитного поля Солнца, солнечных вспышек и корональных выбросов массы, будет работать на солнечно-синхронной орбите высотой 720 километров над поверхностью Земли. Проектный срок службы составляет 4 года.",
    tag: "space",
  },
  {
    id: 4,
    title: "Горячие звонки: как уберечь гаджеты от перегрева и поломки",
    news:
      'Высокое тепловыделение — "родовая травма" электроники. "Тонкие" техпроцессы ситуацию улучшили, но все равно получить 100 градусов довольно легко. Особенно в жару.\n' +
      "Одно из решений — приток дополнительного воздуха. Но в ноутбуках это практически невозможно: корпус и система охлаждения рассчитаны производителем без запаса. Некогда популярные подставки с кулерами фактически исчезли с рынка из-за низкой эффективности — громоздкая конструкция, требующая внешнего питания, давала мизерный выигрыш в температуре. А при энергозатратных задачах эффекта и вовсе не было.",
    tag: "technology",
  },
  {
    id: 5,
    title: "Ученые поняли, как управлять поведением нефти в скважине",
    news: "рафен — одноатомный слой углерода. Как рассказали специалисты, так называемые наножидкости (или нанофлюиды), то есть смеси из дистиллированной воды и графена, сегодня применяются как хладагенты в охлаждающих системах, а также для повышения эффективности солнечной энергетики и нефтедобычи.",
    tag: "nature",
  },
  {
    id: 6,
    title: "Китай запустит собственную космическую солнечную обсерваторию",
    news: "Китай в октябре 2022 года запустит свой первый космический аппарат, специально разработанный для исследования происходящих на Солнце процессов, сообщили в обсерватории Цзыцзиньшань при Китайской академии наук.\nЗапуск 888-килограмовой передовой космической солнечной обсерватории (ASO-S) состоится с космодрома Цзюцюань в провинции Ганьсу на северо-западе Китая, точная дата старта пока неизвестна.\nОбсерватория, целью которой является изучение формирования и взаимосвязи магнитного поля Солнца, солнечных вспышек и корональных выбросов массы, будет работать на солнечно-синхронной орбите высотой 720 километров над поверхностью Земли. Проектный срок службы составляет 4 года.",
    tag: "space",
  },
];

function NewsScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState(news);

  useEffect(() => {
    const newNews = news.filter(
      (newsElement) =>
        searchTerm === "" ||
        newsElement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        newsElement.news.toLowerCase().includes(searchTerm.toLowerCase()) ||
        newsElement.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(newNews);
  }, [searchTerm]);

  console.log(searchTerm);

  const pressNews = (item) => {
    // console.log(id);
    // navigation.navigate("ScheduleScreen")
    navigation.navigate("SingleNewsScreen", {
      item: item,
    });
  };

  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <View style={styles.page}>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
          placeholder="Search..."
        />

        <FlatList
          data={filteredNews}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => pressNews(item)}>
              <View style={styles.newsBox}>
                <Text style={styles.newsText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id}
        />
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
  searchInput: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 15,
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
});

export default NewsScreen;
