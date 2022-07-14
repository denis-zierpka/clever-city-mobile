import React from 'react';
import {Image, Text, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronRight, faUser} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";

library.add(faUser);

const styles = StyleSheet.create({
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

const navigate_to_ers_screen = (navigation) => {
  navigation.navigate("SingleRegistrationScreen", {

  });
};

function EventCard({navigation}) {
  return (
    <TouchableOpacity onPress={() => navigate_to_ers_screen(navigation)}>
      <View style={{
        flexDirection: "row",
        justifyContent: 'space-between',
        borderLeftWidth: 0,
        borderLeftColor: 'orange',
        marginBottom: 12,
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
            <Text style={{fontSize: 16, marginTop: -4}}>13:00</Text>
          </View>
          <Text style={{color: '#888888', marginBottom: 8}}>Продоллжение соревнований по теннису на Алгоритмическомм проспект...</Text>
          <View
            style={{
              marginTop: 4,
              borderBottomColor: '#868686',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginRight: -24
            }}
          />
        </View>
        <View style={{ alignSelf:'center', justifyContent: 'center', display: 'flex'}}>
          <FontAwesomeIcon icon={faChevronRight} color={'grey'}/>
        </View>
        {/*<Icon name={fa-angle-right" />'} size={26}/>*/}
      </View>
    </TouchableOpacity>
  );
}

function ParticipateScreen({navigation}) {
  return (
    <>
     {/*<SafeAreaView>*/}
      <ScrollView>
        <View style={{...styles.container, ...styles.shadow}}>
          <Text style={{textAlign: 'center', margin: 8}}>Проверка 1</Text>
        </View>
        {/*<View style={{paddingTop: 10, paddingBottom: 10, backgroundColor: 'white', }}>*/}
        <View style={{...styles.container, ...styles.shadow, marginBottom: 24}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', margin: 16}}>Четверг, 5.08</Text>
          <EventCard navigation={navigation}/>
          <EventCard navigation={navigation}/>
          <EventCard navigation={navigation}/>
          <EventCard navigation={navigation}/>
        </View>
        <View style={{...styles.container, ...styles.shadow, marginBottom: 24}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', margin: 16}}>Пятница, 6.08</Text>
          <EventCard navigation={navigation}/>
          <EventCard navigation={navigation}/>
          <EventCard navigation={navigation}/>
          <EventCard navigation={navigation}/>
        </View>

        <View style={{...styles.container, ...styles.shadow}}>
          <EventCard/>
        </View>
        <View style={{...styles.container, ...styles.shadow}}>
          <EventCard/>
        </View><View style={{...styles.container, ...styles.shadow}}>
        <EventCard/>
      </View>

      </ScrollView>
      {/*</View>*/}
    {/*</SafeAreaView>*/}
  </>
  );
}

export default ParticipateScreen;