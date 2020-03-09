import { REQUEST_CREATE_COLLECTION } from './types';

export const addCollection = (userId, collectionName) => {
  console.log("REQUEST_FILTER_RESTAURANTS action received");
  return {
    type: REQUEST_CREATE_COLLECTION,
    userId,
    collectionName
  }
}
