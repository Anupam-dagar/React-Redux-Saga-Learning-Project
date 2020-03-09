import {
  REQUEST_ALL_RESTAURANTS,
  SUCCESS_ALL_RESTAURANTS,
  FAILURE_ALL_RESTAURANTS,
  REQUEST_FILTER_RESTAURANTS,
  SUCCESS_FILTER_RESTAURANTS,
  FAILURE_FILTER_RESTAURANTS
} from "../actions/types";

const initialState = {
  restaurants: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ALL_RESTAURANTS:
      return { ...state, isLoading: true, currentAction: 'all' };
    case SUCCESS_ALL_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        isLoading: false,
        currentAction: 'all'
      };
    case FAILURE_ALL_RESTAURANTS:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        currentAction: 'all'
      };
    case REQUEST_FILTER_RESTAURANTS:
      return {...state, isLoading: true, currentAction: 'filter'}
    case SUCCESS_FILTER_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        isLoading: false,
        currentAction: 'filter',
        day: action.day,
        time: action.time
      }
    case FAILURE_FILTER_RESTAURANTS:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        currentAction: 'filter'
      }
    default:
      return state;
  }
}
