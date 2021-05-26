import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Shifts from './shifts.jsx';
import ActivityList from './ActivityList/ActivityList.jsx';

const Calendar = () => {
  const employees = useSelector(state => state.employeeReducer.employees);
  const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const roles = useSelector(state => state.rolesReducer.roles);

  console.log('roles: ', roles);
  console.log('timeoff: ', timeOff);
  console.log('employees: ', employees);




  return (
    <div>
      <div className="view-container">
        <div className="cal-container">
          <div className="title-container">
            <h1 className="cal-title">{'<'} Current Week {'>'}</h1>
          </div>
          <div className="cal-contents-cont">
              <div id="daysOfWeek">
                <div className="date-container">
                  <div className="day">
                    Fri
                    <div className="date">11</div>
                  </div>
                </div>
                <div>Sat</div>
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
              </div>
              <Shifts />
            </div>
        </div>

          <div className="activity-log-container">
            <div className="activity-grid">
              <ActivityList />
            </div>
          </div>
      </div>
    </div>
  );
}

export default Calendar;