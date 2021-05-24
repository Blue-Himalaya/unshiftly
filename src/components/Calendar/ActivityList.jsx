import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ActivityList = () => {
  const schedule = useSelector(state => state.scheduleReducer.schedule);

  const addShift = (e) => {
    console.log(e.target.name)
  }

  if (schedule === undefined) {
    return (
      <div>
        ah
      </div>
    );
  }
  return (
    <div>
      <h1>Activity Log</h1>
      <ul>
      {schedule[0].Friday.map((sched) => (
          <li name={sched.name}> Date: {sched.datetime}
          <br />
          Name: {sched.name}
          <br />
          Role: {sched.role}
          <br />
          Phone: {sched.phone}
          <br />
          <div id="pickup-shift-btn">
          <button name={sched.name} onClick={(e) => addShift(e)}>Pick Up Shift</button>
          </div>
          </li>
      ))}
      </ul>
    </div>
  );
};

export default ActivityList;