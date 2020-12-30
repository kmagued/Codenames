import React from "react";
import { View, StyleSheet } from "react-native";
import TextComp from "./TextComp";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const FriendRequest = (props) => {
  return (
    <View style={styles.container} key={props.key}>
      <TextComp bold color="black" style={{ fontSize: 18 }}>
        {props.name}
      </TextComp>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="ios-close-circle"
          color="red"
          size={40}
          style={{ marginRight: 10 }}
          onPress={props.rejectRequest}
        />
        <Ionicons
          name="ios-checkmark-circle"
          color={Colors.primaryColor}
          size={40}
          onPress={props.acceptRequest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e6e6",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default FriendRequest;
