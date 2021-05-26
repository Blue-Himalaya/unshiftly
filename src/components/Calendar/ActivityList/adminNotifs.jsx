import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ActivityList from './ActivityList.jsx';

const AdminNotifications = () => {
  const activities = useSelector(state => state.scheduleReducer.activities);
  const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const [view, setView] = useState('adminNotifs');
  const [removeTO, setRemoveTO] = useState('')
  const dispatch = useDispatch();

  if (view === 'activityLog') {
    return (
      <div>
        <ActivityList />
      </div>
    );
  }

  const approveTimeOff = (e) => {
    axios.post('/')

    e.target.disabled = true;
    e.target.innerHTML = 'Time Off Approved';
  }

  const denyTimeOff = (e) => {
    e.target.disabled = true;
    e.target.innerHTML = 'Time Off Denied';
  }

  return (
    <div id="adminNotifs">
      <button id="back2Log" onClick={() => setView('activityLog')}>Back to Activity Log</button>
      <h1>Alerts</h1>
        <div id="timeOffTableEntries">
          <table id="timeOffTable">
          <thead>
              <tr>
                <th>Name</th>
                <th>Day</th>
                <th>Shift</th>
                <th>Approve</th>
                <th>Deny</th>
              </tr>
          </thead>
          <tbody>
            {timeOff.map((tOff) => (
                <tr>
                  <td>{tOff.name}</td>
                  <td>{tOff.day}</td>
                  {tOff.morning > 0 ? <td>Morning</td> : <td>Night</td>}
                  <td><button id="approveTimeOff" onClick={approveTimeOff} disabled={false}>Approve</button></td>
                  <td><button id="denyTimeOff" onClick={denyTimeOff} disabled={false}>Deny</button></td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default AdminNotifications;