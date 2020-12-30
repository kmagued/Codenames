import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import TextComp from "./TextComp";

const CreateInput = (props) => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <TextComp color="black" style={styles.text}>
        {props.name}
      </TextComp>
      <TextInput
        {...props}
        style={{
          ...styles.input,
          color: props.inputColor,
        }}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
});

export default CreateInput;
