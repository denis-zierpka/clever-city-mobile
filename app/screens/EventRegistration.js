import React, {useState} from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView, Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableHighlight, TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import keyboard from "react-native-web/dist/exports/Keyboard";
import {Keyboard} from 'react-native';
import {SearchBar} from "react-native-screens";
import SearchableDropDown from "react-native-searchable-dropdown";
import {faXmark, faMagnifyingGlass, faCopy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Header} from "react-native/Libraries/NewAppScreen";
import {useHeaderHeight} from "react-native-screens/native-stack";
import useInputScrollHandler from "react-native-use-input-scroll-handler";
import {LogBox} from "react-native";
import {actions, participantList, store, useStore} from "./TestGlobals";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

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

function Player({login, name, status, participantList, sir_name}) {

  function handleDeleteUser() {

    const {actions} = store;
    // let copy = [...participantList]
    // copy.map((elem, index) => {
    //   if (login === elem.login) {
    //     copy.splice(index, 1);
    //   }
    // })
    // console.log(copy);
    // participantList = [...copy];
    actions.decrease();
  }

  return (<>
      <View style={{
        display: 'flex', flexDirection: 'row', width: '100%',
        justifyContent: 'space-between'
      }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 8}}>
          {name + ' ' + sir_name}
        </Text>
        <TouchableOpacity onPress={handleDeleteUser}>
          <View style={{marginTop: 8}}>
            {
              sir_name.includes('Вы') ? <FontAwesomeIcon color={'#9a9a9a'} icon={faXmark} size={24}/> : null
            }
          </View>
        </TouchableOpacity>
      </View>
      {
        status !== 1 ? <Text style={{color: '#109696', marginTop: 8}}>Приглашение принято</Text> :
          <Text style={{color: 'orange', marginTop: 8}}>Участнику нужно подтвердить участие</Text>
      }
      <View
        style={{
          marginTop: 4,
          borderBottomColor: '#c4c2c2',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginRight: -8
        }}
      />
    </>
  );
}

const TeamSpecified = () => {
  const [newParticipant, setNewParticipant] = React.useState("");
  const [teamName, setNewTeamName] = React.useState(store.getState().team);


  return (
    <>

      <View style={{
        ...styles.container, ...styles.shadow, marginTop: 8, padding: 16, display: 'flex',
        flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 16,
        }}>Изменить название команды</Text>


        <TextInput
          style={{
            padding: 16,
            fontSize: 16,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'lightgrey',
            // width: '100%',
          }}
          onChangeText={setNewTeamName}
          value={teamName}

          placeholder="Придумайте название команды"
        />
      </View>

      <Text style={{fontSize: 16, color: '#000000', marginLeft: 16, marginTop: 8, marginBottom: 8}}>
        Чтобы другим участникам зарегистрироваться, им необходимо перейти по ссылке ниже.
      </Text>

      <View style={{
        ...styles.container, ...styles.shadow, marginTop: 8, padding: 16, display: 'flex',
        flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 16,
        }}>Ссылка-приглашение</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
        }}>

          <Text
            style={{
              padding: 16,
              fontSize: 16,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'lightgrey',
              width: '100%',
            }}
            onChangeText={setNewParticipant}
            value={newParticipant}
            placeholder="Пригласить участников"
          >{'exp://192.168.1.63:19000/?23244'}
          </Text>
          <TouchableOpacity>
            <View style={{
              marginLeft: -40,
              width: 40,
              height: 32,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center'
            }}>
              <FontAwesomeIcon icon={faCopy} size={24} color={'#737373'}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>


      {
        store.getState().participantList.length === 0 ? null : <View style={{
          ...styles.container, marginTop: 8, paddingTop: 16,
          paddingBottom: 16, paddingLeft: 16, paddingRight: 8
        }}>
          {
            store.getState().participantList.map((elem, index) => {
              return (
                <Player
                  key={index}
                  {...elem}
                  participantList={participantList}
                />
              );
            })
          }

          {/*</SafeAreaView>*/}
        </View>
      }
      <TouchableHighlight
        style={{
          height: 40,
          borderRadius: 12,
          backgroundColor: "red",
          marginBottom: 50,
          marginTop: 16,
          alignSelf: 'center'
        }}>
        <Button title={'ОТКАЗАТЬСЯ ОТ УЧАСТИЯ'} color={'white'}></Button>
      </TouchableHighlight>
    </>
  );
}

