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

const App = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  // const activityList = useSelector(state => state.activityListReducer.activityList);
  const view = useSelector(state => state.viewReducer.view);
  const admin = useSelector(state => state.adminReducer.admin);
  const employees = useSelector(state => state.employeeReducer.employees);
  const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const roles = useSelector(state => state.rolesReducer.roles);
  const dispatch = useDispatch();

  // const admin = true
  const name = 'Steve'
  const mobileWidth = 500

  if (schedule && employees && timeOff && roles && admin) {
    // console.log('SCHEDULE:', schedule)
    // console.log('TIMEOFF:', timeOff)
    // console.log('EMPLOYEES:', employees)
    // console.log('ROLES:', roles)
    // console.log('ADMIN:', admin)
  }

  useEffect(() => {
    dispatch(fetchSchedule());
    dispatch(fetchActivityList());
    dispatch(fetchEmployees());
    dispatch(fetchTimeOff());
    dispatch(fetchSingleTimeOff());
    dispatch(fetchRoles());
    dispatch(fetchView('login'));
    dispatch(fetchAdmin(true));
  }, []);

  if (!view || !schedule || !employees || !timeOff || !roles) {
    return (
      <>
      <Header/>
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
      <Header/>
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
          <Header/>
          <Schedule mobileWidth={mobileWidth}/>
        </>
      );

    } else {
      return (
        <>
        <Header/>
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
        <Header />
        Employee
        </>
      );
    } else {
      return  (
        <>
        <Header />
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
      <Header />
      <Calendar />
      </>
    );
  }
  return (
    <div>
      <Header />
      Loading...
    </div>
  );
}

export default App;