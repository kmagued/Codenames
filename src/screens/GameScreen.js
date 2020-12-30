import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  Alert,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { submitClue, guessWord } from "../store/actions/rooms";
import io from "socket.io-client";
import Swiper from "react-native-swiper";
import Tab from "../components/Game/Tab";
import GameHeader from "../components/Game/GameHeader";
import GameClue from "../components/Game/GameClue";
import GameGrid from "../components/Game/GameGrid";
import Chat from "../components/Game/Chat";
import Colors from "../constants/Colors";
import TextComp from "../components/TextComp";

class GameScreen extends React.Component {
  state = {
    turn: {},
    messages: [],
    index: 0,
    clue: "",
    number: null,
    grid: this.props.rooms.find(
      (room) => room._id === this.props.navigation.getParam("roomId")
    ).grid,
    guesses: [],
    notify: false,
    ended: false,
  };

  componentDidMount() {
    const roomId = this.props.navigation.getParam("roomId");
    const room = this.props.rooms.find((element) => element._id === roomId);
    StatusBar.setBarStyle("dark-content");

    this.socket = io("http://7c9b228abf75.eu.ngrok.io", {
      transports: ["websocket"],
    });

    this.socket.emit("joinGame", room);
    this.setState({ turn: room.turn });

    this.socket.on("curSetterTurn", (data) => {
      this.setState({ turn: data });
    });

    this.socket.on("curGuesserTurn", (data) => {
      setTimeout(() => {
        this.setState({
          turn: data.turn,
          clue: data.clue,
          number: data.number,
          guesses: [],
        });
      });
    });

    this.socket.on("game finished", (data) => {
      this.setState({ ended: true });
      Alert.alert("Game finished", `Team ${data} wins`, [
        {
          text: "EXIT",
          onPress: () => {
            this.props.navigation.navigate("Rooms");
          },
        },
        {
          text: "CANCEL",
          style: "cancel",
        },
      ]);
    });

    this.socket.on("message", (data) => {
      if (data.user !== this.props.user.username) {
        this.setState({ notify: true });
      }
      this.setState({
        messages: [
          ...this.state.messages,
          { sender: { name: data.user, team: data.team }, text: data.msg },
        ],
      });
    });

    this.socket.on("grid", (data) => {
      this.setState({
        grid: data.grid,
        guesses: data.guesses,
      });
    });
  }

  filter = (grid, team) => {
    return grid
      .filter((word) => word.team === team)
      .sort((a, b) => b.guessed - a.guessed);
  };

  endTurn = () => {
    const roomId = this.props.navigation.getParam("roomId");
    const room = this.props.rooms.find((element) => element._id === roomId);

    this.socket.emit("nextSetter", {
      room,
      user: this.props.rooms.find((element) => element._id === roomId).turn,
    });
  };

  submitClue = (clue, number) => {
    const roomId = this.props.navigation.getParam("roomId");
    const room = this.props.rooms.find((element) => element._id === roomId);

    this.props.submit(room._id, this.props.user.username, clue).then(() => {
      if (this.props.error) {
        Alert.alert(this.props.error);
      } else {
        this.socket.emit("nextGuesser", {
          user: this.props.rooms.find((element) => element._id === roomId).turn,
          room,
          clue,
          number,
        });
      }
    });
  };

  guessHandler = (word) => {
    const roomId = this.props.navigation.getParam("roomId");

    if (this.state.turn.name === this.props.user.username) {
      Alert.alert("Lock word", word.text.toUpperCase(), [
        { text: "Cancel", style: "cancel" },
        {
          text: "Lock",
          onPress: () => {
            this.props
              .guess(
                roomId,
                word.text,
                this.state.turn,
                this.state.number,
                this.state.clue
              )
              .then(() => {
                const room = this.props.rooms.find(
                  (element) => element._id === roomId
                );

                this.socket.emit("updateGrid", {
                  room,
                  game: this.props.rooms.find((room) => room._id === roomId),
                  clue: this.state.clue,
                });
                if (
                  this.props.rooms.find((room) => room._id === roomId).ended
                ) {
                  if (this.props.error === "Game lost") {
                    this.socket.emit("lost", {
                      room,
                      user: this.state.turn,
                    });
                  } else {
                    this.socket.emit("won", {
                      room,
                      user: this.state.turn,
                      word,
                    });
                  }
                }
                if (this.props.error) {
                  this.socket.emit("nextSetter", {
                    room,
                    user: this.props.rooms.find(
                      (element) => element._id === roomId
                    ).turn,
                  });
                }
              });
          },
        },
      ]);
    }
  };

  render() {
    const roomId = this.props.navigation.getParam("roomId");
    const room = this.props.rooms.find((element) => element._id === roomId);

    return (
      <View style={{ flex: 1 }}>
        <Swiper
          loop={false}
          showsPagination={false}
          onIndexChanged={(index) => {
            if (index == 1) {
              this.setState({ notify: false });
            }
            this.setState({ index });
          }}
        >
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={styles.topContainer}>
              <GameHeader
                title={room.name}
                turn={this.state.turn}
                user={this.props.user.username}
                notification={this.state.notify}
              />
            </View>

            <View style={styles.mainContainer}>
              <GameGrid
                room={room}
                user={this.props.user.username}
                grid={this.state.grid}
                onGuess={this.guessHandler}
              />
            </View>
            {this.state.ended ? (
              <View
                style={{
                  flex: 0.2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextComp color="black">Game has ended</TextComp>
              </View>
            ) : (
              <View style={{ flex: 0.2 }}>
                <View style={styles.tabs}>
                  <Tab team={1} data={this.filter(this.state.grid, 1)} />
                  <Tab team={2} data={this.filter(this.state.grid, 2)} />
                </View>

                <View
                  style={{
                    ...styles.bottomContainer,
                    justifyContent:
                      this.state.turn.name === this.props.user.username &&
                      this.state.turn.role === "setter"
                        ? null
                        : "center",
                    backgroundColor:
                      this.state.turn.team === 1
                        ? Colors.blueTeam
                        : Colors.redTeam,
                  }}
                >
                  <GameClue
                    user={this.props.user.username}
                    turn={this.state.turn}
                    clue={this.state.clue}
                    number={this.state.number}
                    guesses={this.state.guesses}
                    onEndTurn={this.endTurn}
                    onSubmitClue={this.submitClue}
                  />
                </View>
              </View>
            )}
          </KeyboardAvoidingView>

          <Chat
            room={room}
            username={this.props.user.username}
            messages={this.state.messages}
            onSend={(msg) => {
              this.socket.emit("send message", {
                user: this.props.user.username,
                text: msg,
                team: room.activePlayers.find(
                  (player) => player.name === this.props.user.username
                ).team,
                room,
              });
            }}
          />
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.15,
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
  mainContainer: {
    flex: 0.65,
    alignItems: "center",
    marginTop: 30,
  },
  tabs: {
    flex: Dimensions.get("window").height > 670 ? 0.3 : 0.4,
    flexDirection: "row",
  },
  bottomContainer: {
    flex: Dimensions.get("window").height > 670 ? 0.7 : 0.6,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  error: state.rooms.error,
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = {
  submit: submitClue,
  guess: guessWord,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
