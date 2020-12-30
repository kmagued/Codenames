import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Menu from "../components/Menu";
import TextComp from "../components/TextComp";
import Colors from "../constants/Colors";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import AddFriend from "../components/AddFriend";
import NewConvo from "../components/NewConvo";
import {
  getUserDetails,
  acceptRequest,
  rejectRequest,
} from "../store/actions/users";
import FriendRequest from "../components/FriendRequest";

class InboxScreen extends React.Component {
  state = {
    addFriend: false,
    newConvo: false,
    chats: [
      {
        id: "1234",
        sender: "Besela",
        timeSent: "9:45 PM",
        msg: "Hello there! Wanna play a game?",
      },
      {
        id: "1235",
        sender: "Jayjay",
        timeSent: "9:32 PM",
        msg: "Haha I win",
      },
      {
        id: "1236",
        sender: "Farah",
        timeSent: "10:52 AM",
        msg:
          "I'll have breakfast first then we play! Are you okay with that my friend?",
      },
      {
        id: "1237",
        sender: "Douda",
        timeSent: "8:01 AM",
        msg: "Hahahahaha",
      },
    ],
  };

  componentDidMount() {
    this.props.get(this.props.user.username);
  }

  renderChat = (itemData) => {
    return (
      <TouchableOpacity style={styles.chatContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextComp color="black" bold style={{ fontSize: 18 }}>
            {itemData.item.sender}
          </TextComp>
          <TextComp color="grey">{itemData.item.timeSent}</TextComp>
        </View>

        <TextComp
          color="black"
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{ width: "80%" }}
        >
          {itemData.item.msg}
        </TextComp>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <AddFriend
          visible={this.state.addFriend}
          onClose={() => {
            this.setState({ addFriend: false });
          }}
        />
        <NewConvo
          visible={this.state.newConvo}
          onClose={() => {
            this.setState({ newConvo: false });
          }}
        />

        {/* HEADER */}
        <View style={styles.header}>
          <AntDesign
            name="adduser"
            color={Colors.blueTeam}
            size={30}
            onPress={() => {
              this.setState({ addFriend: true });
            }}
          />
          <TextComp bold color={Colors.blueTeam} style={{ fontSize: 30 }}>
            Inbox
          </TextComp>
          <Ionicons
            name="ios-create"
            color={Colors.blueTeam}
            size={30}
            onPress={() => {
              this.setState({ newConvo: true });
            }}
          />
        </View>

        {/* CHATS */}
        <View style={{ flex: 0.83 }}>
          {this.props.user.friends
            .filter((friend) => friend.accepted === false)
            .map((friend, id) => (
              <View key={id}>
                <FriendRequest
                  name={friend.name}
                  acceptRequest={() => {
                    this.props
                      .accept(this.props.user.username, friend.name)
                      .then(() => {
                        this.props.get(this.props.user.username);
                      });
                  }}
                  rejectRequest={() => {
                    this.props
                      .reject(this.props.user.username, friend.name)
                      .then(() => {
                        this.props.get(this.props.user.username);
                      });
                  }}
                />
              </View>
            ))}
          <FlatList
            data={this.props.user.chats}
            keyExtractor={(item) => item.id}
            renderItem={this.renderChat}
          />
        </View>

        {/* MENU */}
        <View style={styles.menuContainer}>
          <Menu />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  chatContainer: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  header: {
    flex: 0.05,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    flexDirection: "row",
  },
  menuContainer: {
    flex: 0.12,
    marginBottom: Dimensions.get("window").height > 670 ? -35 : 0,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  users: state.users.users,
});

const mapDispatchToProps = {
  get: getUserDetails,
  accept: acceptRequest,
  reject: rejectRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen);
