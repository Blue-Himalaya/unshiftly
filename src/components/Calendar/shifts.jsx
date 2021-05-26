import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DayOfWeek from './dayOfWeek.jsx';
import moment from 'moment';

const Shifts = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  console.log('schedule: ', schedule)

  var days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']

  // october 2019 11th - 18th
  // collection of days
  // create components for each day of week
    // for this day component pass it the list of shifts for that day
    // loop through shifts
    // dynamically render


  return(
      <div className="column-container">
      {days.map((day) => (
          <div className="column">
            <DayOfWeek shifts={schedule[0].[day]} />
          </div>
      ))}
      </div>
  )
}

export default Shifts;
