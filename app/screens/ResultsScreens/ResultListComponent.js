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

import {NavigationContainer, validatePathConfig} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TextInput} from "react-native";
import {TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { contacts_data, result_data } from "../TestData";
import {useState, useEffect} from "react";

// const contacts_data = [
//   {
//     id: 1,
//     name: "Denis",
//     login: "Burenie1",
//   },
//   {
//     id: 2,
//     name: "Boris",
//     login: "Burenie2",
//   },
//   {
//     id: 3,
//     name: "Alex",
//     login: "Burenie3",
//   },
//   {
//     id: 4,
//     name: "Владимир",
//     login: "Burenie4",
//   },
//   {
//     id: 5,
//     name: "Алексей Петрович",
//     login: "Burenie5",
//   },


const local_filteredResultsFromDatabase = [
  {
    id: 1,
    login: "Burenie1",
    competition: "Плавание",
    date: "12.03.2022",
    result: "1",
  },
  {
    id: 2,
    login: "Burenie1",
    competition: "Волейбол",
    date: "18.03.2022",
    result: "3",
  },
  {
    id: 3,
    login: "Burenie4",
    competition: "Плавание",
    date: "12.03.2022",
    result: "2",
  },
  {
    id: 4,
    login: "Burenie4",
    competition: "Бег",
    date: "20.03.2022",
    result: "2",
  },
  {
    id: 5,
    login: "Burenie6",
    competition: "Плавание",
    date: "11.03.2022",
    result: "1",
  },
  {
    id: 6,
    login: "Burenie6",
    competition: "Плавание",
    date: "21.03.2022",
    result: "1",
  },
];

function ResultListComponent({navigation, state}) {
  const [isLoadingPeopleList, setIsLoadingPeopleList] = useState(true);
  const [searchPeopleTerm, setSearchPeopleTerm] = useState("");
  const [foundPeopleList, setFoundPeopleList] = useState([]);

  if (state === "for_you") {
    const getPeople = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/fetch_users/?left=0&right=1000"
        );
        const json = await response.json();
        setFoundPeopleList(contacts_data);
        setSearchPeopleTerm("");
        console.log("Done setting");
      } catch (error) {
        validateProcessPeople(error);
      } finally {
        setIsLoadingPeopleList(false);
      }
    };

    useEffect(() => {
      getPeople();
    }, []);
  }

  function validateProcessPeople(error) {
    setFoundPeopleList(contacts_data);
    setSearchPeopleTerm("");
  }

  useEffect(() => {
    console.log("Try to update after searchPeopleTerm changes");
    const newContacts = contacts_data.filter(
      (contact) =>
        searchPeopleTerm === "" ||
        contact.name.toLowerCase().includes(searchPeopleTerm.toLowerCase()) // change .name
    );
    setFoundPeopleList(newContacts);
  }, [searchPeopleTerm]);

  const [selectedContactsList, setSelectedContactsList] = useState([]);
  //----------- start request block --------------
  const [isLoadingResultsList, setIsLoadingResultsList] = useState(true);
  const [filteredResultsFromDatabase, setFilteredResultsFromDatabase] =
    useState([]);

  const getResults = async () => {
    try {
      var filter_str = "$";
      for (let i = 0; i < selectedContactsList.length; i++) {
        filter_str += selectedContactsList[i];
        filter_str += "$";
      }
      const response = await fetch("http://127.0.0.1:8000/results/" + filter_str); 
      const json = await response.json();
      setFilteredResultsFromDatabase(json.news);
    } catch (error) {
      validateProcess(error);
    } finally {
      setIsLoadingResultsList(false);
    }
  };

  useEffect(() => {
    setIsLoadingResultsList(true);
    getResults();
  }, [selectedContactsList]);

  // {isLoadingResultsList ? <ActivityIndicator/> : (<View/>)}

  // ------------ end request block ----------------

  const pressedFilterOption = (item) => {
    if (isInSelectedContactsList(item)) {
      const newFilterList = selectedContactsList.filter(
        (element) => element !== item
      );
      setSelectedContactsList(newFilterList);
    } else {
      const newFilterList = [...selectedContactsList, item];
      setSelectedContactsList(newFilterList);
    }
  };

  function isInSelectedContactsList(item) {
    if (selectedContactsList.find((elem) => item.login === elem.login)) {
      //change
      return true;
    } else {
      return false;
    }
  }

  function renderButtons() {
    return selectedContactsList.map((item, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => pressedFilterOption(item)}>
          <View style={styles.filterButtons}>
            <Text style={styles.filterButtonsText}>{item.login}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  function validateProcess(error) {
    setFilteredResultsFromDatabase(result_data);
  }

  function pressResults(item) {
    navigation.navigate("SingleResultsScreen", {
      item: item,
    })
  }

  
  return (
    <View style={{flex: 1}}>
      <View style={styles.page}>
        <ScrollView nestedScrollEnabled={true}>
          
          {state === "for_you" ? (
            <View>
              <View style={styles.filterButtonHolder}>{renderButtons()}</View>
              <View
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 15,
                  borderWidth: 1,
                }}
              >
                <TextInput
                  value={searchPeopleTerm}
                  onChangeText={setSearchPeopleTerm}
                  style={styles.searchInput}
                  placeholder="Search..."
                />
                {isLoadingPeopleList ? (
                  <ActivityIndicator style={styles.activityIndicator}/>
                ) : (
                  <ScrollView
                    nestedScrollEnabled={true}
                    style={{marginTop: 20, marginLeft: 30}}
                  >
                    {foundPeopleList.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => pressedFilterOption(item)}
                        >
                          <View style={{width: "100%", height: 26}}>
                            <Text style={{fontSize: 15}}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                )}
              </View>
            </View>
          ) : (
            <View/>
          )}


          {isLoadingResultsList ? (
            <ActivityIndicator style={styles.activityIndicator}/>
          ) : (
            filteredResultsFromDatabase.map((item, index) => {
              // console.log("Print filteredResultsFromDatabase")
              // console.log(filteredResultsFromDatabase);
              // return (<View></View>)
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => pressResults(item)}
                >
                  <View style={{...styles.resultsBox, ...styles.container, ...styles.shadow}}>
                    {/*<Text style={styles.resultsText}>*/}
                    {/*  {item.login} {item.competition} {item.date} {item.result}*/}
                    {/*</Text>*/}
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      <Text style={{fontSize: 18, fontWeight: '600'}}>{item.title} &#183; {item.date}</Text>
                      <Text style={{fontSize: 16, marginTop: 8, marginBottom: 8}}>{item.body}</Text>
                      <View style={{
                        display: 'flex', flexDirection: "row", marginTop: 8,
                        justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center'
                      }}>
                        <FontAwesomeIcon icon={faTrophy} size={24} color={'gold'}/>
                        <Text style={{marginLeft: 8, fontSize: 16}}>{item.results[0].name}</Text>
                      </View>

                      <View style={{
                        display: 'flex', flexDirection: "row", marginTop: 8,
                        justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center'
                      }}>
                        <FontAwesomeIcon icon={faTrophy} size={24} color={'silver'}/>
                        <Text style={{marginLeft: 8, fontSize: 16}}>{item.results[1].name}</Text>
                      </View>

                      <View style={{
                        display: 'flex', flexDirection: "row", marginTop: 8,
                        justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center'
                      }}>
                        <FontAwesomeIcon icon={faTrophy} size={24} color={'#cd7f32'}/>
                        <Text style={{marginLeft: 8, fontSize: 16}}>{item.results[2].name}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}


          {filteredResultsFromDatabase.length <= 1 ? (
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
  searchInput: {
    borderRadius: 15,
    backgroundColor: "lightgrey",
    padding: 10,
  },
  filterButtons: {
    height: 30,
    padding: 2,
    borderColor: "black",
    margin: 5,
    borderWidth: 1,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#0384fc",
  },
  filterButtonsText: {
    color: "black",
    fontSize: 20,
  },
  filterButtonHolder: {
    // marginTop: 30,
    // borderWidth: 1,
    width: "100%",
    // height: 100,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  resultsBox: {
    // width: "100%",
    marginTop: 8,
    padding: 20,
    //borderColor: "black",
    // borderWidth: 1,
    // borderRadius: 30,
  },
  resultsText: {
    padding: 10,
    fontSize: 16,
  },
  activityIndicator: {
    marginTop: 50,
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

export default ResultListComponent;
