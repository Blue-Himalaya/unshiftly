import { applyMiddleware, createStore } from 'redux';
import reducers from './redux-state/reducers/index.js';
import { middlewares } from './redux-state/store.js';

export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(reducers, initialState);
};