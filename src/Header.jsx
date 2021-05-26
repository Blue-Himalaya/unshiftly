import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import fetchView from '../redux-state/actions/fetchView.js';
import logOut from '../redux-state/actions/logOut.js';

const Header = (props) => {
  const isAuthenticated = useSelector(state => state.viewReducer.isAuthenticated);
  const admin = useSelector(state => state.viewReducer.admin);
  const user = useSelector(state => state.viewReducer.user);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return (
      <>
      <div className='header'>
        UNSHIFTLY
      </div>
      <div className='header-buffer'>&nbsp;</div>
      </>
    );
  }

  if (!admin) {
    return (
      <>
      <div className='header'>
        UNSHIFTLY {props.admin}
        <button onClick={() => {dispatch(logOut())}}>Log Out</button>
        {' '}
        <span>Welcome {user[1]}</span>
      </div>
      <div className='header-buffer'>&nbsp;</div>
      </>
    )
  } else {
    return (
      <>
      <div className='header'>
        UNSHIFTLY
        <button onClick={() => {dispatch(fetchView('schedule'))}}>Edit Schedule</button>
        <button onClick={() => {dispatch(fetchView('employees'))}}>Edit Employees</button>
        <button onClick={() => {dispatch(fetchView('calendar'))}}>Go to Calendar</button>
        <button onClick={() => {dispatch(logOut())}}>Log Out</button>
        {' '}
        <span>Welcome {user[1]}</span>
      </div>
      <div className='header-buffer'>&nbsp;</div>
      </>
    )
  }

}

export default Header