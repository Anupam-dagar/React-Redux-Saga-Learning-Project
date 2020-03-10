import {
  SUCCESS_CREATE_COLLECTION,
  FAILURE_CREATE_COLLECTION,
  SUCCESS_ALL_COLLECTION,
  FAILURE_ALL_COLLECTION,
  SUCCESS_ADD_RESTAURANT_TO_COLLECTION,
  FAILURE_ADD_RESTAURANT_TO_COLLECTION
} from "../actions/types";
import { put, call } from "redux-saga/effects";
import {
  createCollectionApi,
  getCollectionsApi,
  addRestaurantCollectionsApi
} from "../api/api";

export function* createCollection(data) {
  const token = localStorage.getItem("token");

  try {
    console.log(data);
    const response = yield call(
      createCollectionApi,
      data.userId,
      data.collectionName,
      token
    );

    yield put({
      type: SUCCESS_CREATE_COLLECTION,
      payload: response
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FAILURE_CREATE_COLLECTION,
      payload: error
    });
  }
}

export function* getCollections(data) {
  const token = localStorage.getItem("token");

  try {
    const response = yield call(getCollectionsApi, data.userId, token);

    yield put({
      type: SUCCESS_ALL_COLLECTION,
      payload: response
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FAILURE_ALL_COLLECTION,
      payload: error
    });
  }
}

export function* addRestaurantCollection(data) {
  const token = localStorage.getItem("token");
  console.log('action', data);
  try {
    const response = yield call(
      addRestaurantCollectionsApi,
      data.collectionId,
      data.restaurantId,
      token
    );

    yield put({
      type: SUCCESS_ADD_RESTAURANT_TO_COLLECTION,
      payload: response
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FAILURE_ADD_RESTAURANT_TO_COLLECTION,
      payload: error
    });
  }
}
