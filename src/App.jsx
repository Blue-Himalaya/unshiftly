import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import fetchView from '../redux-state/actions/fetchView.js';
import fetchSchedule from '../redux-state/actions/fetchSchedule.js';
import fetchTimeOff from '../redux-state/actions/fetchTimeoff.js';
import fetchEmployees from '../redux-state/actions/fetchEmployees.js';
import fetchActivityList from '../redux-state/actions/fetchActivityList.js';

const App = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  // const activityList = useSelector(state => state.activityListReducer.activityList);
  const view = useSelector(state => state.viewReducer.view);
  // const employees = useSelector(state => state.employeeReducer.employees);
  // const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const dispatch = useDispatch();

  const admin = true
  const name = 'Steve'

  console.log(schedule, view)

  useEffect(() => {
    dispatch(fetchSchedule());
    dispatch(fetchView('schedule'));
    // dispatch(fetchEmployees());
    // dispatch(fetchTimeOff());
  }, []);

/*
=================
***LOGIN PAGE***
=================
*/
  if (view === 'login') {
    return (
      <>
      login
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
        schedule
        </>
      );

    } else {
      return (
        <>
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
        Employee
        </>
      );
    } else {
      return  (
        <>
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
      Calendar
      </>
    );
  }
  return (
    <div>
      Hey
    </div>
  );
}

export default App;