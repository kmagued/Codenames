import React from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";

const Check = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={props.onPress}
        activeOpacity={0.9}
      >
        {props.checked ? <View style={styles.checked} /> : null}
      </TouchableOpacity>
      <TextComp color="black" style={{ marginLeft: 5 }}>
        {props.text}
      </TextComp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Dimensions.get("window").height > 850 ? 35 : 25,
    marginVertical: 10,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    height: 13,
    width: 13,
    borderRadius: 6.5,
    backgroundColor: Colors.secondary,
  },
});

export default Check;
