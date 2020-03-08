import { put, call } from "redux-saga/effects";
import {
  SUCCESS_ALL_RESTAURANTS,
  FAILURE_ALL_RESTAURANTS
} from "../actions/types";
import { getAllRestaurants } from "../api/api";

export function* getRestaurants() {
  const token = localStorage.getItem("token");
  try {
    const response = yield call(getAllRestaurants, token);
    yield put({
      type: SUCCESS_ALL_RESTAURANTS,
      payload: response
    });
  } catch (error) {
    localStorage.removeItem("token");
    yield put({
      type: FAILURE_ALL_RESTAURANTS,
      error
    });
  }
}
