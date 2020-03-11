import {
  REQUEST_CREATE_COLLECTION,
  REQUEST_ALL_COLLECTION,
  REQUEST_ADD_RESTAURANT_TO_COLLECTION,
  REQUEST_GET_RESTAURANT_PARTOF_COLLECTION,
  REQUEST_GET_RESTAURANTS_IN_COLLECTION,
  REQUEST_DELETE_RESTAURANTS_IN_COLLECTION,
  REQUEST_UPDATE_COLLECTION
} from "./types";

export const addCollection = (userId, collectionName) => {
  console.log("REQUEST_FILTER_RESTAURANTS action received");
  return {
    type: REQUEST_CREATE_COLLECTION,
    userId,
    collectionName
  };
};

export const getCollections = userId => {
  console.log("REQUEST_ALL_COLLECTION actions received");
  return {
    type: REQUEST_ALL_COLLECTION,
    userId
  };
};

export const addRestaurantCollection = (collectionId, restaurantId) => {
  console.log("REQUEST_ADD_RESTAURANT_TO_COLLECTION actions received");
  return {
    type: REQUEST_ADD_RESTAURANT_TO_COLLECTION,
    collectionId,
    restaurantId
  };
};

export const getRestaurantCollection = (userId, restaurantId) => {
  console.log("REQUEST_GET_RESTAURANT_PARTOF_COLLECTION actions received");
  return {
    type: REQUEST_GET_RESTAURANT_PARTOF_COLLECTION,
    userId,
    restaurantId
  };
};

export const getRestaurantInCollection = (userId, collectionName) => {
  console.log("REQUEST_GET_RESTAURANT_PARTOF_COLLECTION actions received");
  return {
    type: REQUEST_GET_RESTAURANTS_IN_COLLECTION,
    userId,
    collectionName
  };
};

export const deleteRestaurantInCollection = (userId, collectionName, restaurantId) => {
  console.log("REQUEST_DELETE_RESTAURANTS_IN_COLLECTION actions received");
  return {
    type: REQUEST_DELETE_RESTAURANTS_IN_COLLECTION,
    userId,
    collectionName,
    restaurantId
  };
};

export const updateUserCollection = (data, collectionId) => {
  console.log("REQUEST_UPDATE_COLLECTION actions received");
  return {
    type: REQUEST_UPDATE_COLLECTION,
    data,
    collectionId
  };
};
