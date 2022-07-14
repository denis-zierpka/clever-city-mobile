import React from 'react';
import {Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ResultsForYouScreen from "./ResultsScreens/ResultsForYouScreen";
import ResultsYourScreen from "./ResultsScreens/ResultsYourScreen";
import ResultsAllScreen from "./ResultsScreens/ResultsAllScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronRight, faLocationDot} from "@fortawesome/free-solid-svg-icons";

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

    elevation: 3,
  }
});


// const navigate_to_ers_screen = (navigation) => {
//   navigation.navigate("SingleRegistrationScreen", {
//
//   });
// };


function EventCard({navigation}) {
  return (
    <TouchableOpacity onPress={() => navigate_to_ers_screen(navigation)}>
      <View>
        <View style={{
          marginTop: 8,
          flexDirection: "row",
          justifyContent: 'space-between',
          borderLeftWidth: 0,
          borderLeftColor: 'orange',
          marginBottom: 20,
        }}>
          <Image
            style={{
              width: 70,
              height: 70,
            }}
            source={{
              uri: 'https://www.iconpacks.net/icons/2/free-swimming-icon-2707-thumb.png'
            }}/>
          <View style={{
            flex: 1,
            paddingLeft: 16,
            alignContent: 'space-between',
            justifyContent: 'space-between',
            marginTop: 4,
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // alignContent: "flex-end",
              alignItems: 'flex-start',
            }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: -6}}>Плавание</Text>
              <Text style={{fontSize: 16, marginTop: -4}}>13:00-15:00</Text>
            </View>
            <Text style={{color: '#888888', marginBottom: 8, marginTop: 4}}>Продоллжение соревнований по теннису на Алгоритмическомм
              проспект...</Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
            <FontAwesomeIcon icon={faLocationDot} color={'#109696'}/>
              <Text style={{marginLeft: 8, color: '#109696'}}>Потемкинская улица, 35, Ботльшй...</Text>
            </View>
            <View
              style={{
                marginTop: 4,
                borderBottomColor: '#868686',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginRight: -24
              }}
            />

          </View>
          <View style={{alignSelf: 'center', justifyContent: 'center', display: 'flex'}}>
            <FontAwesomeIcon icon={faChevronRight} color={'grey'}/>
          </View>
          {/*<Icon name={fa-angle-right" />'} size={26}/>*/}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const Day = ({navigation}) => {
  return (
    <ScrollView>
    <View style={{...styles.container, ...styles.shadow, marginBottom: 24}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', margin: 16}}>Четверг, 5.08</Text>
      <EventCard navigation={navigation}/>
      <EventCard navigation={navigation}/>
      <EventCard navigation={navigation}/>
      <EventCard navigation={navigation}/>
    </View>
    </ScrollView>
  );
}

function ScheduleScreen({navigator}) {
  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <View style={styles.page}>
        <View style={{marginTop: StatusBar.currentHeight, flex: 1}}>
          <TopTab.Navigator>
            <TopTab.Screen
              name="ResultsForYouScreen1"
              component={Day}
              options={{title: "05.08", headerShown: false}}
            />
            <TopTab.Screen
              name="ResultsYourScreen1"
              component={Day}
              options={{title: "06.08", headerShown: false}}
            />
            <TopTab.Screen
              name="ResultsAllScreen2"
              component={Day}
              options={{title: "07.08", headerShown: false}}
            />
            <TopTab.Screen
              name="ResultsForYouScreen3"
              component={Day}
              options={{title: "08.08", headerShown: false}}
            />


          </TopTab.Navigator>
        </View>
        <Text>Kek</Text>
      </View>
    </View>
  );
}

export default ScheduleScreen;