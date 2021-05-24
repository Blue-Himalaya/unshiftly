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

  console.log(schedule, view)

  useEffect(() => {
    dispatch(fetchSchedule());
    dispatch(fetchView('employees'));
    // dispatch(fetchEmployees());
    // dispatch(fetchTimeOff());
  }, []);

  if (view === 'admin') {
    return (
      <>
      Admin
      </>
    );
  }
  if (view === 'employees') {
    return (
      <>
      Employee
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