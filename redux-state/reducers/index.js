import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer.js';
import scheduleReducer from './scheduleReducer.js';
import viewReducer from './viewReducer.js';

const reducers = combineReducers({
  employeeReducer,
  scheduleReducer,
  viewReducer,
});

export default reducers;