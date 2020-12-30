import React from "react";
import { ActivityIndicator } from "react-native";

const Loading = (props) => {
  return (
    <ActivityIndicator
      size="large"
      style={{ flex: 1, justifyContent: "center" }}
      color={props.color}
    />
  );
};

export default Loading;
