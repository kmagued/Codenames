import {
  SIGNIN,
  ERROR,
  SIGNOUT,
  CLEAR_ERROR,
  GET_DETAILS,
  GET_USERS,
} from "../actions/users";

const initialState = {
  user: {},
  errorMessage: "",
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        errorMessage: "",
        user: action.payload,
      };
    case ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errorMessage: "",
      };
    case SIGNOUT:
      return {
        errorMessage: "",
        user: {},
      };
    case GET_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
