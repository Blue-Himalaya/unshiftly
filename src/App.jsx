import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import fetchSchedule from '../redux-state/actions/fetchSchedule.js';
import fetchEmployees from '../redux-state/actions/fetchEmployees.js';

const App = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  const employees = useSelector(state => state.employeeReducer.employees);
  const dispatch = useDispatch();

  console.log(schedule, employees)

  useEffect(() => {
    dispatch(fetchSchedule());
    dispatch(fetchEmployees());
  }, []);

  return (
    <>
    Hello
    </>
  )
}

// const App = () => {

// }

export default App;