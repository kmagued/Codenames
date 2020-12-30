import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Overlay } from "react-native-elements";
import CreateInput from "../CreateInput";
import Check from "./Check";
import { Ionicons } from "@expo/vector-icons";
import TextComp from "../TextComp";
import Colors from "../../constants/Colors";

const CreateRoom = (props) => {
  const numOfPlayers = [2, 4, 6, 8];
  const timeLimit = [1, 3, 5, 0];
  const [password, setPassword] = useState("");
  const [name, setName] = useState(props.user.username + "'s Room");
  const [player, setPlayer] = useState(4);
  const [curTime, setCurTime] = useState(3);

  return (
    <Overlay overlayStyle={styles.overlay} isVisible={props.visible}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View>
          <View style={{ alignItems: "flex-end", marginRight: 10 }}>
            <Ionicons name="ios-close" size={30} onPress={props.onCancel} />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <CreateInput
              inputColor={Colors.secondary}
              name="Room Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <CreateInput
              inputColor={Colors.secondary}
              name="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TextComp style={{ fontSize: 16 }} color="black">
              Number Of Players
            </TextComp>
            <View style={styles.container}>
              {numOfPlayers.map((num) => {
                return (
                  <Check
                    key={num}
                    text={num.toString()}
                    checked={player === num}
                    onPress={() => setPlayer(num)}
                  />
                );
              })}
            </View>
            <TextComp style={{ fontSize: 16 }} color="black">
              Timer
            </TextComp>
            <View style={styles.container}>
              {timeLimit.map((time) => {
                return (
                  <Check
                    key={time}
                    text={
                      time === 0 ? "No time limit" : time.toString() + " mins"
                    }
                    checked={curTime === time}
                    onPress={() => setCurTime(time)}
                  />
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={() => props.onCreate(name, password, player, curTime)}
          >
            <TextComp bold style={{ fontSize: 18 }}>
              Create Room
            </TextComp>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  overlay: {
    width: Dimensions.get("window").width / 1.25,
    borderRadius: 30,
    overflow: "hidden",
  },
  btn: {
    backgroundColor: Colors.secondary,
    marginHorizontal: -10,
    marginTop: 20,
    marginBottom: -15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
});

export default CreateRoom;
