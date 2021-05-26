import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminNotifications from './adminNotifs.jsx';
import updateActivities from '../../../../redux-state/actions/updateActivities.js';

const moment = require('moment');

const ActivityList = () => {
  const activities = useSelector(state => state.scheduleReducer.activities);
  const schedule = useSelector(state => state.scheduleReducer.schedule[0]);
  const admin = useSelector(state => state.viewReducer.admin);
  const user = useSelector(state => state.viewReducer.user);

  const [view, setView] = useState('activityLog');

    if (view === 'adminNotifs') {
      return (
        <div>
          <AdminNotifications />
        </div>
      );
    }

  const dispatch = useDispatch();

  console.log(activities[0])

  const pickUpShift = (e) => {
    // should consequently update activity log
    // get user from state!!!! :D
    e.target.disabled = true;
    e.target.innerHTML = 'YOU PICKED UP THIS SHIFT';
    dispatch(updateActivities(e.target.id, user, 'scheduled'));
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
      <div id="activityLogContainer">
        <button onClick={() => setView('adminNotifs')} id="timeOffRequestsBtn">Pending Time Off Requests</button>
        <h1>Activity Log</h1>
      <div id="activityLog">
        <ul>
        {activities.map((activity) => (
        <div id="activityListItem">
          <li key={activity.id}> Date: {moment(activity.datetime).format('MMMM Do YYYY, h:mm:ss a')}
            <br />
            Name: {activity.name}
            <br />
            Role: {activity.role}
            <br />
            Phone: {activity.phone}
            <br />
            {activity.type_of_activity === 'active' ? <div id="pickup-shift-btn">
            <button disabled={false} id={activity.id} onClick={(e) => pickUpShift(e)}>Pick Up Shift</button>
            </div> : <em>Picked up by {user}</em>}
            </li>
            <br />
          </div>
        ))}
        </ul>
      </div>
    </div>
    );
  }

    return (
      <div id="activityLogContainer">
        <h1>Activity Log</h1>
        <div id="activityLog">
          <ul>
          {activities.map((activity) => (
            <div id="activityListItem">
              <li key={activity.id}> Date: {moment(activity.datetime).format('MMMM Do YYYY, h:mm:ss a')}
                <br />
                Name: {activity.name}
                <br />
                Role: {activity.role}
                <br />
                Phone: {activity.phone}
                <br />
                {activity.type_of_activity === 'active' ? <div id="pickup-shift-btn">
                 <button disabled={false} id={activity.id} onClick={(e) => pickUpShift(e)}>Pick Up Shift</button>
                 </div> : <em>Picked up by {user}</em>}
                </li>
                <br />
              </div>
            ))}
          </ul>
          </div>
      </div>
    );
};

export default ActivityList;