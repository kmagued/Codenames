export const SIGNIN = "SIGNIN";
export const ERROR = "ERROR";
export const SIGNOUT = "SIGNOUT";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const GET_DETAILS = "GET_DETAILS";
export const GET_USERS = "GET_USERS";

import usersApi from "../../api/myApi";
import { navigate } from "../../navigation/navigationRef";
import { AsyncStorage } from "react-native";

export const signup = (username, email, password) => async (dispatch) => {
  try {
    const response = await usersApi.post("/signup", {
      username,
      email,
      password,
    });
    if (response.data.error) {
      dispatch({
        type: ERROR,
        payload: response.data.error,
      });
    } else {
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      dispatch({
        type: SIGNIN,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const signin = (username, password) => async (dispatch) => {
  try {
    const response = await usersApi.post("/signin", { username, password });
    if (response.data.error) {
      dispatch({
        type: ERROR,
        payload: response.data.error,
      });
    } else {
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      dispatch({
        type: SIGNIN,
        payload: response.data,
      });
    }
  } catch (err) {
    console.log("Error signing in");
  }
};

export const clearErrorMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};

export const tryLocalSignin = () => async (dispatch) => {
  const user = JSON.parse(await AsyncStorage.getItem("user"));
  if (user) {
    dispatch({
      type: SIGNIN,
      payload: user,
    });
  } else {
    const guest = {
      username: "guest" + (0 + Math.floor((5000 - 0) * Math.random())),
    };
    dispatch({
      type: SIGNIN,
      payload: guest,
    });
  }
  navigate("Home");
};

export const signout = () => async (dispatch) => {
  await AsyncStorage.removeItem("user");
  navigate("Loading");
  dispatch({
    type: SIGNOUT,
  });
};

export const getUserDetails = (user) => async (dispatch) => {
  const response = await usersApi.get(`/profile/${user}`);
  dispatch({
    type: GET_DETAILS,
    payload: response.data,
  });
};

export const searchUsers = (userInput) => async (dispatch) => {
  const response = await usersApi.post("/search", { userInput });
  dispatch({
    type: GET_USERS,
    payload: response.data,
  });
};

export const sendFriendRequest = (username, friendName) => async (dispatch) => {
  await usersApi.patch("/addFriend", { username, friendName });
};

export const acceptRequest = (username, friendName) => async (dispatch) => {
  await usersApi.patch("/accept", { username, friendName });
};

export const rejectRequest = (username, friendName) => async (dispatch) => {
  await usersApi.patch("/reject", { username, friendName });
};
