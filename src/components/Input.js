import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const Input = (props) => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      {props.icon}
      <TextInput
        {...props}
        style={{
          ...styles.input,
          borderWidth: props.active ? 2 : null,
        }}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: Colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    width: "80%",
    fontSize: 15,
    color: Colors.secondary,
    fontFamily: Fonts.regularFont,
  },
});

export default Input;
