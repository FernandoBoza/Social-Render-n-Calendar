import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errReducer from './errReducers';
import clientReducer from './clientReducer';

export default combineReducers({
  auth: authReducer,
  errors: errReducer,
  clients: clientReducer
});
