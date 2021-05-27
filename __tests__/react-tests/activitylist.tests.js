import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
import ActivityList from '../../src/components/Calendar/ActivityList/ActivityList.jsx';
import { shallow, mount, render } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import { expect } from 'chai';
import App from '../../src/App.jsx';
import store from '../../redux-state/store.js';

// spy(Header.prototype, 'useEffect');

describe('Activity List', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
    <Provider store={store}>
      <ActivityList />
    </Provider>
    );
  expect(wrapper.find(ActivityList)).to.have.lengthOf(1);
  });

  // it('should contain activityLogContainer', () => {
  //   const wrapper = shallow(
  //   <Provider store={store}>
  //     <ActivityList />
  //   </Provider>
  //   );
  //   expect(wrapper.html()).to.contain('div');
  // })

});