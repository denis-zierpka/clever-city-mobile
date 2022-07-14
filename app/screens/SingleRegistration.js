import useInputScrollHandler from "react-native-use-input-scroll-handler";
import {
  Button, Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from "react-native";
import {useEffect, useState} from "react";

const styles = StyleSheet.create({
  container: {
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
    elevation: 3,
  }
});

const navigate_to_ers_screen = (navigation) => {
  navigation.replace("EventRegistrationScreen", {

  });
};

function SingleRegistrationScreen({navigation}) {
  const {scrollHandler} = useInputScrollHandler({extraScrollHeight: 64});

  const [userInfo, setUserInfo] = useState({
    login: '',
    password: '',
    repeat_password: '',
    name: '',
    sir_name: '',
    age: 20,
    description: 'Hello from user'
  })

  const handleSignUp = () => {
    console.log(userInfo);
    navigate_to_ers_screen(navigation);
  }

  // useEffect( () => {
  //   alert(userInfo);
  // }, [userInfo])

  return (
    <TouchableWithoutFeedback>
      <ScrollView {...scrollHandler} style={{paddingLeft: 8, paddingRight: 8}}>
        <Image source={{
          uri: 'https://cdnn21.img.ria.ru/images/07e6/06/18/1797844556_0:247:936:773_1920x0_80_0_0_548a6a160d24192f53e4cc0ef6a8bbdd.jpg',
          width: '100%',
          height: 210,
        }}/>

        <View style={{
          ...styles.container, ...styles.shadow, marginTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, display: 'flex',
          flexDirection: 'column', justifyContent: 'space-between'
        }}>
        {/*<View style={{...styles.container, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>*/}
          <Text style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 16,
            marginTop: 16,
          }}>Логин или email</Text>
          <TextInput
            style={{
              padding: 16,
              fontSize: 16,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'lightgrey',
              // width: '100%',
            }}
            onChangeText={(text) => {
              let dct = {...userInfo};
              dct['login'] = text;
              setUserInfo(dct);
            }}

            value={userInfo['login']}
            placeholder="Придумайте логин"
          />




          <Text style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 16,
            marginTop: 16,
          }}>Пароль</Text>
          <TextInput
            style={{
              padding: 16,
              fontSize: 16,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'lightgrey',
              // width: '100%',
            }}
            secureTextEntry={true}

            onChangeText={(text) => {
              let dct = {...userInfo};
              dct['password'] = text;
              setUserInfo(dct);
            }}
            autoCorrect={false}
            value={userInfo['password']}
            placeholder="Придумайте пароль"
          />




          <Text style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 16,
            marginTop: 16,
          }}>Повторите пароль</Text>
          <TextInput
            style={{
              padding: 16,
              fontSize: 16,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'lightgrey',
              // width: '100%',
            }}
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(text) => {
              let dct = {...userInfo};
              dct['repeat_password'] = text;
              setUserInfo(dct);
            }}

            value={userInfo['repeat_password']}
            placeholder="Повторите пароль"
          />
        </View>

        <View style={{
          ...styles.container, ...styles.shadow, marginTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, display: 'flex',
          flexDirection: 'column', justifyContent: 'space-between'
        }}>

          <Text style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 16,
            marginTop: 16,
          }}>Имя</Text>
          <TextInput
            style={{
              padding: 16,
              fontSize: 16,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'lightgrey',
              // width: '100%',
            }}
            placeholder="Введите имя"
            onChangeText={(text) => {
              let dct = {...userInfo};
              dct['name'] = text;
              setUserInfo(dct);
            }}

            value={userInfo['name']}
          />


          <Text style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 16,
            marginTop: 16,
          }}>Фамилия</Text>
          <TextInput
            style={{
              padding: 16,
              fontSize: 16,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'lightgrey',
              // width: '100%',
            }}
            placeholder="Введите фамилию"

            onChangeText={(text) => {
              let dct = {...userInfo};
              dct['sir_name'] = text;
              setUserInfo(dct);
            }}

            value={userInfo['sir_name']}
          />

        </View>

        <TouchableHighlight
          style={{
            padding: 12,
            borderRadius: 12,
            backgroundColor: "#109696",
            marginBottom: 50,
            marginTop: 16,
            alignSelf: 'center'
          }}>
          <Button title={'ЗАРЕГИСТРИРОВАТЬСЯ'} color={'white'} onPress={handleSignUp}></Button>
        </TouchableHighlight>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default SingleRegistrationScreen;