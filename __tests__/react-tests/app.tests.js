import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
import Header from '../../src/Header.jsx';
import { shallow, mount, render } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import { expect } from 'chai';
import App from '../../src/App.jsx';
import store from '../../redux-state/store.js';

// spy(Header.prototype, 'useEffect');

describe('App', () => {
  it('renders the Header', () => {
    const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
    );
    expect(wrapper.find(Header).length).to.equal(1);
  });

});