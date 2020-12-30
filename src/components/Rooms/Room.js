import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PlayersIconGroup from "./PlayerIconGroup";
import TextComp from "../TextComp";

const Room = (props) => {
  const [password, setPassword] = useState("");
  const [activeGame, setActiveGame] = useState(false);

  props.create
    ? null
    : useEffect(() => {
        props.room.activePlayers.map((player) => {
          if (player.name === props.user.username) {
            setActiveGame(true);
          }
        });
      }, []);

  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          width: Dimensions.get("window").width / 1.2,
          height: Dimensions.get("window").width / 3.3,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          marginVertical: 7,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            ...styles.cardStyle,
            // borderWidth: activeGame ? 3 : null,
          }}
        >
          {/* {props.room.password ? (
          <View style={styles.lock}>
            <Ionicons name="ios-lock" size={30} color={Colors.secondary} />
          </View>
          ) : null} */}
          <View
            style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
          >
            <TextComp color="black" bold style={styles.title}>
              {props.room.name}
            </TextComp>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextComp color="black" style={{ marginRight: 5, fontSize: 18 }}>
                Players
              </TextComp>
              <PlayersIconGroup
                numOfPlayers={props.room.numOfPlayers}
                players={props.room.activePlayers}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="md-time" size={17} />
              <TextComp style={{ ...styles.text, marginLeft: 5 }} color="black">
                {props.room.timeLimit === 0
                  ? "No Limit"
                  : props.room.timeLimit + " mins"}
              </TextComp>
            </View>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.onJoin(password)}
          >
            <TextComp color="black" bold style={{ fontSize: 18 }}>
              Join
            </TextComp>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "white",
    borderRadius: 20,
    borderTopRightRadius: 0,
    width: Dimensions.get("window").width / 1.55,
    height: Dimensions.get("window").width / 3.3,
    padding: 10,
    borderColor: Colors.secondary,
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
  },
  btn: {
    justifyContent: "center",
    width: 70,
    alignItems: "center",
    marginRight: -80,
  },
  title: {
    fontSize: 28,
    lineHeight: 25,
    paddingTop: 10,
  },
  createText: {
    fontSize: 23,
    textAlign: "center",
    lineHeight: 25,
    padding: 5,
  },
  lock: {
    alignItems: "flex-end",
    marginTop: -20,
    marginRight: -13,
    marginBottom: -15,
  },
});

export default Room;
