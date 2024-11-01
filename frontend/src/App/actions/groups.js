import {
  CREATE_GROUP,
  CREATE_GROUP_FAIL,
  SHOW_GROUP,
  SHOW_GROUP_FAIL,
  LIST_GROUP,
  LIST_GROUP_FAIL,
  DELETE_GROUP,
  DELETE_GROUP_FAIL,
  UPDATE_GROUP,
  UPDATE_GROUP_FAIL,
  LIST_ALL_GROUP,
  LIST_ALL_GROUP_FAIL,
  JOIN_GROUP,
  JOIN_GROUP_FAIL,
  REMOVE_STUDENT_FROM_GROUP,
  REMOVE_STUDENT_FROM_GROUP_FAIL,
} from "../actions/types";
import axios from "axios";
import {
  URL_CREATE_GROUP,
  URL_LIST_GROUP,
  URL_DETIL_GROUP,
  URL_DELETE_GROUP,
  URL_UPDATE_GROUP,
  URL_LIST_ALL_GROUP,
  URL_JOIN_GROUP,
  URL_REMOVE_STUDENT_FROM_GROUP,
} from "../actions/urls";

export const create_group =
  (user, groupName, discription, password) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };

    const body = JSON.stringify({
      group_owner: user.id,
      group_name: groupName,
      group_description: discription,
      group_password: password,
    });

    await axios
      .post(URL_CREATE_GROUP, body, config)
      .then((res) => {
        dispatch({
          type: CREATE_GROUP,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_GROUP_FAIL,
          payload: err.response.data,
        })
      });
  };
export const show_group = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  await axios
    .get(URL_DETIL_GROUP(id), config)
    .then((res) => {
      dispatch({
        type: SHOW_GROUP,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SHOW_GROUP_FAIL,
        payload: err.response.data,
      })
    });
};
export const list_group = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  await axios
    .get(URL_LIST_GROUP, config)
    .then((res) => {
      dispatch({
        type: LIST_GROUP,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LIST_GROUP_FAIL,
        payload: err.response.data,
      })
    });
};
export const delete_group = (pk) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  await axios
    .delete(URL_DELETE_GROUP(pk), config)
    .then((res) => {
      dispatch({
        type: DELETE_GROUP,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_GROUP_FAIL,
        payload: err.response.data,
      })
    });
};
export const update_group =
  (id, groupName, discription, password) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    await axios
      .put(URL_UPDATE_GROUP(id), { groupName, discription, password }, config)
      .then((res) => {
        dispatch({
          type: UPDATE_GROUP,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_GROUP_FAIL,
          payload: err.response.data,
        })
      });
  };
export const list_all_group = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  await axios
    .get(URL_LIST_ALL_GROUP, config)
    .then((res) => {
      dispatch({
        type: LIST_ALL_GROUP,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LIST_ALL_GROUP_FAIL,
        payload: err.response.data,
      })
    });
};
export const join_group = (groupPassword, groupID) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };

  const body = JSON.stringify({
    group_password: groupPassword, // Send the group password as part of the request
  });

  await axios
    .post(URL_JOIN_GROUP(groupID), body, config)
    .then((res) => {
      dispatch({
        type: JOIN_GROUP,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: JOIN_GROUP_FAIL,
        payload: err.response.data,
      })
    });
};
export const removeStudent = (groupID, pk) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  await axios
    .post(URL_REMOVE_STUDENT_FROM_GROUP(groupID, pk), config)
    .then((res) => {
      dispatch({
        type: REMOVE_STUDENT_FROM_GROUP,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REMOVE_STUDENT_FROM_GROUP_FAIL,
        payload: err.response.data,
      })
    });
};
