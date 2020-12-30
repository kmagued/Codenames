export const CREATE_ROOM = "CREATE_ROOM";
export const FETCH_ROOMS = "FETCH_ROOMS";
export const ERROR = "ERROR";
export const UPDATE_ROOM = "UPDATE_ROOM";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const SUBMIT_CLUE = "SUBMIT_CLUE";
export const UPDATE_GAME = "UPDATE_GAME";

import myApi from "../../api/myApi";
import { navigate } from "../../navigation/navigationRef";

export const fetchRooms = () => async (dispatch) => {
  const response = await myApi.get("/rooms");
  response.data.sort((a, b) => a > b);

  dispatch({
    type: FETCH_ROOMS,
    payload: response.data,
  });
};

export const createRoom = (name, password, numOfPlayers, timeLimit) => async (
  dispatch
) => {
  const response = await myApi.post("/rooms", {
    name,
    numOfPlayers,
    timeLimit,
    password,
  });
  dispatch({
    type: CREATE_ROOM,
    room: response.data,
  });
  navigate("Waiting", { room: response.data });
};

export const joinRoom = (id, password, user) => async (dispatch) => {
  const response = await myApi.post(`/rooms/${id}`, { password, user });
  dispatch({
    type: ERROR,
    message: response.data.error,
  });
};

export const addPlayer = (id, user, role, team) => async (dispatch) => {
  const response = await myApi.patch(`/rooms/${id}`, { user, role, team });
  dispatch({
    type: UPDATE_ROOM,
    room: response.data,
  });
};

export const leaveRoom = (id, user) => async (dispatch) => {
  const response = await myApi.patch("/rooms", { id, user });
  if (!response.data.delete) {
    dispatch({
      type: UPDATE_ROOM,
      room: response.data,
    });
  }
  navigate("Rooms");
};

export const filterRooms = (locked, full) => async (dispatch) => {
  dispatch({
    type: FILTER_ROOMS,
    locked,
    full,
  });
};

export const submitClue = (id, user, clue) => async (dispatch) => {
  const response = await myApi.post(`/game/${id}`, { user, clue });
  dispatch({
    type: UPDATE_GAME,
    game: response.data.room,
    error: response.data.error,
  });
};

export const guessWord = (id, word, user, number, clue) => async (dispatch) => {
  const response = await myApi.patch(`/game/${id}`, {
    word,
    user,
    number,
    clue,
  });
  dispatch({
    type: UPDATE_GAME,
    game: response.data.room,
    error: response.data.error ? response.data.error : "",
  });
};
