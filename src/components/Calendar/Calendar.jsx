import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ActivityList from './ActivityList.jsx';

const Calendar = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);

  console.log(schedule)

  return (
    <div id="calendar-container">
      <h1>Calendar</h1>
      <div id="calendar-contents">
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
      </div>
      <ActivityList />
    </div>
  );
}

export default Calendar;