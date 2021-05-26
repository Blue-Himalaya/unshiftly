import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import fetchView from '../redux-state/actions/fetchView.js';

const Header = (props) => {
  const admin = useSelector(state => state.adminReducer.admin);
  const dispatch = useDispatch();
  if (!admin) {
    return (
      <div className='header'>UNSHIFTLY {props.admin}</div>
    )
  } else {
    return (
      <>
      <div className='header'>
        UNSHIFTLY
        <button onClick={() => {dispatch(fetchView('schedule'))}}>Edit Schedule</button>
        <button onClick={() => {dispatch(fetchView('employees'))}}>Edit Employees</button>
        <button onClick={() => {dispatch(fetchView('calendar'))}}>Go to Calendar</button>
        {/* <button onClick={() => {dispatch(logOut())}}>Log Out</button> */}
      </div>
      <div className='header-buffer'>&nbsp;</div>
      </>
    )
  }

}

export default Header