import React from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { connect } from "react-redux";
import SigninModal from "../components/Home/SigninModal";
import RulesModal from "../components/Home/RulesModal";
import GameTitle from "../components/Home/GameTitle";
import Buttons from "../components/Home/Buttons";
import Colors from "../constants/Colors";
import TextComp from "../components/TextComp";
import { Ionicons } from "@expo/vector-icons";

class HomeScreen extends React.Component {
  state = {
    visible: false,
    rulesVisible: false,
  };

  cancelSignup = () => {
    this.setState({
      visible: false,
    });
  };

  cancelRules = () => {
    this.setState({
      rulesVisible: false,
    });
  };

  openSigninModal = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    return (
      <View style={styles.screen}>
        <SigninModal
          visible={this.state.visible}
          onCancel={this.cancelSignup}
        />
        <RulesModal
          visible={this.state.rulesVisible}
          onCancel={this.cancelRules}
        />

        {/* TOP CONTAINER - TITLE */}
        <View
          style={{
            ...styles.container,
            flex: 0.4,
            justifyContent: "flex-end",
          }}
        >
          <GameTitle user={this.props.user} />
        </View>

        {/* MAIN CONTAINER - BUTTONS */}
        <View style={{ ...styles.container, flex: 0.3 }}>
          <Buttons onSignin={this.openSigninModal} user={this.props.user} />
        </View>

        {/* BOTTOM CONTAINER - RULES */}
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            flex: 0.23,
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.setState({ rulesVisible: true });
            }}
          >
            <Ionicons name="ios-arrow-up" color="white" size={25} />
            <TextComp style={styles.text}>Rules of the Game</TextComp>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.blueTeam,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginHorizontal: 7,
  },
  btn: {
    padding: 7,
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  user: state.users.user,
});

export default connect(mapStateToProps)(HomeScreen);
