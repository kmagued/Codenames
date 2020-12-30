import React from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { joinRoom, fetchRooms } from "../../store/actions/rooms";
import { navigate } from "../../navigation/navigationRef";
import Room from "./Room";

class RoomsList extends React.Component {
  state = { loading: false };

  sort = (rooms, user) => {
    rooms = rooms.filter((room) => room.activePlayers);
    rooms.sort((a, b) => {
      if (
        a.activePlayers.find((player) => player.name === user.username) &&
        !b.activePlayers.find((player) => player.name === user.username)
      ) {
        return -1;
      }
    });
    // rooms.unshift({});

    return rooms;
  };

  renderRoom = (itemData) => {
    // return itemData.index === 0 ? (
    //   <Room create onCreate={this.props.onCreate} />
    // ) : (
    return (
      <Room
        user={this.props.user}
        room={itemData.item}
        onJoin={(password) => {
          this.props
            .join(itemData.item._id, password, this.props.user)
            .then(() => {
              if (this.props.error) {
                alert(this.props.error);
              } else {
                this.setState({ loading: true });
                this.props.fetch().then(() => {
                  this.setState({ loading: false });
                  if (
                    itemData.item.activePlayers.length ===
                    itemData.item.numOfPlayers
                  ) {
                    navigate("Game", { roomId: itemData.item._id });
                  } else {
                    navigate("Waiting", {
                      room: this.props.rooms.find(
                        (room) => room._id === itemData.item._id
                      ),
                    });
                  }
                });
              }
            });
        }}
      />
    );
  };

  render() {
    return (
      <FlatList
        refreshing={this.props.refresh}
        onRefresh={this.props.onRefresh}
        showsVerticalScrollIndicator={false}
        data={this.sort(this.props.rooms, this.props.user)}
        keyExtractor={(room) => room._id}
        renderItem={this.renderRoom}
      />
    );
  }
}

const mapDispatchToProps = {
  join: joinRoom,
  fetch: fetchRooms,
};

const mapStateToProps = (state) => ({
  user: state.users.user,
  error: state.rooms.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);
