import {
  REQUEST_ALL_RESTAURANTS,
  SUCCESS_ALL_RESTAURANTS,
  FAILURE_ALL_RESTAURANTS,
  REQUEST_FILTER_RESTAURANTS,
  SUCCESS_FILTER_RESTAURANTS,
  FAILURE_FILTER_RESTAURANTS,
  REQUEST_NAME_RESTAURANTS,
  SUCCESS_NAME_RESTAURANTS,
  FAILURE_NAME_RESTAURANTS
} from "../actions/types";

const initialState = {
  restaurants: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALL_RESTAURANTS:
      return { ...state, isLoading: true, currentAction: "all" };
    case SUCCESS_ALL_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        isLoading: false,
        currentAction: "all",
        day: "",
        time: "",
        searchValue: "",
        error: ""
      };
    case FAILURE_ALL_RESTAURANTS:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        currentAction: "all"
      };
    case REQUEST_FILTER_RESTAURANTS:
      return { ...state, isLoading: true, currentAction: "filter" };
    case SUCCESS_FILTER_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        isLoading: false,
        currentAction: "filter",
        day: action.day,
        time: action.time,
        searchValue: action.value,
        error: ""
      };
    case FAILURE_FILTER_RESTAURANTS:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        currentAction: "filter"
      };
    case REQUEST_NAME_RESTAURANTS:
      return { ...state, isLoading: true, currentAction: "named" };
    case SUCCESS_NAME_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        isLoading: false,
        currentAction: "named",
        name: action.name,
        searchValue: action.name,
        error: ""
      };
    case FAILURE_NAME_RESTAURANTS:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        currentAction: "named"
      };
    default:
      return state;
  }
}
