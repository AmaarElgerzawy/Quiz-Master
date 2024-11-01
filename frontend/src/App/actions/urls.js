// Auth
export const URL_REGISTER = "http://127.0.0.1:8000/api/auth/register/";
export const URL_LOGIN = "http://127.0.0.1:8000/api/auth/login/";
export const URL_LOGOUT = "http://127.0.0.1:8000/api/auth/logout/";
export const URL_USER_DATA = "http://127.0.0.1:8000/api/auth/user/";
export const URL_UPDATE_USER = "http://127.0.0.1:8000/api/auth/edit_user/";
export const URL_UPLOAD_IMAGE =
  "http://127.0.0.1:8000/api/auth/edit/update-image/";

// QUIZ
export const URL_CREATE_QUIZ = "http://127.0.0.1:8000/api/quiz/quizzes/";
export const URL_GET_QUIZS =
  "http://127.0.0.1:8000/api/quiz/quizzes/quizes_overview/";
export const URL_SUBMIT_QUIZ = "http://127.0.0.1:8000/api/quiz/quiztaker/";
export const URL_GET_QUIZ = (pk) => {
  return `http://127.0.0.1:8000/api/quiz/quiz/${pk}`;
};

// group
export const URL_CREATE_GROUP =
  "http://127.0.0.1:8000/api/groups/create_group/";
export const URL_LIST_ALL_GROUP =
  "http://127.0.0.1:8000/api/groups/list_all_group/";
export const URL_LIST_GROUP = "http://127.0.0.1:8000/api/groups/list_group/";
export const URL_DELETE_GROUP = (pk) => {
  return `http://127.0.0.1:8000/api/groups/delete_group/${pk}/`;
};
export const URL_UPDATE_GROUP = (pk) => {
  return `http://127.0.0.1:8000/api/groups/update_group/${pk}/`;
};
export const URL_DETIL_GROUP = (pk) => {
  return `http://127.0.0.1:8000/api/groups/detail_group/${pk}/`;
};
export const URL_JOIN_GROUP = (groupId) => {
  return `http://127.0.0.1:8000/api/groups/${groupId}/add-member/`;
};
export const URL_REMOVE_STUDENT_FROM_GROUP = (groupId, pk) => {
  return `http://127.0.0.1:8000/api/groups/delete_member/${groupId}/${pk}/`;
};

// NEWS
export const URL_LIST_CREATE_NEWS = "http://127.0.0.1:8000/api/groups/news/";
export const URL_UPDATE_DELETE_RETRIEVE_NEWS = (pk) => {
  return `http://127.0.0.1:8000/api/groups/news/${pk}/`;
};
