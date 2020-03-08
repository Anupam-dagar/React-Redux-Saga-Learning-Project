import {
  REQUEST_ALL_RESTAURANTS,
  SUCCESS_ALL_RESTAURANTS,
  FAILURE_ALL_RESTAURANTS
} from "../actions/types";

const initialState = {
  restaurants: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALL_RESTAURANTS:
      return { ...state, isLoading: true };
    case SUCCESS_ALL_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        isLoading: false
      };
    case FAILURE_ALL_RESTAURANTS:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
