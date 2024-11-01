import { combineReducers } from "redux";
import authReducer from "./auth";
import quizReducer from "./quizs";
import groupsReducer from "./groups";
import news from "./news";

const rootReducer = combineReducers({
  auth: authReducer,
  quizs: quizReducer,
  groups: groupsReducer,
  news: news,
});

export default rootReducer;
