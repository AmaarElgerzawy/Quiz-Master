import {
  CREATE_QUZZ_SUCCESS,
  CREATE_QUZZ_FAIL,
  GET_QUIZS,
  GET_QUIZS_FAIL,
  ENTER_QUIZ_SUCCESS,
  ENTER_QUIZ_FAIL,
  SUBMIT_QUZZ_SUCCESS,
  SUBMIT_QUZZ_FAIL,
} from "./types";
import axios from "axios";
import {
  URL_CREATE_QUIZ,
  URL_GET_QUIZ,
  URL_GET_QUIZS,
  URL_SUBMIT_QUIZ,
} from "./urls";

export const createQuiz = (quiz) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`, // Corrected header
    },
  };

  await axios
    .post(URL_CREATE_QUIZ, quiz, config)
    .then((res) => {
      dispatch({
        type: CREATE_QUZZ_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_QUZZ_FAIL,
        payload: err,
      });
    });
};

export const getQuizs = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`, // Corrected header
    },
  };

  await axios
    .get(URL_GET_QUIZS, config)
    .then((res) => {
      dispatch({
        type: GET_QUIZS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_QUIZS_FAIL,
        payload: err,
      });
    });
};

export const enterQioz = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`, // Corrected header
    },
  };

  await axios
    .get(URL_GET_QUIZ(id), config)
    .then((res) => {
      dispatch({
        type: ENTER_QUIZ_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ENTER_QUIZ_FAIL,
        payload: err,
      });
    });
};

export const submitQuiz = (quiz_taker) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`, // Corrected header
    },
  };

  const body = JSON.stringify(quiz_taker);

  await axios
    .post(URL_SUBMIT_QUIZ, body, config)
    .then((res) => {
      dispatch({
        type: SUBMIT_QUZZ_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SUBMIT_QUZZ_FAIL,
        payload: err,
      });
    });
};
