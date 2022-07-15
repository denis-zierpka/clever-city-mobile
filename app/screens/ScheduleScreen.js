import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LogBox,
} from "react-native";
import ResultsForYouScreen from "./ResultsScreens/ResultsForYouScreen";
import ResultsYourScreen from "./ResultsScreens/ResultsYourScreen";
import ResultsAllScreen from "./ResultsScreens/ResultsAllScreen";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {filterIcons, filterIconsAdv, schedule_data} from "./TestData";
import { useState, useEffect } from "react";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const TopTab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  page: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    margin: 8,
    // padding: 10,
    paddingRight: 8,
    borderRadius: 12,
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

// const navigate_to_ers_screen = (navigation) => {
//   navigation.navigate("SingleRegistrationScreen", {
//
//   });
// };

function EventCard({ navigation, item }) {
  return (
    <TouchableOpacity onPress={() => navigate_to_ers_screen(navigation)}>
      <View>
        <View
          style={{
            marginTop: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            borderLeftWidth: 0,
            borderLeftColor: "orange",
            marginBottom: 20,
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
            }}
            source={filterIconsAdv[item.title.toLowerCase()]}
            // source={{
            //   uri: filterIconsAdv[item.title.toLowerCase()],
            // }}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: 16,
              alignContent: "space-between",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // alignContent: "flex-end",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: -6 }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 16, marginTop: -4 }}>{item.time}</Text>
            </View>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={{ color: "#888888", marginBottom: 8, marginTop: 4 }}
            >
              {item.body}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <FontAwesomeIcon icon={faLocationDot} color={"#109696"} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ marginLeft: 8, color: "#109696" }}
              >
                {item.address}
              </Text>
            </View>
            <View
              style={{
                marginTop: 4,
                borderBottomColor: "#868686",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginRight: -24,
              }}
            />
          </View>
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} color={"grey"} />
          </View>
          {/*<Icon name={fa-angle-right" />'} size={26}/>*/}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Day({ navigation, day_data }) {
  console.log(day_data.date);
  const items = day_data.list;
  return (
    <ScrollView>
      <View style={{ ...styles.container, ...styles.shadow, marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", margin: 16 }}>
          {day_data.day}, {day_data.date}
        </Text>
        {items.map((item) => {
          return <EventCard navigation={navigation} item={item} />;
        })}
      </View>
    </ScrollView>
  );
}

LogBox.ignoreAllLogs();

function ScheduleScreen({ navigation }) {
  const [isLoadingScheduleList, setIsLoadingScheduleList] = useState(true);
  const [scheduleListFromDatabase, setScheduleListFromDatabase] = useState([]);

  const getSchedule = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/schedule/");
      const json = await response.json();
      setScheduleListFromDatabase(json.schedule);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingScheduleList(false);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.page}>
        <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
          <TopTab.Navigator tabBarOptions={{indicatorStyle :{
              backgroundColor:'#109696'
            }}}>
            <TopTab.Screen
              name="ResultsForYouScreen1"
              component={() => (
                <Day navigation={navigation} day_data={schedule_data[0]} />
              )}
              options={{ title: schedule_data[0].date, headerShown: false }}

              // initialParams={{dayDate: schedule_data[0].date}}
            />
            <TopTab.Screen
              name="ResultsYourScreen2"
              component={() => (
                <Day navigation={navigation} day_data={schedule_data[1]} />
              )}
              options={{ title: schedule_data[1].date, headerShown: false }}
            />
            <TopTab.Screen
              name="ResultsAllScreen3"
              component={() => (
                <Day navigation={navigation} day_data={schedule_data[2]} />
              )}
              options={{ title: schedule_data[2].date, headerShown: false }}
            />
            <TopTab.Screen
              name="ResultsForYouScreen4"
              component={() => (
                <Day navigation={navigation} day_data={schedule_data[3]} />
              )}
              options={{ title: schedule_data[3].date, headerShown: false }}
            />
          </TopTab.Navigator>
        </View>
      </View>
    </View>
  );
}

export default ScheduleScreen;
