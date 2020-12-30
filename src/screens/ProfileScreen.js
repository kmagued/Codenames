import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import TextComp from "../components/TextComp";
import { connect } from "react-redux";
import { signout, getUserDetails } from "../store/actions/users";
import Menu from "../components/Menu";

class ProfileScreen extends React.Component {
  componentDidMount() {
    this.props.get(this.props.user.username);
    if (this.props.user.username.includes("guest")) {
      Alert.alert(
        "Sign in Required",
        "You must be signed in with your account to check your profile stats",
        [
          {
            text: "Sign in",
            onPress: this.props.onSignin,
          },
          {
            text: "Cancel",
            onPress: () => {
              this.props.navigation.navigate("Rooms");
            },
          },
        ]
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={{ height: "28%" }}
            activeOpacity={0.5}
            onPress={() => {
              this.props.signout();
            }}
          >
            <TextComp style={{ fontSize: 20 }} color={Colors.secondary}>
              Signout
            </TextComp>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.73, alignItems: "center" }}>
          <View style={styles.circleBackground}>
            <View style={styles.photo} />
            <TextComp color="black" bold style={{ fontSize: 25 }}>
              {this.props.user.username}
            </TextComp>
            <View style={styles.titlesContainer}>
              <TextComp color="black" style={styles.text}>
                Friends
              </TextComp>
              <TextComp color="black" style={styles.text}>
                Games Played
              </TextComp>
              <TextComp color="black" style={styles.text}>
                Wins
              </TextComp>
            </View>
            <View style={styles.statsContainer}>
              <TextComp color={Colors.secondary} bold style={styles.data}>
                {
                  this.props.user.friends.filter(
                    (friend) => friend.accepted === true
                  ).length
                }
              </TextComp>
              <TextComp color={Colors.secondary} bold style={styles.data}>
                {this.props.user.games}
              </TextComp>
              <TextComp color={Colors.secondary} bold style={styles.data}>
                {parseFloat(this.props.user.wins / this.props.user.games) *
                  (100).toPrecision(2) || 0}
                %
              </TextComp>
            </View>
          </View>
        </View>
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
  topContainer: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  data: {
    fontSize: 25,
  },
  statsContainer: {
    marginTop: 5,
    marginLeft: 35,
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titlesContainer: {
    marginTop: 15,
    width: "35%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  photo: {
    marginTop: -60,
    width: 125,
    height: 125,
    borderRadius: 62.5,
    backgroundColor: Colors.blueTeam,
  },
  circleBackground: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ededed",
    borderRadius: 490,
    width: 1000,
    height: 1000,
  },
  menuContainer: {
    flex: 0.12,
    marginBottom: Dimensions.get("window").height > 670 ? -35 : 0,
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
  userInfo: state.users.userInfo,
});

const mapDispatchToProps = {
  signout: signout,
  get: getUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
