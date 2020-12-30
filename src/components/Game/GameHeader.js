import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import TextComp from "../TextComp";

const GameHeader = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={styles.titleContainer}>
        <Ionicons
          name="ios-arrow-round-back"
          size={40}
          onPress={props.onLeave}
        />
        <TextComp bold style={{ fontSize: 26 }} color="black">
          {props.title}
        </TextComp>
        <View>
          <MaterialIcons
            name="chat-bubble-outline"
            size={28}
            onPress={props.onChat}
          />
          {props.notification ? <View style={styles.notification} /> : null}
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextComp color="black" style={{ fontSize: 16 }}>
          {props.turn.name === props.user
            ? "Your turn".toUpperCase()
            : (props.turn.name + "'s turn").toUpperCase()}
        </TextComp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notification: {
    height: 12,
    width: 12,
    borderRadius: 6,
    position: "absolute",
    backgroundColor: "red",
  },
});

export default GameHeader;
