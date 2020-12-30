import React from "react";
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Overlay } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import TextComp from "./TextComp";
import Colors from "../constants/Colors";

class NewConvo extends React.Component {
  render() {
    return (
      <Overlay
        isVisible={this.props.visible}
        fullScreen={true}
        animationType="slide"
      >
        <SafeAreaView style={{ marginHorizontal: 10 }}>
          <View style={{ alignItems: "flex-end" }}>
            <Ionicons name="ios-close" size={25} onPress={this.props.onClose} />
          </View>
          <View style={{ alignItems: "center" }}>
            <TextComp color={Colors.blueTeam} bold style={{ fontSize: 22 }}>
              New Chat
            </TextComp>
          </View>
        </SafeAreaView>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 2.5,
    borderRadius: 25,
    backgroundColor: "#e6e6e6",
  },
});

export default NewConvo;
