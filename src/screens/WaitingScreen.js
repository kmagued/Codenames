import React from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { leaveRoom, addPlayer, fetchRooms } from "../store/actions/rooms";
import io from "socket.io-client";
import Colors from "../constants/Colors";
import RoomHeader from "../components/Waiting/RoomHeader";
import TeamCard from "../components/Waiting/TeamCard";
import TextComp from "../components/TextComp";

class WaitingScreen extends React.Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const id = this.props.navigation.getParam("room")._id;
    const room = this.props.rooms.find((element) => element._id === id);
    this.socket = io("http://7c9b228abf75.eu.ngrok.io", {
      transports: ["websocket"],
    });

    this.socket.emit("join", room);
    this.setState({
      players: room.activePlayers,
    });

    this.socket.on("players", (data) => {
      this.setState({ players: data });

      if (data.length === room.numOfPlayers) {
        this.props.fetch().then(() => {
          this.props.navigation.navigate("Game", { roomId: room._id });
        });
      }
    });
  }

  leaveRoom = () => {
    const room = this.props.navigation.getParam("room");

    Alert.alert("", "Are you sure you want to leave the game?", [
      {
        text: "Leave",
        style: "destructive",
        onPress: () => {
          this.props.leave(room._id, this.props.user).then(() => {
            this.socket.emit("leave", room);
            this.socket.emit(
              "update",
              this.props.rooms.find((element) => element._id === room._id)
            );
          });
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  render() {
    const room = this.props.navigation.getParam("room");

    return (
      <View style={styles.screen}>
        <View style={{ ...styles.header, flex: 0.2 }}>
          <RoomHeader title={room.name} onLeave={this.leaveRoom} />
        </View>
        <View style={{ ...styles.container, flex: 0.7 }}>
          <TeamCard
            room={room}
            team="A"
            players={this.state.players.filter((player) => player.team === 1)}
            style={{ marginTop: -22 }}
            onJoin={(role) => {
              this.props.add(room._id, this.props.user, role, 1).then(() => {
                this.socket.emit(
                  "update",
                  this.props.rooms.find((element) => element._id === room._id)
                );
              });
            }}
          />
          <TeamCard
            room={room}
            team="B"
            players={this.state.players.filter((player) => player.team === 2)}
            onJoin={(role) => {
              this.props.add(room._id, this.props.user, role, 2).then(() => {
                this.socket.emit(
                  "update",
                  this.props.rooms.find((element) => element._id === room._id)
                );
              });
            }}
          />
        </View>
        <View style={{ ...styles.container, flex: 0.1 }}>
          <TouchableOpacity
            style={{ ...styles.container, ...styles.btnContainer }}
          >
            <TextComp color={Colors.blueTeam} style={{ fontSize: 18 }}>
              Invite Friends
            </TextComp>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.blueTeam,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "50%",
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    padding: 5,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  rooms: state.rooms.rooms,
  start: state.rooms.start,
});

const mapDispatchToProps = {
  leave: leaveRoom,
  fetch: fetchRooms,
  add: addPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingScreen);
