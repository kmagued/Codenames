import React from "react";
import { View, Text } from "react-native";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

const Log = (props) => {
  return (
    <View style={{ alignItems: "center", backgroundColor: Colors.secondary }}>
      {props.text ? (
        <Text style={{ fontFamily: Fonts.regularFont }}>{props.text}</Text>
      ) : null}
    </View>
  );
};

export default Log;
