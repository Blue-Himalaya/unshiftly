import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Shifts = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule[0]);
  console.log(schedule);

  let friShifts = schedule.Friday.map((shift) => {
    return [shift.datetime, shift.name, shift.phone, shift.role]
  });

  let satShifts = schedule.Saturday.map((shift) => {
    return [shift.datetime, shift.name, shift.phone, shift.role]
  });

  let sunShifts = schedule.Sunday.map((shift) => {
    return [shift.datetime, shift.name, shift.phone, shift.role]
  });

  let monShifts = schedule.Monday.map((shift) => {
    return [shift.datetime, shift.name, shift.phone, shift.role]
  });

  let tueShifts = schedule.Tuesday.map((shift) => {
    return [shift.datetime, shift.name, shift.phone, shift.role]
  });

  let wedShifts = schedule.Wednesday.map((shift) => {
    return [shift.datetime, shift.name, shift.phone, shift.role]
  });

  let thuShifts = schedule.Thursday.map((shift) => {
    return [shift.datetime, shift.name, shift.phone, shift.role]
  });
  console.log(friShifts);

  return(
    <div id="columns">
      <div>
        {friShifts}
      </div>
      <div>
        {satShifts}
      </div>
      {/* <div>Sat=========================</div> */}
      {/* <div>Sun=========================</div> */}
      <div>
        {sunShifts}
      </div>
      {/* <div>Mon=========================</div> */}
      <div>
        {monShifts}
      </div>
      {/* <div>Tue=========================</div> */}
      <div>
        {tueShifts}
      </div>
      {/* <div>Wed=========================</div> */}
      <div>
        {wedShifts}
      </div>
      {/* <div>Thu=========================</div> */}
      <div>
        {thuShifts}
      </div>
    </div>
  )
}

export default Shifts;
