import { put, call } from "redux-saga/effects";
import {
  SUCCESS_ALL_RESTAURANTS,
  FAILURE_ALL_RESTAURANTS,
  SUCCESS_FILTER_RESTAURANTS,
  FAILURE_FILTER_RESTAURANTS,
  SUCCESS_NAME_RESTAURANTS,
  FAILURE_NAME_RESTAURANTS
} from "../actions/types";
import {
  getAllRestaurants,
  filterRestaurants,
  filterNameRestaurants
} from "../api/api";

export function* getRestaurants(page) {
  const token = localStorage.getItem("token");
  try {
    const response = yield call(getAllRestaurants, page, token);
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

export function* getFilteredRestaurants(page) {
  const token = localStorage.getItem("token");
  try {
    const response = yield call(
      filterRestaurants,
      page,
      page.day,
      page.time,
      page.value,
      token
    );
    yield put({
      type: SUCCESS_FILTER_RESTAURANTS,
      payload: response,
      day: page.day,
      time: page.time
    });
  } catch (error) {
    localStorage.removeItem("token");
    yield put({
      type: FAILURE_FILTER_RESTAURANTS,
      error
    });
  }
}

export function* getNameRestaurants(page) {
  const token = localStorage.getItem("token");
  try {
    const response = yield call(filterNameRestaurants, page, page.name, token);
    yield put({
      type: SUCCESS_NAME_RESTAURANTS,
      payload: response,
      name: page.name
    });
  } catch (error) {
    localStorage.removeItem("token");
    yield put({
      type: FAILURE_NAME_RESTAURANTS,
      error
    });
  }
}
