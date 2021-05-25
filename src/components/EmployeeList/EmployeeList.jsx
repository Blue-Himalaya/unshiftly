import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import fetchSchedule from '../../../redux-state/actions/fetchEmployees.js';

const EmployeeList = () => {
  const employees = useSelector(state => state.employeeReducer.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSchedule());
    // page load, then immediate schedule view
    //
  }, []);

  return (
    <div className="view-container">
      <div className="cal-container">
        <h1>EmployeeList</h1>
        <div className="cal-contents-cont">
            <div id="calendar-dates">
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
            </div>
            <div>shifts</div>
          </div>
      </div>

        <div className="activity-log-container">
          <div className="activity-grid">
          </div>
        </div>

    </div>
  );
};


export default EmployeeList;