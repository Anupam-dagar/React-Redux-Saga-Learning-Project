import { takeLatest, all } from "redux-saga/effects";
import { loginUser, signupUser, getUserProfile, logoutUser } from "./authsagas";
import {
  getRestaurants,
  getFilteredRestaurants,
  getNameRestaurants
} from "./restaurantsagas";
import {
  createCollection,
  getCollections,
  addRestaurantCollection,
  getRestaurantCollection,
  getRestaurantsInCollection,
  deleteRestaurantsInCollection,
  updateRestaurantCollection
} from "./collectionssagas";
import {
  REQUEST_LOGIN_USER,
  REQUEST_SIGNUP_USER,
  REQUEST_USER_PROFILE,
  REQUEST_LOGOUT_USER,
  REQUEST_ALL_RESTAURANTS,
  REQUEST_FILTER_RESTAURANTS,
  REQUEST_NAME_RESTAURANTS,
  REQUEST_CREATE_COLLECTION,
  REQUEST_ALL_COLLECTION,
  REQUEST_ADD_RESTAURANT_TO_COLLECTION,
  REQUEST_GET_RESTAURANT_PARTOF_COLLECTION,
  REQUEST_GET_RESTAURANTS_IN_COLLECTION,
  REQUEST_DELETE_RESTAURANTS_IN_COLLECTION,
  REQUEST_UPDATE_COLLECTION
} from "../actions/types";

export default function* watchUsers() {
  yield all([
    takeLatest(REQUEST_LOGIN_USER, loginUser),
    takeLatest(REQUEST_SIGNUP_USER, signupUser),
    takeLatest(REQUEST_USER_PROFILE, getUserProfile),
    takeLatest(REQUEST_LOGOUT_USER, logoutUser),
    takeLatest(REQUEST_ALL_RESTAURANTS, getRestaurants),
    takeLatest(REQUEST_FILTER_RESTAURANTS, getFilteredRestaurants),
    takeLatest(REQUEST_NAME_RESTAURANTS, getNameRestaurants),
    takeLatest(REQUEST_CREATE_COLLECTION, createCollection),
    takeLatest(REQUEST_ALL_COLLECTION, getCollections),
    takeLatest(REQUEST_ADD_RESTAURANT_TO_COLLECTION, addRestaurantCollection),
    takeLatest(
      REQUEST_GET_RESTAURANT_PARTOF_COLLECTION,
      getRestaurantCollection
    ),
    takeLatest(
      REQUEST_GET_RESTAURANTS_IN_COLLECTION,
      getRestaurantsInCollection
    ),
    takeLatest(
      REQUEST_DELETE_RESTAURANTS_IN_COLLECTION,
      deleteRestaurantsInCollection
    ),
    takeLatest(REQUEST_UPDATE_COLLECTION, updateRestaurantCollection)
  ]);
}
