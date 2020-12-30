import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";
import Fonts from "../../constants/Fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Chat = (props) => {
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#ededed" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.titleContainer}>
          <TextComp bold style={{ fontSize: 25 }}>
            Group Chat
          </TextComp>
        </View>
        <View style={styles.chatContainer}>
          <FlatList
            invertStickyHeaders
            style={{ width: "90%" }}
            data={props.messages}
            renderItem={(itemData) => {
              return (
                <View
                  style={{
                    justifyContent:
                      props.username === itemData.item.sender.name
                        ? "flex-end"
                        : "flex-start",
                    flexDirection: "row",
                    paddingHorizontal: 7,
                    paddingVertical: 4,
                  }}
                >
                  {props.username === itemData.item.sender.name ? null : (
                    <View style={styles.nameContainer}>
                      <TextComp bold>
                        {itemData.item.sender.name
                          .substring(0, 2)
                          .toUpperCase()}
                      </TextComp>
                    </View>
                  )}
                  <View style={styles.messageContainer}>
                    <TextComp
                      style={{
                        fontSize: 18,
                        lineHeight: 23,
                        paddingTop: 5,
                      }}
                      color={
                        itemData.item.sender.team === 2
                          ? Colors.redTeam
                          : Colors.blueTeam
                      }
                    >
                      {itemData.item.text}
                    </TextComp>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.text + Math.random().toString()}
          />
        </View>
        <View style={styles.footerContainer}>
          <View
            style={{
              ...styles.inputContainer,
              borderColor: props.room.activePlayers.find(
                (player) => player.name === props.username && player.team === 1
              )
                ? Colors.blueTeam
                : Colors.redTeam,
            }}
          >
            <TextInput
              value={text}
              onChangeText={(text) => {
                setText(text);
              }}
              style={{
                fontSize: 18,
                fontFamily: Fonts.regularFont,
              }}
            />
          </View>
          <MaterialCommunityIcons
            name="send-circle"
            color={
              text.trim().length === 0
                ? "white"
                : props.room.activePlayers.find(
                    (player) =>
                      player.name === props.username && player.team === 1
                  )
                ? Colors.blueTeam
                : Colors.redTeam
            }
            size={50}
            onPress={
              text.trim().length === 0
                ? () => {}
                : () => {
                    props.onSend(text);
                    setText("");
                  }
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flex: 0.1,
    paddingBottom: 10,
    backgroundColor: Colors.primaryColor,
  },
  nameContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  chatContainer: {
    flex: 0.78,
    alignItems: "center",
    marginTop: 10,
  },
  footerContainer: {
    flex: 0.12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 0.9,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: "white",
    borderWidth: 2,
  },
  messageContainer: {
    backgroundColor: "white",
    marginLeft: 8,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 3,
    maxWidth: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
