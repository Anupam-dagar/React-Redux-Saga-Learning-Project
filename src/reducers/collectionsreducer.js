import {
  REQUEST_CREATE_COLLECTION,
  SUCCESS_CREATE_COLLECTION,
  FAILURE_CREATE_COLLECTION,
  REQUEST_ALL_COLLECTION,
  SUCCESS_ALL_COLLECTION,
  FAILURE_ALL_COLLECTION
} from "../actions/types";

const initialState = {
  collections: []
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
        return {...state, isLoading: true};
    case SUCCESS_ALL_COLLECTION:
        return {
            ...state,
            collections: action.payload,
            isLoading: false
        }
    case FAILURE_ALL_COLLECTION:
        return {
            ...state,
            error: action.payload,
            isLoading: false
        }
    default:
      return state;
  }
}
