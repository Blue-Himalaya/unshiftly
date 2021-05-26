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
    );
  }

  const approveTimeOff = (e) => {

  }

  const denyTrade = () => {

  }

  return (
    <div>
      <button onClick={() => setView('activityLog')}>Back to Activity Log</button>
      <h1>Notifications</h1>
    </div>
  );
}

export default AdminNotifications;