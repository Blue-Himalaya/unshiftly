import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DayOfWeek from './dayOfWeek.jsx';
import moment from 'moment';



const Shifts = () => {
  const columnDates = useSelector(state => state.scheduleReducer.listOfFullDays);
  const currentDate = useSelector(state => state.scheduleReducer.currentDate);
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  const roles = useSelector(state => state.rolesReducer.roles)

  const days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
  const normalWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


  return(
      <>
      {days.map((day, i) => {
        let dayOfWeek = new Date(columnDates[i]);
        let today = new Date(currentDate)
          return <div key={day} className="column">
            <DayOfWeek dayprop={columnDates[i]} day={day} previous={dayOfWeek < today ? true : false} shifts={schedule[0].[day]} />
          </div>
      })}
      </>
  )
}

export default Shifts;