const LotOfTeams = () => {
  return (
    <>
      <Text style={{fontSize: 16, color: '#000000', marginLeft: 16, marginBottom: 16, marginRight: 16}}>
        Чтобы продолжить регистрироваться, нужно подтвердить или отклонить предложения участников из других команд.
      </Text>
      <View style={{...styles.container, ...styles.shadow, paddingLeft: 16, paddingRight: 16, marginBottom: 16}}>
        <Text style={{fontWeight: "500", fontSize: 20, color: '#000000', paddingTop: 16, paddingBottom: 8}}>
          Алые Паруса
        </Text>
        <Text style={{fontSize: 16, paddingTop: 4, paddingBottom: 4}}>
          Павел Курочкин
        </Text>
        <Text style={{fontSize: 16, paddingTop: 4, paddingBottom: 4}}>
          Иван Строгальщиков
        </Text>
        <Text style={{fontSize: 16, paddingTop: 4, paddingBottom: 4}}>
          Никита Мастинен
        </Text>
        <Text style={{fontSize: 16, paddingTop: 4, paddingBottom: 4}}>
          Денис Цирпка
        </Text>
        <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableHighlight
            style={{
              borderRadius: 12,
              backgroundColor: "#109696",
              marginBottom: 16,
              marginTop: 16,
              alignSelf: 'center'
            }}>
            <Button title={'УЧАСТВОВАТЬ'} color={'white'}></Button>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              borderRadius: 12,
              backgroundColor: "red",
              marginBottom: 16,
              marginTop: 16,
              alignSelf: 'center'
            }}>
            <Button title={'ОТКАЗАТЬСЯ'} color={'white'}></Button>
          </TouchableHighlight>
        </View>

      </View>
      <View style={{...styles.container, ...styles.shadow, paddingLeft: 16, paddingRight: 16, marginBottom: 16}}>
        <Text style={{fontWeight: "500", fontSize: 20, color: '#000000', paddingTop: 16, paddingBottom: 8}}>
          Алые Паруса
        </Text>
        <Text style={{fontSize: 16, paddingTop: 4, paddingBottom: 4}}>
          Павел Курочкин
        </Text>
        <Text style={{fontSize: 16, paddingTop: 4, paddingBottom: 4}}>
          Иван Строгальщиков
        </Text>
        <Text style={{fontSize: 16, paddingTop: 4, paddingBottom: 4}}>
          Никита Мастинен
        </Text>
        <Text style={{fontSize: 16, paddingTop: 4, paddingBottom: 4}}>
          Денис Цирпка
        </Text>
        <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableHighlight
            style={{
              borderRadius: 12,
              backgroundColor: "#109696",
              marginBottom: 16,
              marginTop: 16,
              alignSelf: 'center'
            }}>
            <Button title={'УЧАСТВОВАТЬ'} color={'white'}></Button>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              borderRadius: 12,
              backgroundColor: "red",
              marginBottom: 16,
              marginTop: 16,
              alignSelf: 'center'
            }}>
            <Button title={'ОТКАЗАТЬСЯ'} color={'white'}></Button>
          </TouchableHighlight>
        </View>

      </View>

    </>
  );
}


function EventRegistrationScreen({route, navigation}) {
  const {item, creds} = route.params;
  const {scrollHandler} = useInputScrollHandler({extraScrollHeight: 64});
  const [tpClicked, setTpClicked] = useState(false);
  return (

    <TouchableWithoutFeedback>
      <ScrollView {...scrollHandler} style={{paddingLeft: 8, paddingRight: 8}}>
        <View style={{...styles.container, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white'}}>
          <Text style={{fontWeight: "bold", fontSize: 24, color: '#109696', paddingTop: 16, paddingBottom: 16}}>
            {item.title}
          </Text>
          <Text style={{paddingBottom: 16, color: 'black', fontSize: 16}}>
            {item.body}
            {/* За обеспечение успешной подготовки спортсменов, добившихся высоких спортивных
            достижений на Играх XXXII Олимпиады и XVI Паралимпийских летних играх 2020 года в городе Токио
            (Япония), награждены Андрей Шишин,
            Сергей Загацкий, Наталия Корабельникова, Дмитрий Лазарев,
            Наталья Рощина, Виталий Гур1о, Сергей Валентинович Жилкин и другие. */}
          </Text>
        </View>
        <Text style={{margin: 16, fontWeight: "bold", fontSize: 24, color: '#000000'}}>
          Регистрация
        </Text>
        {/*{*/}
        {
          !tpClicked && store.getState().participantList.length === 0 ? <TouchableHighlight
            style={{
              borderRadius: 12,
              backgroundColor: "#109696",
              marginBottom: 16,
              marginTop: 16,
              width: '100%',
              alignSelf: 'center'
            }}>

            <Button title={'УЧАСТВОВАТЬ'} color={'white'} onPress={() => setTpClicked(true)}></Button>

          </TouchableHighlight> : null
        }

        {tpClicked || store.getState().participantList.length !== 0 ? <TeamSpecified/> : null}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default EventRegistrationScreen;