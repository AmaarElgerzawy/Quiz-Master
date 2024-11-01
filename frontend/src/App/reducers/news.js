import {
  PUBLISH_NEWS,
  DELETE_NEWS,
  LIST_NEWS,
} from "../actions/types";

const initialState = {
  title: "",
  content: "",
  group: "",
  image: null,
  author: "",
  date: "",
  news: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PUBLISH_NEWS:
      return {
        ...state,
      };
    case DELETE_NEWS:
      return {
        ...state,
      };
    case LIST_NEWS:
      return {
        ...state,
        news: [...action.payload],
      };
    default:
      return state;
  }
}
