import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ActivityList from './ActivityList.jsx';
import Shifts from './shifts.jsx';

const Calendar = () => {

  return (
    <div>
      <div className="view-container">
        <div className="cal-container">
          <h1>Calendar</h1>
          <div className="cal-contents-cont">
              <div id="columns">
                <div>Fri</div>
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
      <button type="click">Edit Calendar</button>
      <button type="click">Edit Employees</button>
    </div>
  );
}

export default Calendar;