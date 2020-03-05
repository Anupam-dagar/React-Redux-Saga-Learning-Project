import { fork } from 'redux-saga/effects';
import watchUsers from './watcher';

export default function* startForman() {
  yield fork(watchUsers);
}
