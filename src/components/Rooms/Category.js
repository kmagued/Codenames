import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PlayersIconGroup from "./PlayerIconGroup";
import Colors from "../../constants/Colors";
import Check from "./Check";
import TextComp from "../TextComp";

const Room = (props) => {
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState(1);
  const [setter, setSetter] = useState(0);
  const [guesser, setGuesser] = useState(0);
  const [team1, setTeam1] = useState(0);
  const [team2, setTeam2] = useState(0);
  const [setterTeam, setSetterTeam] = useState();
  const [guesserTeam, setGuesserTeam] = useState();
  const [activeGame, setActiveGame] = useState(false);

  useEffect(() => {
    let set = 0;
    let guess = 0;
    let one = 0;
    let two = 0;
    let guess1 = 0;
    let guess2 = 0;

    props.room.activePlayers.map((player) => {
      if (player.name === props.user.username) {
        setActiveGame(true);
      }
      if (player.role === "setter") {
        if (player.team === 1) {
          one = one + 1;
          setTeam1(one);
        } else {
          two = two + 1;
          setTeam2(two);
        }
        setSetterTeam(player.team);
        set = set + 1;
        setSetter(set);
      }
      if (player.role === "guesser") {
        if (player.team === 1) {
          guess1 = guess + 1;
          if (guess1 === (props.room.numOfPlayers - 2) / 2) {
            setGuesserTeam(1);
          }
          one = one + 1;
          setTeam1(one);
        } else {
          guess2 = guess2 + 1;
          if (guess2 === (props.room.numOfPlayers - 2) / 2) {
            setGuesserTeam(2);
          }
          two = two + 1;
          setTeam2(two);
        }
        guess = guess + 1;
        setGuesser(guess);
      }
    });
    if (one === props.room.numOfPlayers / 2) {
      setTeam(2);
    }
  }, []);

  return props.visible ? (
    <View
      style={{
        ...styles.cardStyle,
        borderWidth: activeGame ? 3 : null,
        borderColor: activeGame ? Colors.secondary : null,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ ...styles.container, flex: 0.2 }}>
          <TextComp
            style={styles.title}
            bold
            numberOfLines={2}
            color={Colors.primaryColor}
          >
            {props.room.name}
          </TextComp>
          {props.room.password ? (
            <TextComp style={styles.text} color="grey">
              Private
            </TextComp>
          ) : null}
        </View>

        <View style={{ ...styles.container, flex: 0.5 }}>
          <View style={{ flexDirection: "row" }}>
            <PlayersIconGroup
              numOfPlayers={props.room.numOfPlayers}
              players={props.room.activePlayers}
            />
          </View>
          <TextComp style={styles.text} color="black">
            {props.room.activePlayers.length}/{props.room.numOfPlayers} Players
          </TextComp>
          <View style={{ ...styles.container, ...styles.timeInfo }}>
            <Ionicons name="md-time" size={25} color={Colors.primaryColor} />
            <TextComp style={{ ...styles.text, marginLeft: 5 }} color="black">
              {props.room.timeLimit} mins
            </TextComp>
          </View>
          {activeGame ? null : (
            <View style={{ flexDirection: "row" }}>
              <Check
                text="1"
                onPress={() => {
                  setTeam(1);
                }}
                checked={team === 1}
                disabled={team1 === props.room.numOfPlayers / 2}
                color={
                  team1 === props.room.numOfPlayers / 2
                    ? "#ccc"
                    : Colors.primaryColor
                }
              />
              <Check
                text="2"
                onPress={() => {
                  setTeam(2);
                }}
                checked={team === 2}
                disabled={team2 === props.room.numOfPlayers / 2}
                color={
                  team2 === props.room.numOfPlayers / 2
                    ? "#ccc"
                    : Colors.primaryColor
                }
              />
            </View>
          )}
        </View>

        {!activeGame ? (
          <View style={{ ...styles.container, flex: 0.2 }}>
            {props.room.activePlayers.length === props.room.numOfPlayers ? (
              <TextComp style={styles.text} bold color="black">
                Room full
              </TextComp>
            ) : (
              <TextComp style={styles.text} color="black">
                Join as
              </TextComp>
            )}
            <View style={{ width: "80%" }}>
              {setter === 2 || (setterTeam === 1 && team === 1) ? null : (
                <TouchableOpacity
                  style={{ ...styles.btn, borderColor: Colors.primaryColor }}
                  onPress={() => props.onJoin("setter", team, password)}
                >
                  <TextComp
                    color={Colors.primaryColor}
                    style={{ fontSize: 20 }}
                  >
                    SETTER
                  </TextComp>
                </TouchableOpacity>
              )}
              {guesser === props.room.numOfPlayers - 2 ||
              (guesserTeam === 1 && team === 1) ||
              (guesserTeam === 2 && team === 2) ? null : (
                <TouchableOpacity
                  style={{ ...styles.btn, borderColor: Colors.secondary }}
                  onPress={() => props.onJoin("guesser", team, password)}
                >
                  <TextComp color={Colors.secondary} style={{ fontSize: 20 }}>
                    GUESSER
                  </TextComp>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View style={{ flex: 0.2, alignItems: "center" }}>
            <View style={{ width: "80%" }}>
              <TouchableOpacity
                style={{ ...styles.btn, borderColor: "green" }}
                onPress={() => props.onJoin()}
              >
                <TextComp color="green" style={{ fontSize: 20 }}>
                  JOIN
                </TextComp>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    height: Dimensions.get("window").height > 900 ? 500 : 380,
    width: Dimensions.get("window").height > 900 ? 350 : 260,
    marginHorizontal: 15,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  timeInfo: {
    flexDirection: "row",
    marginVertical: 10,
  },
  btn: {
    borderRadius: 20,
    marginVertical: 4,
    borderWidth: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default Room;
