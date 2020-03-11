import {
  REQUEST_CREATE_COLLECTION,
  SUCCESS_CREATE_COLLECTION,
  FAILURE_CREATE_COLLECTION,
  REQUEST_ALL_COLLECTION,
  SUCCESS_ALL_COLLECTION,
  FAILURE_ALL_COLLECTION,
  REQUEST_ADD_RESTAURANT_TO_COLLECTION,
  SUCCESS_ADD_RESTAURANT_TO_COLLECTION,
  FAILURE_ADD_RESTAURANT_TO_COLLECTION,
  REQUEST_GET_RESTAURANT_PARTOF_COLLECTION,
  SUCCESS_GET_RESTAURANT_PARTOF_COLLECTION,
  FAILURE_GET_RESTAURANT_PARTOF_COLLECTION,
  REQUEST_GET_RESTAURANTS_IN_COLLECTION,
  SUCCESS_GET_RESTAURANTS_IN_COLLECTION,
  FAILURE_GET_RESTAURANTS_IN_COLLECTION,
  REQUEST_DELETE_RESTAURANTS_IN_COLLECTION,
  SUCCESS_DELETE_RESTAURANTS_IN_COLLECTION,
  FAILURE_DELETE_RESTAURANTS_IN_COLLECTION
} from "../actions/types";

const initialState = {
  collections: [],
  restaurants: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CREATE_COLLECTION:
      return { ...state, isLoading: true };
    case SUCCESS_CREATE_COLLECTION:
      return {
        ...state,
        newCollection: action.payload,
        isLoading: false
      };
    case FAILURE_CREATE_COLLECTION:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case REQUEST_ALL_COLLECTION:
      return { ...state, isLoading: true };
    case SUCCESS_ALL_COLLECTION:
      return {
        ...state,
        collections: action.payload,
        isLoading: false
      };
    case FAILURE_ALL_COLLECTION:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case REQUEST_ADD_RESTAURANT_TO_COLLECTION:
      return { ...state, isLoading: true };
    case SUCCESS_ADD_RESTAURANT_TO_COLLECTION:
      return {
        ...state,
        addedCollection: action.payload,
        isLoading: false
      };
    case FAILURE_ADD_RESTAURANT_TO_COLLECTION:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case REQUEST_GET_RESTAURANT_PARTOF_COLLECTION:
      return {
        ...state,
        isLoading: true
      };
    case SUCCESS_GET_RESTAURANT_PARTOF_COLLECTION:
      return {
        ...state,
        partOfCollections: action.payload,
        isLoading: false
      };
    case FAILURE_GET_RESTAURANT_PARTOF_COLLECTION:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case REQUEST_GET_RESTAURANTS_IN_COLLECTION:
      return { ...state, resturantIsLoading: true };
    case SUCCESS_GET_RESTAURANTS_IN_COLLECTION:
      return {
        ...state,
        restaurants: action.payload,
        resturantIsLoading: false
      };
    case FAILURE_GET_RESTAURANTS_IN_COLLECTION:
      return { ...state, error: action.payload, resturantIsLoading: false };
    case REQUEST_DELETE_RESTAURANTS_IN_COLLECTION:
      return { ...state, isLoading: true };
    case SUCCESS_DELETE_RESTAURANTS_IN_COLLECTION:
      return { ...state, success: action.payload, restaurantData: action.restaurantData, isLoading: false };
    case FAILURE_DELETE_RESTAURANTS_IN_COLLECTION:
      return { ...state, success: false, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
