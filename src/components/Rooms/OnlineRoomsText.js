import React from "react";
import { View } from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";

const OnlineRoomsText = (props) => {
  return (
    <View>
      <TextComp style={{ fontSize: 36 }} bold>
        Online <TextComp>Rooms</TextComp>
      </TextComp>
    </View>
  );
};

export default OnlineRoomsText;
