import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Shifts = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule[0]);
  console.log(schedule)

  // Get shifts into an object of arrays
  // let getShifts = () => {
  //   var allShifts = {
  //     'Friday': [],
  //     'Saturday': [],
  //     'Sunday': [],
  //     'Monday': [],
  //     'Tuesday': [],
  //     'Wednesday': [],
  //     'Thursday': []
  //   };
  //   for (var day in schedule) {
  //     var shifts = schedule[day];
  //     shifts.forEach((shift) => {
  //       allShifts[day].push([shift.datetime, shift.name, shift.role])
  //     })
  //   }
  //   return allShifts;
  // }
  // let shifts = getShifts();
  // // console.log(shifts)

  const handleClick = (e) => {
    // e.stopPropagation();
    console.log(e.target);
    console.log(e.target.value)
  }


  return(
    <div id="columns">
      <div>
        {schedule.Friday.map((shift) => (
          <div onClick={(e) => handleClick(e)} value={shift.phone}>
            {shift.datetime} <br/>
            {shift.name} <br />
          </div>
        ))}
      </div>
      <div>
        {/* {shifts.Saturday.map(shift =>
          <div>{shift}</div>)} */}
      </div>
      <div>
        {/* {shifts.Sunday} */}
      </div>
      <div>
        {/* {shifts.Monday} */}
      </div>
      <div>
        {/* {shifts.Tuesday} */}
      </div>
      <div>
        {/* {shifts.Wednesday} */}
      </div>
      <div>
        {/* {shifts.Thursday} */}
      </div>
    </div>
  )
}

export default Shifts;
