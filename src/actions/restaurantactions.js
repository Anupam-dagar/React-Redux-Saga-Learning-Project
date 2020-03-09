import { REQUEST_ALL_RESTAURANTS, REQUEST_FILTER_RESTAURANTS, REQUEST_NAME_RESTAURANTS } from "./types";

export const getAllRestaurants = (page) => {
  console.log("REQUEST_ALL_RESTAURANTS action received.");
  return {
    type: REQUEST_ALL_RESTAURANTS,
    page
  };
};

export const getFilterRestaurants = (page, day, time) => {
  console.log("REQUEST_FILTER_RESTAURANTS action received");
  return {
    type: REQUEST_FILTER_RESTAURANTS,
    page,
    day,
    time
  }
}

export const getNamedRestaurants = (page, name) => {
  console.log('REQUEST_NAME_RESTAURANTS action received')
  return {
    type: REQUEST_NAME_RESTAURANTS,
    page,
    name
  }
}
