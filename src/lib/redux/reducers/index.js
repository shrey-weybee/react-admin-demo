import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import { customerApi } from '../services/customer';
import authReducer from '../slice/authSlice';

const rootReducer = {
  theme: themeReducer,
  [customerApi.reducerPath]: customerApi.reducer,
  auth: authReducer,
};

export default combineReducers({ ...rootReducer });
