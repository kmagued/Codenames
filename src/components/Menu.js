import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import TextComp from "./TextComp";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { navigate } from "../navigation/navigationRef";

const Menu = (props) => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ ...styles.shadow, ...styles.circle }}
            activeOpacity={0.9}
            onPress={() => {
              navigate("Inbox");
            }}
          >
            <MaterialIcons
              name="chat-bubble"
              size={25}
              color={Colors.blueTeam}
            />
          </TouchableOpacity>
          <TextComp style={{ fontSize: 17 }}>Inbox</TextComp>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ ...styles.shadow, ...styles.mainCircle }}
            activeOpacity={0.9}
            onPress={() => {
              navigate("Rooms");
            }}
          >
            <MaterialIcons name="search" size={50} color={Colors.blueTeam} />
          </TouchableOpacity>
          <TextComp style={{ fontSize: 17 }}>Rooms</TextComp>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ ...styles.shadow, ...styles.circle }}
            activeOpacity={0.9}
            onPress={() => {
              navigate("Profile");
            }}
          >
            <MaterialIcons name="person" size={35} color={Colors.blueTeam} />
          </TouchableOpacity>
          <TextComp style={{ fontSize: 17 }}>My Profile</TextComp>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: Colors.blueTeam,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "white",
    marginTop: -25,
    justifyContent: "center",
    alignItems: "center",
  },
  mainCircle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "white",
    marginTop: -45,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
});

export default Menu;
