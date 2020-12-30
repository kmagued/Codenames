import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import usersReducer from "./src/store/reducers/users";
import roomsReducer from "./src/store/reducers/rooms";
import { setNavigator } from "./src/navigation/navigationRef";
import { StatusBar } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

const rootReducer = combineReducers({
  users: usersReducer,
  rooms: roomsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends React.Component {
  state = { loading: true };
  componentDidMount() {
    StatusBar.setBarStyle("light-content");
  }

  fetchFonts = async () =>
    Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });

  render() {
    if (this.state.loading) {
      return (
        <AppLoading
          startAsync={this.fetchFonts}
          onFinish={() => {
            this.setState({ loading: false });
          }}
        />
      );
    }
    return (
      <Provider store={store}>
        <MainNavigator
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </Provider>
    );
  }
}

export default App;
