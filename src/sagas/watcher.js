import { takeLatest, all } from "redux-saga/effects";
import { loginUser, signupUser, getUserProfile, logoutUser } from "./authsagas";
import {
  REQUEST_LOGIN_USER,
  REQUEST_SIGNUP_USER,
  REQUEST_USER_PROFILE,
  REQUEST_LOGOUT_USER
} from "../actions/types";

export default function* watchUsers() {
  yield all([
    takeLatest(REQUEST_LOGIN_USER, loginUser),
    takeLatest(REQUEST_SIGNUP_USER, signupUser),
    takeLatest(REQUEST_USER_PROFILE, getUserProfile),
    takeLatest(REQUEST_LOGOUT_USER, logoutUser)
  ]);
}
