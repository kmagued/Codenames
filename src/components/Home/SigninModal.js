import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Overlay } from "react-native-elements";
import Input from "../Input";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { signin, signup } from "../../store/actions/users";
import { navigate } from "../../navigation/navigationRef";
import TextComp from "../TextComp";
import MainBtn from "../MainBtn";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

class SigninModal extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    loginError: "",
    loading: false,
    signup: false,
  };

  loginHandler = () => {
    this.setState({ loading: true });
    this.props.signin(this.state.username, this.state.password).then(() => {
      this.setState({ loading: false });
      if (this.props.error) {
        this.setState({ loginError: this.props.error });
      } else {
        navigate("Rooms");
      }
    });
  };

  signupHandler = () => {
    this.setState({ loading: true });
    this.props
      .signup(this.state.username, this.state.email, this.state.password)
      .then(() => {
        this.setState({ loading: false });
        if (this.props.error) {
          this.setState({ signupError: this.props.error });
        } else {
          navigate("Rooms");
        }
      });
  };

  componentDidMount() {
    this.setState({ loginError: "" });
  }

  render() {
    return (
      <Overlay isVisible={this.props.visible} overlayStyle={styles.overlay}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
              <View
                style={{
                  justifyContent: this.state.signup
                    ? "space-between"
                    : "flex-end",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {this.state.signup ? (
                  <Ionicons
                    name="ios-arrow-back"
                    size={25}
                    onPress={() => {
                      this.setState({
                        signup: false,
                        username: "",
                        password: "",
                        email: "",
                        signupError: "",
                      });
                    }}
                  />
                ) : null}
                <Ionicons
                  name="ios-close"
                  size={30}
                  onPress={this.props.onCancel}
                />
              </View>
            </View>

            {/* BODY */}
            <View
              style={{
                flex: this.state.signup ? 0.7 : 0.5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextComp style={styles.title} bold color={Colors.secondary}>
                {this.state.signup ? "Sign Up" : "Sign In"}
              </TextComp>
              <Input
                icon={
                  <MaterialIcons
                    name="person-outline"
                    size={20}
                    color="#ccc"
                    style={{ marginRight: 15 }}
                  />
                }
                placeholder="Username"
                value={this.state.username}
                onChangeText={(username) => {
                  this.setState({ username, loginError: "", signupError: "" });
                }}
              />
              {this.state.signup ? (
                <Input
                  icon={
                    <Entypo
                      name="email"
                      size={15}
                      color="#ccc"
                      style={{ marginRight: 17, marginLeft: 3 }}
                    />
                  }
                  placeholder="Email"
                  value={this.state.email}
                  color="#ccc"
                  autoCapitalize="none"
                  onChangeText={(email) => {
                    this.setState({ email, signupError: "" });
                  }}
                />
              ) : null}
              <Input
                icon={
                  <Entypo
                    name="lock"
                    size={15}
                    color="#ccc"
                    style={{ marginRight: 17, marginLeft: 3 }}
                  />
                }
                placeholder="Password"
                value={this.state.password}
                secureTextEntry
                autoCorrect={false}
                onChangeText={(password) => {
                  this.setState({ password, loginError: "", signupError: "" });
                }}
              />
              <View style={{ alignItems: "center", marginVertical: 5 }}>
                <TextComp color="black">
                  {this.state.signup
                    ? this.state.signupError
                    : this.state.loginError}
                </TextComp>
              </View>
            </View>

            <View
              style={{
                flex: this.state.signup ? 0.2 : 0.3,
                alignItems: "center",
                marginTop: this.state.signup ? 30 : 0,
              }}
            >
              <MainBtn
                style={{ width: "90%", marginTop: 20 }}
                backgroundColor={Colors.secondary}
                title={this.state.signup ? "Create" : "Login"}
                loading={this.state.loading}
                onPress={
                  this.state.signup ? this.signupHandler : this.loginHandler
                }
              />
              {this.state.signup ? null : (
                <View style={styles.footerContainer}>
                  <View style={{ alignItems: "center" }}>
                    <TextComp style={{ fontSize: 16 }} color="black">
                      Don't have an account?
                    </TextComp>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          signup: true,
                          username: "",
                          password: "",
                          loginError: "",
                        });
                      }}
                    >
                      <TextComp
                        style={styles.footerBtn}
                        bold
                        color={Colors.secondary}
                      >
                        Sign Up
                      </TextComp>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 1.9,
    borderRadius: 25,
    backgroundColor: "#e6e6e6",
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  headerContainer: {
    flex: 0.15,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  footerBtn: {
    marginLeft: 7,
    fontSize: 17,
    lineHeight: 12,
    padding: 9,
  },
  title: {
    fontSize: 35,
    paddingVertical: 10,
    marginBottom: 15,
  },
});

const mapStateToProps = (state) => ({
  error: state.users.errorMessage,
});

const mapDispatchToProps = {
  signin: signin,
  signup: signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninModal);
