import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronRight,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {filterIcons, filterIconsAdv, schedule_data} from "./TestData";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect } from "react";
import { Button } from "react-native-web";
import { getCredentials, removeCredentials } from "../api";

library.add(faUser);

const styles = StyleSheet.create({
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

const navigate_to_ers_screen = (navigation, item) => {
  navigation.navigate("SingleRegistrationScreen", {
    item: item,
  });
};

const navigate_to_ers_screen_with_creds = (navigation, item, creds) => {
  navigation.navigate("EventRegistrationScreen", {
    item: item,
    creds: creds,
  });
};

function EventCard({ navigation, item }) {
  const [creds, setCreds] = useState();
  const [isEventTriggerred, setIsEventTriggerred] = useState(false);

  const myFunctionToGetCredentials = async () => {
    const asas = await getCredentials();
    console.log("Here in myFunctionToGetCredentials in EventCard")
    if (asas !== null) {
      setCreds(asas);
      navigate_to_ers_screen_with_creds(navigation, item, creds);
    } else {
      navigate_to_ers_screen(navigation, item)
    }
  };

  useEffect(() => {
    if (isEventTriggerred) {
      console.log("Yes, in useEffect")
      setIsEventTriggerred(false);
      myFunctionToGetCredentials();
      // navigate_to_ers_screen(navigation, item, creds);
    }
  }, [isEventTriggerred])




  return (
    // <TouchableOpacity onPress={() => navigate_to_ers_screen(navigation, item)}>
    <TouchableOpacity onPress={() => setIsEventTriggerred(true)}>
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
            // source={{
            //   uri: filterIcons[item.title.toLowerCase()],
            // }}
            source={filterIconsAdv[item.title.toLowerCase()]}
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
    // <ScrollView>
    <View style={{ ...styles.container, ...styles.shadow, marginBottom: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", margin: 16 }}>
        {day_data.day}, {day_data.date}
      </Text>
      {items.map((item, index) => {
        return <EventCard key={index} navigation={navigation} item={item} />;
      })}
    </View>
    // </ScrollView>
  );
}

LogBox.ignoreAllLogs();

function ParticipateScreen({ navigation }) {
  const [buttonIsPresses, setButtonIsPresses] = useState(false);
  
  const myFunctionToRemoveCredentials = async () => {
    await removeCredentials();
  };

  useEffect(() => {
    if (buttonIsPresses) {
      myFunctionToRemoveCredentials();
      setButtonIsPresses(false);
    }
  }, [buttonIsPresses]);


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
    <ScrollView>
      <Day navigation={navigation} day_data={schedule_data[0]} />
      <Day navigation={navigation} day_data={schedule_data[1]} />
      <Day navigation={navigation} day_data={schedule_data[2]} />
      <Day navigation={navigation} day_data={schedule_data[3]} />
      {buttonIsPresses ? (
        <></>
      ) : (
        <TouchableOpacity onPress={() => setButtonIsPresses(true)}>
          <View
            style={{
              width: "100%",
              height: 30,
              marginBottom: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Выйти из профилья</Text>
          </View>
        </TouchableOpacity>
      )}

      {/*       
      <View style={{ ...styles.container, ...styles.shadow, marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", margin: 16 }}>
          Четверг, 5.08
        </Text>
        <EventCard navigation={navigation} />
        <EventCard navigation={navigation} />
        <EventCard navigation={navigation} />
        <EventCard navigation={navigation} />
      </View>
      <View style={{ ...styles.container, ...styles.shadow, marginBottom: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", margin: 16 }}>
          Пятница, 6.08
        </Text>
        <EventCard navigation={navigation} />
        <EventCard navigation={navigation} />
        <EventCard navigation={navigation} />
        <EventCard navigation={navigation} />
      </View>

      <View style={{ ...styles.container, ...styles.shadow }}>
        <EventCard />
      </View>
      <View style={{ ...styles.container, ...styles.shadow }}>
        <EventCard />
      </View>
      <View style={{ ...styles.container, ...styles.shadow }}>
        <EventCard />
      </View> */}
    </ScrollView>
  );
}

export default ParticipateScreen;
