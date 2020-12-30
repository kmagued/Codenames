import React from "react";
import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import { connect } from "react-redux";
import { fetchRooms, createRoom, filterRooms } from "../store/actions/rooms";
import CreateRoom from "../components/Rooms/CreateRoom";
import Colors from "../constants/Colors";
import FiltersBar from "../components/Rooms/FiltersBar";
import OnlineRoomsText from "../components/Rooms/OnlineRoomsText";
import RoomsList from "../components/Rooms/RoomsList";
import { Ionicons } from "@expo/vector-icons";
import Menu from "../components/Menu";
import SearchBar from "../components/SearchBar";
import MainBtn from "../components/MainBtn";

class RoomsScreen extends React.Component {
  state = {
    isLoading: true,
    isRefreshing: false,
    visible: false,
    locked: false,
    full: false,
  };

  componentDidMount() {
    this.loadRooms().then(() => {
      this.setState({
        isLoading: false,
      });
    });
  }

  loadRooms = async () => {
    this.setState({ isRefreshing: true });
    await this.props.fetchRooms();
    await this.props.filter(this.state.locked, this.state.full);
    this.setState({ isRefreshing: false });
  };

  createRoom = (name, password, players, time) => {
    this.props.create(name, password, players, time);
  };

  cancelCreate = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <View style={styles.screen}>
        <View style={{ flex: 1 }}>
          <CreateRoom
            user={this.props.user}
            visible={this.state.visible}
            onCreate={this.createRoom}
            onCancel={this.cancelCreate}
          />

          <View style={styles.headerContainer}>
            <Ionicons
              name="ios-arrow-round-back"
              color="white"
              size={60}
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            />
            <OnlineRoomsText />
          </View>

          {/* <View
            style={{
              ...styles.container,
              flex: 0.2,
              justifyContent: "flex-end",
            }}
          > */}
          {/* <FiltersBar
              filter={(locked, full) => {
                this.setState({ locked, full });
                this.props.filter(locked, full);
              }}
            />
          </View> */}

          <View style={{ ...styles.container, ...styles.mainContainer }}>
            <View
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 2,
                width: "85%",
                borderColor: "#ccc",
              }}
            >
              <SearchBar />
              <MainBtn
                title="CREATE ROOM"
                backgroundColor="white"
                textColor={Colors.blueTeam}
                style={{ width: "100%", paddingVertical: 13 }}
                onPress={() => {
                  this.setState({ visible: true });
                }}
              />
            </View>

            <View style={{ flex: 0.75 }}>
              <RoomsList
                refresh={this.state.isRefreshing}
                onRefresh={this.loadRooms}
                rooms={this.props.filteredRooms.filter(
                  (room) =>
                    !room.ended &&
                    (room.activePlayers.length !== room.numOfPlayers ||
                      room.activePlayers.find(
                        (player) => player.name === this.props.user.username
                      ))
                )}
                user={this.props.user}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.1,
            }}
          >
            <Menu
              onCheckProfile={() => {
                this.props.navigation.navigate("Profile");
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#e6e6e6",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 0.7,
    backgroundColor: "#e6e6e6",
    borderTopLeftRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -35,
  },
  headerContainer: {
    flex: 0.2,
    backgroundColor: Colors.secondary,
    paddingTop: 40,
    paddingLeft: 20,
  },
});

const mapDispatchToProps = {
  fetchRooms,
  create: createRoom,
  filter: filterRooms,
};

const mapStateToProps = (state) => ({
  user: state.users.user,
  rooms: state.rooms.rooms,
  error: state.rooms.error,
  filteredRooms: state.rooms.filteredRooms,
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsScreen);
