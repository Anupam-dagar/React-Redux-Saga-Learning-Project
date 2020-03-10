import {
  REQUEST_CREATE_COLLECTION,
  REQUEST_ALL_COLLECTION,
  REQUEST_ADD_RESTAURANT_TO_COLLECTION,
  REQUEST_GET_RESTAURANT_PARTOF_COLLECTION
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
  console.log("REQUEST_ADD_RESTAURANT_TO_COLLECTION actions received");
  return {
    type: REQUEST_GET_RESTAURANT_PARTOF_COLLECTION,
    userId,
    restaurantId
  };
};
