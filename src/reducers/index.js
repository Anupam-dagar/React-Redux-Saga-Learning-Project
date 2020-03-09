import { combineReducers } from "redux";
import authreducer from "./authreducer";
import restaurantreducer from "./restaurantreducer";
import collectionsreducer from "./collectionsreducer";

export default combineReducers({
  auth: authreducer,
  restaurant: restaurantreducer,
  collections: collectionsreducer
});
