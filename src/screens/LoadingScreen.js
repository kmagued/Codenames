import React from "react";
import { connect } from "react-redux";
import { tryLocalSignin } from "../store/actions/users";
import io from "socket.io-client";

class LoadingScreen extends React.Component {
  componentDidMount = () => {
    const socket = io("http://7c9b228abf75.eu.ngrok.io", {
      transports: ["websocket"],
    });

    this.props.localSignin().then(() => {
      socket.emit("user", this.props.user);
    });
  };

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  localSignin: tryLocalSignin,
};

const mapStateToProps = (state) => ({
  user: state.users.user,
  users: state.users.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
