import React from "react";
import Constants from "expo-constants";

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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video, AVPlaybackStatus } from "expo-av";
import { WebView } from "react-native-webview";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlay, faPlay } from "@fortawesome/free-solid-svg-icons";

const as = "B5iRix1_Va0";

const list_of_videos = [
  {
    id: "B5iRix1_Va0",
    start_photo: "https://i.ytimg.com/vi/",
    end_photo: "/hq720.jpg",
    start_video: "https://www.youtube.com/watch?v=",
    name: "Экскурсия по Саратову",
  },
  {
    id: "zFLpmxy9dag",
    start_photo: "https://i.ytimg.com/vi/",
    end_photo: "/hq720.jpg",
    start_video: "https://www.youtube.com/watch?v=",
    name: "Саратов | Город России",
  },
  {
    id: "yHNZJyfXR5c",
    start_photo: "https://i.ytimg.com/vi/",
    end_photo: "/hq720.jpg",
    start_video: "https://www.youtube.com/watch?v=",
    name: "Как устроены умные города?",
  },
];

function VideoScreen(props) {
  const [isChoosen, setIsChoosen] = React.useState(false);
  const [choosenVideo, setChoosenVideo] = React.useState({});

  function getVideo(item) {
    setChoosenVideo(item);
    setIsChoosen(true);
  }

  return isChoosen ? (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setIsChoosen(false)}>
        <View style={{ width: "100%", height: 50, justifyContent: "center" }}>
          <Ionicons name={"arrow-back"} size={40} color={"black"} style={{marginLeft: 10}} />
        </View>
      </TouchableOpacity>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri:
            choosenVideo.start_video +
            choosenVideo.id +
            "?rel=0&autoplay=0&showinfo=0&controls=0",
        }}
      />
    </View>
  ) : (
    <ScrollView>
      {list_of_videos.map((item, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => getVideo(item)}>
            <View style={{ marginTop: 20, marginBottom: 80 }}>
              <View
                style={{
                  marginHorizontal: 30,
                  marginBottom: 15,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
                >
                  {item.name}
                </Text>
              </View>

              <View style={{}}>
                <Image
                  key={index}
                  style={{
                    position: "absolute",
                    left: 10,
                    right: 10,
                    height: undefined,
                    aspectRatio: 1280 / 720,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  source={{
                    uri: item.start_photo + item.id + item.end_photo,
                  }}
                />
              </View>
              <View
                style={{
                  alignSelf: "center",
                  marginTop: 70,
                }}
              >
                <FontAwesomeIcon icon={faPlay} size={55} color={"lightgrey"} />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  // <WebView
  //   style={styles.container}
  //   source={{ uri: 'https://www.youtube.com/watch?v=2qCmRJz3NOE?rel=0&autoplay=0&showinfo=0&controls=0' }}
  // />

  // <View style={styles.container}>
  //   <Video
  //     ref={video}
  //     style={styles.video}
  //     source={{
  //       uri: 'https://www.youtube.com/watch?v=2qCmRJz3NOE?rel=0&autoplay=0&showinfo=0&controls=0',
  //     }}
  //     useNativeControls
  //     resizeMode="contain"
  //     isLooping
  //     onPlaybackStatusUpdate={status => setStatus(() => status)}
  //   />
  //   <View style={styles.buttons}>
  //     <Button
  //       title={status.isPlaying ? 'Pause' : 'Play'}
  //       onPress={() =>
  //         status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
  //       }
  //     />
  //   </View>
  // </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

export default VideoScreen;
