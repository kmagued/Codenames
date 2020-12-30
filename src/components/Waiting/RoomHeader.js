import React from "react";
import { View } from "react-native";
import TextComp from "../TextComp";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const RoomHeader = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Ionicons
        name="ios-arrow-round-back"
        color="white"
        size={50}
        onPress={props.onLeave}
      />
      <View style={{ marginHorizontal: 20 }}>
        <TextComp bold color={Colors.primaryColor} style={{ fontSize: 30 }}>
          {props.title}
        </TextComp>
        <TextComp style={{ fontSize: 20 }}>Waiting for players..</TextComp>
      </View>
    </View>
  );
};

export default RoomHeader;
