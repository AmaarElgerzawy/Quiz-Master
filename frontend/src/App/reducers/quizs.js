import {
  CREATE_QUZZ_SUCCESS,
  CREATE_QUZZ_FAIL,
  GET_QUIZS,
  ENTER_QUIZ_SUCCESS,
  SUBMIT_QUZZ_SUCCESS,
} from "../actions/types";

const initialState = {
  Quiz: null,
  allQuizzes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_QUZZ_SUCCESS:
      return {
        ...state,
        Quiz: action.payload,
      };
    case CREATE_QUZZ_FAIL:
      return {
        ...state,
      };
    case GET_QUIZS:
      return {
        ...state,
        allQuizzes: Array.from(action.payload),
      };
    case ENTER_QUIZ_SUCCESS:
      return {
        ...state,
        Quiz: action.payload,
      };
    case SUBMIT_QUZZ_SUCCESS:
      return {
        ...state,
        Quiz: null,
      };
    default:
      return state;
  }
}
