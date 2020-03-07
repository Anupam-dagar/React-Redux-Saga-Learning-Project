import { put, call } from "redux-saga/effects";
import {
  SUCCESS_LOGIN_USER,
  SUCCESS_SIGNUP_USER,
  SUCCESS_USER_PROFILE,
  FAILURE_LOGIN_USER,
  FAILURE_SIGNUP_USER,
  FAILURE_USER_PROFILE,
  SUCCESS_LOGOUT_USER
} from "../actions/types";
import { loginUserApi, signupUserApi, getUserProfileApi } from "../api/api";

export function* loginUser(user) {
  try {
    console.log(user);
    const response = yield call(loginUserApi, user.payload);
    localStorage.setItem("token", response.token);

    yield put({
      type: SUCCESS_LOGIN_USER,
      payload: response.user
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FAILURE_LOGIN_USER,
      payload: error
    });
  }
}

export function* signupUser(user) {
  try {
    console.log(user);
    const response = yield call(signupUserApi, user.payload);
    console.log(response);
    localStorage.setItem("token", response.token);

    yield put({
      type: SUCCESS_SIGNUP_USER,
      payload: response.user
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FAILURE_SIGNUP_USER,
      payload: error
    });
  }
}

export function* getUserProfile() {
  const token = localStorage.getItem("token");
  try {
    const response = yield call(getUserProfileApi, token);
    yield put({
      type: SUCCESS_USER_PROFILE,
      payload: response
    });
  } catch (error) {
    localStorage.removeItem("token");
    yield put({
      type: FAILURE_USER_PROFILE,
      error
    });
  }
}

export function* logoutUser() {
  localStorage.removeItem("token");
  yield put({
    type: SUCCESS_LOGOUT_USER
  });
}
