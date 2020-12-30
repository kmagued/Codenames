import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Overlay } from "react-native-elements";
import TextComp from "./TextComp";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { searchUsers, sendFriendRequest } from "../store/actions/users";

class AddFriend extends React.Component {
  state = {
    input: "",
    search: false,
    sent: false,
    loading: false,
  };

  render() {
    return (
      <Overlay isVisible={this.props.visible} overlayStyle={styles.overlay}>
        <View style={{ marginHorizontal: 10 }}>
          <View style={{ alignItems: "flex-end" }}>
            <Ionicons name="ios-close" size={25} onPress={this.props.onClose} />
          </View>
          <View style={{ alignItems: "center" }}>
            <TextComp color={Colors.blueTeam} bold style={{ fontSize: 24 }}>
              Find Friends
            </TextComp>
          </View>
          <View style={styles.container}>
            <Ionicons name="ios-search" size={25} color="grey" />
            <TextInput
              autoCorrect={false}
              value={this.state.input}
              style={styles.input}
              placeholder="Search by username..."
              onChangeText={(text) => {
                this.setState({ input: text });
              }}
              onSubmitEditing={() => {
                this.setState({ loading: true, search: false });
                this.props.search(this.state.input).then(() => {
                  this.setState({ loading: false, search: true });
                });
              }}
            />
          </View>
          <FlatList
            data={this.props.users}
            ListEmptyComponent={
              this.state.search ? (
                <View style={{ alignItems: "center" }}>
                  <TextComp color={Colors.blueTeam}>No users found</TextComp>
                </View>
              ) : null
            }
            renderItem={(itemData) => {
              return this.state.loading ? (
                <ActivityIndicator size="small" />
              ) : (
                <View style={styles.user}>
                  <TextComp>{itemData.item.username}</TextComp>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      this.props
                        .send(this.props.user.username, itemData.item.username)
                        .then(() => {
                          this.setState({ sent: true });
                        });
                    }}
                  >
                    {this.props.user.username === itemData.item.username ||
                    this.props.user.friends.find((friend) => {
                      friend.name === itemData.item.username;
                    }) ? null : (
                      <TextComp bold>
                        {this.state.sent ? "Request Sent" : "Add Friend"}
                      </TextComp>
                    )}
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 2.5,
    borderRadius: 25,
    backgroundColor: "#e6e6e6",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
    marginBottom: 20,
  },
  input: {
    paddingVertical: 10,
    width: "90%",
  },
  user: {
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.blueTeam,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  users: state.users.users,
});

const mapDispatchToProps = {
  search: searchUsers,
  send: sendFriendRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);
