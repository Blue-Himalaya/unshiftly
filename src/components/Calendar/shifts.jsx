import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DayOfWeek from './dayOfWeek.jsx';
import moment from 'moment';

const Shifts = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  const roles = useSelector(state => state.rolesReducer.roles)

  var days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']

  return(
      <>
      {days.map((day) => (
          <div key={day} className="column">
            <DayOfWeek day={day} shifts={schedule[0].[day]} />
          </div>
      ))}
      </>
  )
}

export default Shifts;
