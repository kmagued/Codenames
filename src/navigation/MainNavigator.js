import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoadingScreen from "../screens/LoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RoomsScreen from "../screens/RoomsScreen";
import GameScreen from "../screens/GameScreen";
import WaitingScreen from "../screens/WaitingScreen";
import InboxScreen from "../screens/InboxScreen";

const MainNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Home: HomeScreen,
    Rooms: RoomsScreen,
    Game: GameScreen,
    Waiting: WaitingScreen,
    Profile: ProfileScreen,
    Inbox: InboxScreen,
  },
  {
    // initialRouteName: "Game",
  }
);

export default createAppContainer(MainNavigator);
