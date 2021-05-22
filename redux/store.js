import { createStore, applyMiddleware } from 'redux';
import scheduleReducer from './reducers/scheduleReducer';


const store = createStore(scheduleReducer);