import React from "react";
import {
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  setColor,
  setTextColor,
  setBackgroundColor,
} from "../../constants/Colors";
import TextComp from "../TextComp";

const GameGrid = (props) => {
  return (
    <FlatList
      style={{ marginTop: -15 }}
      scrollEnabled={false}
      numColumns={4}
      data={props.grid}
      renderItem={(itemData) => {
        const user = props.room.activePlayers.find(
          (player) => player.name === props.user
        );
        return user.role === "setter" ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.card,
              backgroundColor: itemData.item.guessed
                ? setBackgroundColor(itemData.item.team)
                : setColor(itemData.item.team),
              borderColor: itemData.item.team === 3 ? "black" : null,
              borderWidth: itemData.item.team === 3 ? 2 : 0,
            }}
          >
            <TextComp
              color={setTextColor(itemData.item.team)}
              bold={itemData.item.team === 3}
              style={styles.word}
            >
              {itemData.item.guessed ? "" : itemData.item.text.toUpperCase()}
            </TextComp>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.card,
              backgroundColor: itemData.item.guessed
                ? setBackgroundColor(itemData.item.team)
                : "#f7f1db",
            }}
            onPress={
              !itemData.item.guessed
                ? () => props.onGuess(itemData.item)
                : () => {}
            }
          >
            <TextComp color="black" style={styles.word}>
              {itemData.item.guessed ? "" : itemData.item.text.toUpperCase()}
            </TextComp>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item._id}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width / 4.6,
    height:
      Dimensions.get("window").height > 670
        ? Dimensions.get("window").width / 4.8
        : Dimensions.get("window").width / 6,
    borderRadius: Dimensions.get("window").width / 9.6,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    fontSize: 11,
    padding: 10,
  },
});

export default GameGrid;
