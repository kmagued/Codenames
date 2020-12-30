import React from "react";
import { View, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";

const GameTitle = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <TextComp
        bold
        style={{
          fontSize: 60,
          textAlign: "center",
          lineHeight: 48,
          paddingTop: 30,
        }}
        color={Colors.primaryColor}
      >
        CODE{"\n"}
        <TextComp bold>NAMES</TextComp>
      </TextComp>
      <TextComp style={{ fontSize: 18, marginTop: -10 }} color="#ccc">
        Signed in as{" "}
        <TextComp color="#ccc" bold>
          {props.user.username}
        </TextComp>
      </TextComp>
    </View>
  );
};

export default GameTitle;
