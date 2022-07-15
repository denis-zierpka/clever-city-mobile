import React, {useRef} from "react";

import {
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList, Linking, Alert,
} from "react-native";
import {getStateFromPath, NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import MainTabs from "./app/screens/MainTabs";
import SingleNewsScreen from "./app/screens/NewsScreens/SingleNewsScreen";
import EventRegistrationScreen from "./app/screens/EventRegistration";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SingleRegistrationScreen from "./app/screens/SingleRegistration";
import PushNotifications from "./app/components/PushNotifications";
import { getCredentials, setCredentials } from "./app/api";
import {createHooks, Provider} from "react-global-hook";
import {store} from "./app/screens/TestGlobals";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import SingleResultsScreen from "./app/screens/SingleResultsScreen";

const Stack = createNativeStackNavigator();
const useGlobal = createHooks(store);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [data, setData] = useState();

  const myFunction = async () => {
    // await setCredentials("by", "my");
    const asas = await getCredentials();
    if (asas !== null) {
      setData(asas);
      console.log(asas.login);
      console.log(asas.password);
    } else {
      setData({});
      console.log("No credentials");
    }
  };

  const useMount = func => useEffect(() => func(), []);

  const useInitialURL = () => {
    const [url, setUrl] = useState(null);
    const [processing, setProcessing] = useState(true);

    useMount(() => {
      const getUrlAsync = async () => {
        // Get the deep link used to open the app
        const initialUrl = await Linking.getInitialURL();

        // The setTimeout is just for testing purpose
        setTimeout(() => {
          setUrl(initialUrl);
          setProcessing(false);
        }, 1000);
      };

      getUrlAsync();
    });

    return { url, processing };
  };

  const { url: initialUrl, processing } = useInitialURL();

  useEffect(() => {
    //alert(initialUrl);
  }, [initialUrl]);

  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
  });

  useEffect(() => {
    Linking.getInitialURL().then((ev) => {
      if (ev) {
        this._handleOpenURL(ev);
      }
    }).catch(err => {
      console.warn('An error occurred', err);
    });
    Linking.addEventListener('url', (w) => {
      Alert.alert("Тестовая команда", 'Заявка от участника: Альфред Нуртдинов')
      store.actions.increase();
    });
    myFunction();

    //PushNotifications();
  }, []);


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        {/* Моё тут */}
        <Stack.Screen
          name="SingleNewsScreen"
          component={SingleNewsScreen}
          options={{ headerShown: true, title: 'Новости', headerTintColor: 'white',
            headerStyle: { backgroundColor: "#109696" },
            headerTitleStyle: { color: "white" }, }}
        />
        <Stack.Screen
          name="EventRegistrationScreen"
          component={EventRegistrationScreen}
          options={{ headerShown: true, title: "Регистрация на соревнование", headerTintColor: 'white',headerStyle: { backgroundColor: "#109696" },
            headerTitleStyle: { color: "white" },}}
        />
        <Stack.Screen
          name="SingleRegistrationScreen"
          component={SingleRegistrationScreen}
          options={{ headerShown: true, title: "Единоразовая регистрация", headerTintColor: 'white',headerStyle: { backgroundColor: "#109696" },
            headerTitleStyle: { color: "white" }, }}
        />
        <Stack.Screen
          name="SingleResultsScreen"
          component={SingleResultsScreen}
          options={{ headerShown: true, title: "Просмотр результатов", headerTintColor: 'white',headerStyle: { backgroundColor: "#109696" },
            headerTitleStyle: { color: "white" }, }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    // alert(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
