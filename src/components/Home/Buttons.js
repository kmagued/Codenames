import React from "react";
import { View, Alert } from "react-native";
import { connect } from "react-redux";
import { signin } from "../../store/actions/users";
import { navigate } from "../../navigation/navigationRef";
import MainBtn from "../MainBtn";
import Colors from "../../constants/Colors";

class Buttons extends React.Component {
  checkGuest = () => {
    if (this.props.user.username.includes("guest")) {
      Alert.alert(
        "Alert",
        "It is recommended to sign in to avoid losing progress!",
        [
          {
            text: "Sign in",
            onPress: this.props.onSignin,
          },
          {
            text: "Later",
            onPress: () => {
              this.props.signin(this.props.user.username).then(() => {
                navigate("Rooms");
              });
            },
          },
        ]
      );
    } else {
      navigate("Rooms");
    }
  };

  render() {
    return (
      <View style={{ width: "65%" }}>
        <MainBtn
          style={{ paddingTop: 10, paddingBottom: 10 }}
          title="Online"
          onPress={this.checkGuest}
          backgroundColor="white"
          textColor={Colors.blueTeam}
        />
        <MainBtn
          style={{ paddingTop: 10, paddingBottom: 10 }}
          title="Pass & Play"
          backgroundColor={Colors.primaryColor}
          textColor={Colors.blueTeam}
        />
      </View>
    );
  }
}

const mapDispatchToProps = {
  signin: signin,
};

export default connect(null, mapDispatchToProps)(Buttons);
