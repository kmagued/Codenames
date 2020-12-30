import React from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import TextComp from "./TextComp";

const MainBtn = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...props.style,
        ...styles.btn,
        backgroundColor: props.backgroundColor,
      }}
    >
      {props.loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <TextComp
          style={{ ...props.textStyle, fontSize: 18 }}
          bold
          color={props.textColor}
        >
          {props.title}
        </TextComp>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 40,
    padding: 5,
    alignItems: "center",
    marginVertical: 8,
  },
});

export default MainBtn;
