import {
  SUCCESS_CREATE_COLLECTION,
  FAILURE_CREATE_COLLECTION,
  SUCCESS_ALL_COLLECTION,
  FAILURE_ALL_COLLECTION,
  SUCCESS_ADD_RESTAURANT_TO_COLLECTION,
  FAILURE_ADD_RESTAURANT_TO_COLLECTION,
  SUCCESS_GET_RESTAURANT_PARTOF_COLLECTION,
  FAILURE_GET_RESTAURANT_PARTOF_COLLECTION,
  SUCCESS_GET_RESTAURANTS_IN_COLLECTION,
  FAILURE_GET_RESTAURANTS_IN_COLLECTION,
  SUCCESS_DELETE_RESTAURANTS_IN_COLLECTION,
  FAILURE_DELETE_RESTAURANTS_IN_COLLECTION,
  REQUEST_UPDATE_COLLECTION,
  SUCCESS_UPDATE_COLLECTION,
  FAILURE_UPDATE_COLLECTION
} from "../actions/types";
import { put, call } from "redux-saga/effects";
import {
  createCollectionApi,
  getCollectionsApi,
  addRestaurantCollectionsApi,
  getRestaurantCollectionsApi,
  getRestaurantsInCollectionApi,
  deleteRestaurantsInCollectionApi,
  updateRestaurantCollectionApi
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

export function* getRestaurantCollection(data) {
  const token = localStorage.getItem("token");
  try {
    const response = yield call(
      getRestaurantCollectionsApi,
      data.userId,
      data.restaurantId,
      token
    );

    const collectionsData = response.results;
    const collections = [];
    collectionsData.map((value, index) => {
      collections.push(value.restaurant_collection.name);
    });
    yield put({
      type: SUCCESS_GET_RESTAURANT_PARTOF_COLLECTION,
      payload: collections
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FAILURE_GET_RESTAURANT_PARTOF_COLLECTION,
      payload: error
    });
  }
}

export function* getRestaurantsInCollection(data) {
  const token = localStorage.getItem("token");
  try {
    const response = yield call(
      getRestaurantsInCollectionApi,
      data.userId,
      data.collectionName,
      token
    );

    yield put({
      type: SUCCESS_GET_RESTAURANTS_IN_COLLECTION,
      payload: response
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FAILURE_GET_RESTAURANTS_IN_COLLECTION,
      payload: error
    });
  }
}

export function* deleteRestaurantsInCollection(data) {
  const token = localStorage.getItem("token");
  try {
    console.log(data,'saga')
    const response = yield call(
      deleteRestaurantsInCollectionApi,
      data.userId,
      data.collectionName,
      data.restaurantId,
      token
    );
    const restaurants = yield call(
      getRestaurantsInCollectionApi,
      data.userId,
      data.collectionName,
      token
    );

    yield put({
      type: SUCCESS_DELETE_RESTAURANTS_IN_COLLECTION,
      payload: response,
      restaurantData: restaurants
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FAILURE_DELETE_RESTAURANTS_IN_COLLECTION,
      payload: error
    });
  }
}

export function* updateRestaurantCollection(data) {
  const token = localStorage.getItem("token");
  try {
    console.log(data,'saga')
    const response = yield call(
      updateRestaurantCollectionApi,
      data.data,
      data.collectionId,
      token
    );

    yield put({
      type: SUCCESS_UPDATE_COLLECTION,
      payload: response
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FAILURE_UPDATE_COLLECTION,
      payload: error
    });
  }
}
