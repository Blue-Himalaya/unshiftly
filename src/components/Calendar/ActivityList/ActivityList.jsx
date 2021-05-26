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

  console.log('activities', activities, activities[0])

  const pickUpShift = (e) => {
    // should consequently update activity log
    // get user from state!!!!
    // how? ? ? ? ...
    e.target.disabled = true;
    e.target.innerHTML = 'YOU PICKED UP THIS SHIFT';
    // dispatch(updateActivities(e.target.id, user, `${user} picked up`));
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
          <li key={activity.id}> Activity on: {moment(activity.datetime).format('MMMM Do YYYY, h:mm:ss a')}
            <br />
          {activity.type_of_activity}
            <br />
            <button>Approve</button>
            <button>Deny</button>
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
            <div key={activity.shift} id="activityListItem">
              <li key={activity.id}> Activity on: {moment(activity.datetime).format('MMMM Do YYYY, h:mm:ss a')}
              <br />
              {activity.type_of_activity}
              <br />
              {activity.type_of_activity.split(' ').slice(1, 3).join(' ') === 'has requested' ? <div id="pickup-shift-btn">
                <button disabled={false} id={activity.id} onClick={(e) => pickUpShift(e)}>Pick Up Shift</button>
                </div> : <></>}
              </li>
              <br />
            </div>
            ))}
          </ul>
        </div>
      </div>
    );
};

// how to handle database route for picking up a shift
// how to handle approve/deny time off

export default ActivityList;