import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGOUT_SUCCESS,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  REGISTER_FAIL,
  INQUIZ,
  USER_UPDATE,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  inQuiz: false,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: {
          ...action.payload,
        },
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case INQUIZ:
      return {
        ...state,
        inQuiz: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token"); // Remove token on error or logout
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: action.payload,
      };
    case USER_UPDATE:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
