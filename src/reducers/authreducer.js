import {
  REQUEST_LOGIN_USER,
  REQUEST_LOGOUT_USER,
  REQUEST_SIGNUP_USER,
  REQUEST_USER_PROFILE,
  SUCCESS_LOGIN_USER,
  SUCCESS_LOGOUT_USER,
  SUCCESS_SIGNUP_USER,
  SUCCESS_USER_PROFILE,
  FAILURE_LOGIN_USER,
  FAILURE_LOGOUT_USER,
  FAILURE_SIGNUP_USER,
  FAILURE_USER_PROFILE
} from "../actions/types";

const initialState = {
  currentUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN_USER:
      return state;
    case SUCCESS_LOGIN_USER:
      return { ...state, currentUser: action.payload };
    case FAILURE_LOGIN_USER:
      return { ...state, currentUser: action.payload };
    case REQUEST_LOGOUT_USER:
      return state;
    case SUCCESS_LOGOUT_USER:
      return { ...state, currentUser: {} };
    case FAILURE_LOGOUT_USER:
      return { ...state, currentUser: {} };
    case REQUEST_SIGNUP_USER:
      return state;
    case SUCCESS_SIGNUP_USER:
      return { ...state, currentUser: action.payload };
    case FAILURE_SIGNUP_USER:
      return { ...state, currentUser: action.payload };
    case REQUEST_USER_PROFILE:
      return state;
    case SUCCESS_USER_PROFILE:
      return { ...state, currentUser: action.payload };
    case FAILURE_USER_PROFILE:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
