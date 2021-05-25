import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer.js';
import scheduleReducer from './scheduleReducer.js';
import viewReducer from './viewReducer.js';
import timeOffReducer from './timeOffReducer.js';
import rolesReducer from './rolesReducer.js';
import adminReducer from './adminReducer.js';

const reducers = combineReducers({
  employeeReducer,
  scheduleReducer,
  viewReducer,
  timeOffReducer,
  rolesReducer,
  adminReducer
});

export default reducers;