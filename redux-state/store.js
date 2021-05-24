import { createStore, applyMiddleware } from 'redux';
// import reducers from './reducers/index';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js';

const store = createStore(reducers, applyMiddleware(thunk));

export default store;