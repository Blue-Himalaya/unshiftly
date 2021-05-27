import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminNotifications from './adminNotifs.jsx';

const moment = require('moment');
const axios = require('axios');

const ActivityList = () => {
  const [pickedUp, setPickUp] = useState(undefined);
  const schedule = useSelector(state => state.scheduleReducer.schedule[0]);
  const admin = useSelector(state => state.viewReducer.admin);
  const user = useSelector(state => state.viewReducer.user);
  const activities = useSelector(state => state.scheduleReducer.activities);
  const [view, setView] = useState('activityLog');
  const dispatch = useDispatch();

  // if (pickedUp) {
  //   axios.put('/pickUpShift', pickedUp)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  if (!activities) return ( <div id="activityLogContainer">Loading...</div> );
  if (view === 'adminNotifs') return ( <div> <AdminNotifications /> </div> );

  const pickUpShift = (e) => {
    e.target.disabled = true;
    e.target.innerHTML = 'YOU PICKED UP THIS SHIFT';
    for (let i = 0; i < activities.length; i += 1) {
      if (activities[i].id === Number(e.target.id)) {
        setPickUp({
          shiftId: activities.shift,
          role: user[2],
          empName: user[1],
          empId: user[0],
          date: activities[i].time_of_activity,
          morning: activities.morning === 0,
        });
      };
    };
  };

  if (admin === true) {
    return (
      <div id="activityLogContainer">
        <button onClick={() => setView('adminNotifs')} id="timeOffRequestsBtn">Alerts</button>
        <h1>Activity Log</h1>
      <div id="activityLog">
        <ul>
        {activities.map((activity) => (
        <div id="activityListItem" key={activity.id}>
          <li key={activity.id}> Activity on: {moment(activity.datetime).format('MMMM Do YYYY, h:mm:ss a')}
            <br />
          {activity.type_of_activity}
            <br />
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
            activity.type_of_activity.split(' ').slice(1, 3).join(' ') === 'has changed' || activity.type_of_activity.split(' ').slice(1, 3).join(' ') === 'has requested' ? <></> :
            <div key={activity.shift} id="activityListItem">
              <li key={activity.id}> Activity on: {moment(activity.datetime).format('MMMM Do YYYY, h:mm:ss a')}
              <br />
              {activity.type_of_activity}
              <br />
              {activity.type_of_activity.split(' ').slice(1, 3).join(' ') === 'has given' ? <div id="pickup-shift-btn">
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

export default ActivityList;