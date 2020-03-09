import { takeLatest, all } from "redux-saga/effects";
import { loginUser, signupUser, getUserProfile, logoutUser } from "./authsagas";
import { getRestaurants, getFilteredRestaurants } from "./restaurantsagas";
import {
  REQUEST_LOGIN_USER,
  REQUEST_SIGNUP_USER,
  REQUEST_USER_PROFILE,
  REQUEST_LOGOUT_USER,
  REQUEST_ALL_RESTAURANTS,
  REQUEST_FILTER_RESTAURANTS
} from "../actions/types";

export default function* watchUsers() {
  yield all([
    takeLatest(REQUEST_LOGIN_USER, loginUser),
    takeLatest(REQUEST_SIGNUP_USER, signupUser),
    takeLatest(REQUEST_USER_PROFILE, getUserProfile),
    takeLatest(REQUEST_LOGOUT_USER, logoutUser),
    takeLatest(REQUEST_ALL_RESTAURANTS, getRestaurants),
    takeLatest(REQUEST_FILTER_RESTAURANTS, getFilteredRestaurants)
  ]);
}
