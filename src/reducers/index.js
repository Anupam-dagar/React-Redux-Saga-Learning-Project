import { combineReducers } from 'redux';
import authreducer from './authreducer';

export default combineReducers({
    auth: authreducer
});
