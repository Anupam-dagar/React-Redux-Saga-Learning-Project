import { REQUEST_ALL_RESTAURANTS } from "./types";

export const getAllRestaurants = (page) => {
  console.log("REQUEST_ALL_RESTAURANTS action received.");
  return {
    type: REQUEST_ALL_RESTAURANTS,
    page
  };
};
