import {
  REQUEST_CREATE_COLLECTION,
  SUCCESS_CREATE_COLLECTION,
  FAILURE_CREATE_COLLECTION
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
        collections: action.payload,
        isLoading: false
      };
    case FAILURE_CREATE_COLLECTION:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
