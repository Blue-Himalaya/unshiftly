import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const DayOfWeek = (props) => {

  console.log('props: ', props);

  // All of Friday's shifts
  const shifts = props.shifts;

  // Format the time
  const formatTime = (time) => {
    let timeSplit = time.split(' ');
    let hour = timeSplit[3].slice(0, timeSplit.length);
    let dayEve = timeSplit[4];
    return (hour + ' ' + dayEve);
  }

  const getPhoneNum = (num) => {
    console.log(num);
  }

  return (
    <div>
      {shifts.map((shift) => (
        <div className="shift-block" onClick={() => getPhoneNum(shift.phone)}>
          {shift.name}
          <br/>
          {formatTime(shift.datetime)}
        </div>
      ))}
    </div>
  )
  //
}

export default DayOfWeek;
