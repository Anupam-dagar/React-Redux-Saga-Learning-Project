import { REQUEST_CREATE_COLLECTION, REQUEST_ALL_COLLECTION } from './types';

export const addCollection = (userId, collectionName) => {
  console.log("REQUEST_FILTER_RESTAURANTS action received");
  return {
    type: REQUEST_CREATE_COLLECTION,
    userId,
    collectionName
  }
}

export const getCollections = (userId) => {
  console.log('REQUEST_ALL_COLLECTION actions received');
  return {
    type: REQUEST_ALL_COLLECTION,
    userId
  }
}
