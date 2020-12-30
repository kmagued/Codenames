import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import TextComp from "../TextComp";
import Colors from "../../constants/Colors";
import AddButton from "./AddButton";
import ActivePlayer from "./ActivePlayer";

const TeamCard = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      <View
        style={{
          ...styles.container,
          backgroundColor:
            props.team === "A" ? Colors.secondary : Colors.blueTeam,
          flex: 0.18,
        }}
      >
        <TextComp bold style={{ fontSize: 20 }}>
          Team {props.team}
        </TextComp>
      </View>
      <View style={{ ...styles.container, flex: 0.82 }}>
        <FlatList
          horizontal
          scrollEnabled={false}
          keyExtractor={(item) => item.name}
          data={props.players.filter((player) => player.role === "setter")}
          renderItem={(itemData) => <ActivePlayer player={itemData.item} />}
          ListEmptyComponent={
            <AddButton
              color={props.team === "A" ? Colors.secondary : Colors.blueTeam}
              backgroundColor="#f7f1db"
              text={`Join as\nSetter`}
              onJoin={() => props.onJoin("setter")}
            />
          }
        />
        <FlatList
          horizontal
          scrollEnabled={false}
          keyExtractor={(item) => item.name}
          data={props.players.filter((player) => player.role === "guesser")}
          renderItem={(itemData) => <ActivePlayer player={itemData.item} />}
          ListEmptyComponent={
            <AddButton
              color={props.team === "A" ? Colors.secondary : Colors.blueTeam}
              backgroundColor={props.team === "B" ? "#cbd3e3" : "#f6d7d6"}
              text={`Join as\nGuesser`}
              onJoin={() => {
                props.onJoin("guesser");
              }}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: "hidden",
    width: 300,
    borderRadius: 30,
    marginVertical: 7,
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TeamCard;
