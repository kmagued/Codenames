import React from "react";
import { Text } from "react-native";
import Fonts from "../constants/Fonts";

const TextComp = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        color: props.color || "white",
        fontFamily: props.bold ? Fonts.boldFont : Fonts.regularFont,
      }}
    >
      {props.children}
    </Text>
  );
};

export default TextComp;
