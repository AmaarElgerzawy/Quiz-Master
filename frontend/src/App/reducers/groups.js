import {
  CREATE_GROUP,
  LIST_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  LIST_ALL_GROUP,
  SHOW_GROUP,
  JOIN_GROUP,
} from "../actions/types";

const initialState = {
  id: null,
  group_owner: null,
  group_name: "",
  group_description: "",
  group_password: "",
  members: [],
  groups: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_GROUP:
      return {
        ...state,
        groups: [...action.payload],
      };
    case LIST_ALL_GROUP:
      return {
        ...state,
        groups: [...action.payload],
      }
    case CREATE_GROUP:
    case UPDATE_GROUP:
    case DELETE_GROUP:
    case SHOW_GROUP:
      return {
        ...state,
        ...action.payload,
      };
    case JOIN_GROUP:
      return {
        ...state,
        members: [...state.members, action.payload],
      };
    default:
      return state;
  }
}
