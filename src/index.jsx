import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux-state/store.js';


ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('app'));
