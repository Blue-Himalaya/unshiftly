import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ActivityList from './ActivityList.jsx';

const Calendar = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);

  console.log(schedule)

  return (
    <div className="view-container">
      <div className="cal-container">
        <h1>Calendar</h1>
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
            <ActivityList />
          </div>
        </div>

    </div>
  );
}

export default Calendar;