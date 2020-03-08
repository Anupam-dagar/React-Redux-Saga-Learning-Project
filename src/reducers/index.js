import { combineReducers } from "redux";
import authreducer from "./authreducer";
import restaurantreducer from "./restaurantreducer";

export default combineReducers({
  auth: authreducer,
  restaurant: restaurantreducer
});
