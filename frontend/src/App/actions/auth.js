import axios from "axios";

import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  USER_LOADING,
  INQUIZ,
  USER_UPDATE,
  USER_UPDATE_FAIL,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAIL,
} from "./types";
import {
  URL_REGISTER,
  URL_LOGIN,
  URL_USER_DATA,
  URL_LOGOUT,
  URL_UPDATE_USER,
  URL_UPLOAD_IMAGE,
} from "./urls";

// Load the user by token
export const loadUser = () => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });

  const token = localStorage.getItem("token");

  // Check if token is available
  if (!token) {
    return;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`, // Corrected header
    },
  };

  try {
    const res = await axios.get(URL_USER_DATA, config);

    res.data.username = res.data.username.replace("_", " ");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    // Dispatch error (example)
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(URL_LOGIN, body, config);
      res.data.user.username = res.data.user.username.replace("_", " ");
      // Dispatch successful login (if using Redux)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data, // Sending the response data (user info + token) to Redux store
      });
    } catch (err) {
      // Dispatch login failure (if using Redux)
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response?.data || err.message, // Send error info to Redux store
      });
    }
  };

export const register =
  ({ username, email, phone, location, password, gender }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    username = username.replace(" ", "_");
    const body = JSON.stringify({
      username,
      email,
      phone,
      gender,
      location,
      password,
    });

    try {
      const res = await axios.post(URL_REGISTER, body, config);
      res.data.user.username = res.data.user.username.replace("_", " ");

      // Dispatch success action
      dispatch({
        type: REGISTER_SUCCESS, // Make sure 'REGISTER_SUCCESS' is defined in your actions
        payload: res.data, // Send user data (or token) received from server
      });
    } catch (err) {
      // Dispatch failure action if registration fails
      dispatch({
        type: REGISTER_FAIL, // Ensure 'REGISTER_FAIL' is handled in your reducer
        payload: err.response?.data || err.message, // You can pass error info to your reducer
      });
    }
  };

export const logout = () => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = localStorage.getItem("token");

  // if token, add the headers
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .post(URL_LOGOUT, null, config)
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_FAIL,
        payload: err,
      });
    });
};

export const updateUser = (user) => (dispatch) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json", // Important for FormData
      Authorization: `Token ${token}`,
    },
  };

  axios
    .patch(URL_UPDATE_USER, user, config)
    .then((res) => {
      res.data.username = res.data.username.replace("_", " ");
      dispatch({
        type: USER_UPDATE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: err,
      });
    });
};
export const inQuiz = () => (dispatch) => {
  dispatch({
    type: INQUIZ,
  });
};

export const uploadImage = (file) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  };
  await axios
    .patch(URL_UPLOAD_IMAGE, file, config)
    .then((res) => {
      dispatch({
        type: UPLOAD_IMAGE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPLOAD_IMAGE_FAIL,
        payload: err,
      });
    });
};
