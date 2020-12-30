import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import TextComp from "../TextComp";
import Fonts from "../../constants/Fonts";
import MainBtn from "../MainBtn";

const GameClue = (props) => {
  const numOfClues = [1, 2, 3];
  const [number, setNumber] = useState(1);
  const [clue, setClue] = useState("");
  return props.turn.name === props.user && props.turn.role === "setter" ? (
    <View style={{ padding: 10, marginHorizontal: 10 }}>
      <View>
        <TextComp bold style={{ fontSize: 16 }}>
          Your Turn
        </TextComp>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Insert 1 word clue"
            value={clue}
            style={styles.input}
            onChangeText={(text) => setClue(text)}
          />
        </View>
        {numOfClues.map((num) => {
          return (
            <TouchableOpacity
              key={num}
              style={{
                ...styles.numberContainer,
                borderWidth: num === number,
              }}
              onPress={() => setNumber(num)}
            >
              <TextComp bold>{num.toString()}</TextComp>
            </TouchableOpacity>
          );
        })}

        <View style={{ width: "12%" }}>
          <Ionicons
            name="md-checkmark"
            size={30}
            style={styles.check}
            color={Colors.primaryColor}
            onPress={() => {
              props.onSubmitClue(clue, number);
              setClue("");
              setNumber(1);
            }}
          />
        </View>
      </View>
    </View>
  ) : (
    <View style={{ alignItems: "center" }}>
      {props.turn.role === "guesser" ? (
        <View style={{ alignItems: "center" }}>
          <TextComp bold style={{ fontSize: 20 }}>
            {props.clue}
            {" ("}
            {props.number}
            {")"}
          </TextComp>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {props.guesses.map((guess) => (
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "white",
                  padding: 7,
                  marginHorizontal: 5,
                }}
                key={guess}
              >
                <TextComp color="black">{guess}</TextComp>
              </View>
            ))}
          </View>
          {props.turn.name === props.user ? (
            <MainBtn
              backgroundColor="white"
              textColor="black"
              title="END TURN"
              onPress={props.onEndTurn}
            />
          ) : null}
        </View>
      ) : (
        <TextComp>{props.turn.name}'s Turn</TextComp>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    borderRadius: 20,
    padding: 7,
    backgroundColor: "white",
    width: "58%",
    marginRight: 8,
  },
  input: {
    fontFamily: Fonts.regularFont,
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    marginHorizontal: 2,
  },
  check: {
    marginLeft: 10,
  },
});

export default GameClue;
