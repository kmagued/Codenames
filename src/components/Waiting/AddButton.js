import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextComp from "../TextComp";

const AddButton = (props) => {
  return (
    <View
      key={props.key}
      style={{
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        style={{
          height: 25,
          width: 25,
          borderRadius: 12.5,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: props.backgroundColor,
          marginBottom: 2,
        }}
        activeOpacity={0.6}
        onPress={props.onJoin}
      >
        <Ionicons name="ios-add" size={22} color={props.color} />
      </TouchableOpacity>
      <TextComp color={props.color} style={{ textAlign: "center" }}>
        {props.text}
      </TextComp>
    </View>
  );
};

export default AddButton;
