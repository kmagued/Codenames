import {
  FETCH_ROOMS,
  CREATE_ROOM,
  ERROR,
  UPDATE_ROOM,
  FILTER_ROOMS,
  SUBMIT_CLUE,
  UPDATE_GAME,
} from "../actions/rooms";

const initialState = {
  rooms: [],
  filteredRooms: [],
  start: false,
  messages: [],
  error: "",
};

const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case CREATE_ROOM:
      return {
        ...state,
        rooms: [action.room, ...state.rooms],
      };

    case ERROR:
      return {
        ...state,
        error: action.message,
      };
    case UPDATE_ROOM:
      const newRooms = [...state.rooms];
      const roomId = newRooms.findIndex((room) => room._id === action.room._id);
      newRooms[roomId] = action.room;
      return {
        ...state,
        rooms: newRooms,
      };
    case FILTER_ROOMS:
      let filteredRooms = [...state.rooms];
      if (action.locked) {
        filteredRooms = filteredRooms.filter((room) => room.password === "");
      }
      if (action.full) {
        filteredRooms = filteredRooms.filter(
          (room) => room.activePlayers.length !== room.numOfPlayers
        );
      }
      return {
        ...state,
        filteredRooms,
      };
    case UPDATE_GAME:
      const updatedGames = [...state.rooms];
      const gameId = updatedGames.findIndex(
        (game) => game._id === action.game._id
      );
      updatedGames[gameId] = action.game;
      return {
        ...state,
        rooms: updatedGames,
        error: action.error,
      };

    default:
      return state;
  }
};

export default roomsReducer;
