import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

function NewsScreen(props) {
  const check = () => {
    props.navigation.navigate("ScheduleScreen")
  };

  return (
    <TouchableOpacity onPress={check}>
      <View>
        <Text>NewsScreen</Text>
      </View>
    </TouchableOpacity>
  );
}

export default NewsScreen;
