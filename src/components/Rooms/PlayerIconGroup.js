import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const checkNumberOfPlayers = (list, n) => {
  let players = [];
  for (var i = 0; i < n; i++) {
    if (list[i]) {
      players.push({ id: i, found: true });
    } else {
      players.push({ id: i, found: false });
    }
  }
  return players;
};

const PlayerIconGroup = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {checkNumberOfPlayers(props.players, props.numOfPlayers).map((player) => {
        if (player.found === false) {
          return (
            <FontAwesome
              name="circle"
              size={12}
              color="#e1eac4"
              key={player.id}
              style={{ marginHorizontal: 1 }}
            />
          );
        } else {
          return (
            <FontAwesome
              name="circle"
              size={12}
              color={Colors.primaryColor}
              key={player.id}
            />
          );
        }
      })}
    </View>
  );
};

export default PlayerIconGroup;
