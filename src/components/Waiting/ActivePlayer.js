import React from "react";
import { View, StyleSheet } from "react-native";
import TextComp from "../TextComp";
import Colors from "../../constants/Colors";

const ActivePlayer = (props) => {
  return (
    <View style={{ alignItems: "center", marginTop: 10, marginHorizontal: 10 }}>
      <View style={styles.circle}>
        <TextComp bold>
          {props.player.name.substring(0, 2).toUpperCase()}
        </TextComp>
      </View>
      <TextComp
        bold
        color={props.player.team === 2 ? Colors.blueTeam : Colors.secondary}
        style={{ textAlign: "center" }}
      >
        {props.player.name}
      </TextComp>
      <TextComp
        color={props.player.team === 2 ? Colors.blueTeam : Colors.secondary}
      >
        {props.player.role.substring(0, 1).toUpperCase() +
          props.player.role.substring(1)}
      </TextComp>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActivePlayer;
