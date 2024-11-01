import {
  PUBLISH_NEWS,
  DELETE_NEWS,
  LIST_NEWS,
  PUBLISH_NEWS_FAIL,
  DELETE_NEWS_FAIL,
  LIST_NEWS_FAIL,
} from "./types";
import { URL_LIST_CREATE_NEWS, URL_UPDATE_DELETE_RETRIEVE_NEWS } from "./urls";
import axios from "axios";

export const publishNews = (news) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  };

  await axios
    .post(URL_LIST_CREATE_NEWS, news, config)
    .then((res) => {
      dispatch({
        type: PUBLISH_NEWS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PUBLISH_NEWS_FAIL,
        payload: err.response.data,
      });
    });
};

export const deleteNews = (pk) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  await axios
    .delete(URL_UPDATE_DELETE_RETRIEVE_NEWS(pk), config)
    .then((res) => {
      dispatch({
        type: DELETE_NEWS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_NEWS_FAIL,
        payload: err.response.data,
      });
    });
};

export const listNews = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  await axios
    .get(URL_LIST_CREATE_NEWS, config)
    .then((res) => {
      dispatch({
        type: LIST_NEWS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LIST_NEWS_FAIL,
        payload: err.response.data,
      })
    });
};
