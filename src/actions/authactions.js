import {
  REQUEST_LOGIN_USER,
  REQUEST_SIGNUP_USER,
  REQUEST_USER_PROFILE,
  REQUEST_LOGOUT_USER
} from "./types";

export const loginUser = user => {
  console.log("REQUEST_LOGIN_USER action received.");
  return { type: REQUEST_LOGIN_USER, payload: user };
};

export const logoutUser = () => {
  console.log("REQUEST_LOGOUT_USER action received");
  return {
    type: REQUEST_LOGOUT_USER
  };
};
export const signupUser = user => {
  console.log("REQUEST_SIGNUP_USER action received.");
  return {
    type: REQUEST_SIGNUP_USER,
    payload: user
  };
};

export const getUserProfile = () => {
  console.log("REQUEST_USER_PROFILE action received.");
  return {
    type: REQUEST_USER_PROFILE
  };
};
