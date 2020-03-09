import {
  SUCCESS_CREATE_COLLECTION,
  FAILURE_CREATE_COLLECTION,
  SUCCESS_ALL_COLLECTION,
  FAILURE_ALL_COLLECTION
} from "../actions/types";
import { put, call } from "redux-saga/effects";
import { createCollectionApi, getCollectionsApi } from "../api/api";

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
    const response = yield call(
      getCollectionsApi,
      data.userId,
      token
    );

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
