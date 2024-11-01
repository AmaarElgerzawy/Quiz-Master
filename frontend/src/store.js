import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./App/reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Redux Toolkit includes Thunk by default
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
