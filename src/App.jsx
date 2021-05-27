import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from './components/Calendar/Calendar.jsx';
import fetchView from '../redux-state/actions/fetchView.js';
import fetchSchedule from '../redux-state/actions/fetchSchedule.js';
import fetchTimeOff from '../redux-state/actions/fetchTimeoff.js';
import fetchSingleTimeOff from '../redux-state/actions/fetchSingleTimeoff.js';
import fetchEmployees from '../redux-state/actions/fetchEmployees.js';
import fetchActivityList from '../redux-state/actions/fetchActivityList.js';
import fetchRoles from '../redux-state/actions/fetchRoles.js';
import fetchAdmin from '../redux-state/actions/fetchAdmin.js';
import Login from './Login/Login.jsx';

import Schedule from './components/Schedule/Schedule.jsx'
import Header from './Header.jsx'
import EmployeeList from './components/EmployeeList/EmployeeList.jsx'

const App = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  // const activityList = useSelector(state => state.activityListReducer.activityList);
  const view = useSelector(state => state.viewReducer.view);
  const admin = useSelector(state => state.adminReducer.admin);
  const employees = useSelector(state => state.employeeReducer.employees);
  const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const singleTimeOff = useSelector(state => state.timeOffReducer.singleTimeOff);
  const roles = useSelector(state => state.rolesReducer.roles);
  const dispatch = useDispatch();

  // const admin = true
  const name = 'Steve'
  const mobileWidth = 730
  const tabletWidth = 1250

  if (schedule && employees && timeOff && roles && admin && singleTimeOff) {
    // console.log('SCHEDULE:', schedule)
    // console.log('TIMEOFF:', timeOff)
    // console.log('EMPLOYEES:', employees)
    // console.log('ROLES:', roles)
    // console.log('ADMIN:', admin) // it's a boolean
  }

  useEffect(() => {
    dispatch(fetchSchedule('2019-10-15'));
    dispatch(fetchSingleTimeOff('2019-10-15'));
    dispatch(fetchActivityList());
    dispatch(fetchEmployees());
    dispatch(fetchTimeOff());
    dispatch(fetchRoles());
    dispatch(fetchView('employees'));
    dispatch(fetchAdmin(true));
  }, []);

  if (!view || !schedule || !employees || !timeOff || !roles || !singleTimeOff) {
    return (
      <>
      <Header mobileWidth={mobileWidth}/>
      Loading...
      </>
    );
  }

/*
=================
***LOGIN PAGE***
=================
*/
  if (view === 'login') {
    return (
      <>
      <Header mobileWidth={mobileWidth}/>
      <Login />
      </>
    );
  }

/*
===================
***SCHEDULE PAGE***
===================
*/
  if (view === 'schedule') { //Ramisa's
    if (admin) {
      return (
        <>
          <Header mobileWidth={mobileWidth}/>
          <Schedule mobileWidth={mobileWidth} tabletWidth={tabletWidth}/>
        </>
      );

    } else {
      return (
        <>
        <Header mobileWidth={mobileWidth}/>
        YOU CAN'T SEE ME
        </>
      )
    }
  }

/*
====================
***EMPLOYEES PAGE***
====================
*/
  if (view === 'employees') { //Tyler's
    if (admin) {
      return (
        <>
        <Header mobileWidth={mobileWidth}/>
        <EmployeeList/>
        </>
      );
    } else {
      return  (
        <>
        <Header mobileWidth={mobileWidth}/>
        NOT ADMIN
        </>
      )
    }
  }

/*
====================
***CALENDAR PAGE***
====================
*/
  if (view === 'calendar') { //Tomas's & Amber's
    return (
      <>
      <Header mobileWidth={mobileWidth}/>
      <Calendar />
      </>
    );
  }
  return (
    <div>
      <Header mobileWidth={mobileWidth}/>
      Loading...
    </div>
  );
}

export default App;
