import {
  SUCCESS_CREATE_COLLECTION,
  FAILURE_CREATE_COLLECTION
} from "../actions/types";
import { put, call } from "redux-saga/effects";
import { createCollectionApi } from "../api/api";

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
