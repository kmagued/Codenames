import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";

const Tab = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.tab,
        backgroundColor: props.team === 1 ? Colors.blueTeam : Colors.redTeam,
      }}
      activeOpacity={0.9}
      onPress={props.onOpen}
    >
      <TextComp bold>{props.team === 1 ? "TEAM 1" : "TEAM 2"}</TextComp>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {props.data.map((word, id) => {
          if (word.guessed === true && word.team !== 0) {
            return (
              <View style={{ ...styles.circle }} key={id}>
                <View style={styles.smallCircle} />
              </View>
            );
          } else {
            return <View style={styles.circle} key={id} />;
          }
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    margin: 2,
  },
  smallCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
  },
  tab: {
    width: "50%",
    paddingTop: 5,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: -8,
    position: "relative",
  },
});

export default Tab;
