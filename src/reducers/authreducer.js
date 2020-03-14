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
      return { ...state, isLoading: true, isAuthenticated: false };
    case SUCCESS_LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        isAuthenticated: true
      };
    case FAILURE_LOGIN_USER:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isAuthenticated: false
      };
    case REQUEST_LOGOUT_USER:
      return { ...state, isLoading: true, isAuthenticated: true };
    case SUCCESS_LOGOUT_USER:
      return {
        ...state,
        currentUser: {},
        isLoading: false,
        isAuthenticated: false,
        error:''
      };
    case FAILURE_LOGOUT_USER:
      return {
        ...state,
        currentUser: {},
        isLoading: false,
        isAuthenticated: true
      };
    case REQUEST_SIGNUP_USER:
      return { ...state, isLoading: true, isAuthenticated: false };
    case SUCCESS_SIGNUP_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        isAuthenticated: true
      };
    case FAILURE_SIGNUP_USER:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isAuthenticated: false
      };
    case REQUEST_USER_PROFILE:
      return { ...state, isLoading: true, isAuthenticated: false };
    case SUCCESS_USER_PROFILE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        currentUser: action.payload
      };
    case FAILURE_USER_PROFILE:
      return { ...state, isLoading: false, isAuthenticated: false };
    default:
      return state;
  }
}
