import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer.js';
import scheduleReducer from './scheduleReducer.js';

const reducers = combineReducers({
  employeeReducer,
  scheduleReducer,
});

export default reducers;