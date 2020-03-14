import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers";
import rootSaga from './sagas';
import websocketmiddleware from './websocketmiddleware';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware, websocketmiddleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;
