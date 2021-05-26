import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminNotifications from './adminNotifs.jsx';
import updateActivities from '../../../../redux-state/actions/updateActivities.js';

const moment = require('moment');

const ActivityList = () => {
  const activities = useSelector(state => state.scheduleReducer.activities);
  const schedule = useSelector(state => state.scheduleReducer.schedule[0]);
  const admin = useSelector(state => state.adminReducer.admin);
  const [view, setView] = useState('activityLog');

    if (view === 'adminNotifs') {
      return (
        <div>
          <AdminNotifications />
        </div>
      );
    }

  const dispatch = useDispatch();

  const pickUpShift = (e) => {
    dispatch(updateActivities(e.target.name, 'scheduled'));
    e.target.disabled = true;
  };

  if (activities === undefined) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (admin === true) {
    return (
      <div>
      <button onClick={() => setView('adminNotifs')}>Pending Time Off Requests</button>
      <h1>Activity Log</h1>
      <ul>
      {activities.map((activity) => (
        <li key={activity.id}> Date: {moment(activity.datetime).format('MMMM Do YYYY, h:mm:ss a')}
          <br />
          Name: {activity.name}
          <br />
          Role: {activity.role}
          <br />
          Phone: {activity.phone}
          <br />
          <div id="pickup-shift-btn">
          <button disabled={false} onClick={(e) => pickUpShift(e)}>Pick Up Shift</button>
          </div>
          </li>
      ))}
      </ul>
    </div>
    );
  }

    return (
      <div>
      <h1>Activity Log</h1>
      <ul>
      {activities.map((activity) => (
        <li key={activity.id}> Date: {moment(activity.datetime).format('MMMM Do YYYY, h:mm:ss a')}
          <br />
          Name: {activity.name}
          <br />
          Role: {activity.role}
          <br />
          Phone: {activity.phone}
          <br />
          <div id="pickup-shift-btn">
          <button disabled={false} id={activity.id} onClick={(e) => pickUpShift(e)}>Pick Up Shift</button>
          </div>
          </li>
      ))}
      </ul>
    </div>
    );
};

export default ActivityList;