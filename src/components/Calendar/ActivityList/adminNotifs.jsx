import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ActivityList from './ActivityList.jsx';

const AdminNotifications = () => {
  const activities = useSelector(state => state.scheduleReducer.activities);
  const [view, setView] = useState('adminNotifs');
  const dispatch = useDispatch();

  if (view === 'activityLog') {
    return (
      <div>
        <ActivityList />
      </div>
    )
  }

  const approveTrade = (e) => {
    // approve trade should then...
    // update activity log state
    // dispatch(updateNotifications(e.target.id));
    // update schedule state
    // dispatch(updateActivities(e.target.id));
    // update notification state
    // dispatch(updateSchedule(e.target.id));

    // schedule state sould be included with activity log state probably
  }

  const denyTrade = () => {

  }

  return (
    <div>
      <button onClick={() => setView('activityLog')}>Back to Activity Log</button>
      <h1>Notifications</h1>
      {activities.map((activity) => (
        <ul>
          {activity.type_of_activity === 'pending' ?
          <li>
            {activity.shift}
            <br />
            {activity.time_of_activity}
            <br />
            <button id={activity.shift} onClick={(e) => approveTrade(e)}>Approve</button>
            <button id={activity.shift} onClick={(e) => denyTrade(e)}>Deny</button>
          </li>
        : <></>}
        </ul>
      ))}
    </div>
  );
}

export default AdminNotifications;