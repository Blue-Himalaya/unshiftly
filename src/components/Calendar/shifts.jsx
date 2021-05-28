import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DayOfWeek from './dayOfWeek.jsx';
import moment from 'moment';

const Shifts = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  console.log('schedule: ', schedule)

  // useEffect(() => {

  // }, [schedule])

  var days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']

  return(
      <div className="column-container">
      {days.map((day) => (
          <div key={day} value={day.id} className="column">
            <DayOfWeek shifts={schedule[0].[day]} />
          </div>
      ))}
      </div>
  )
}

export default Shifts;
