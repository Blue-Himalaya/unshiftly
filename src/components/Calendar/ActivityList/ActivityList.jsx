import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchSchedule from '../../../../redux-state/actions/fetchSchedule.js';
const moment = require('moment');
const axios = require('axios');

const ActivityList = () => {
  // const [pickedUp, setPickUp] = useState(undefined);
  const schedule = useSelector(state => state.scheduleReducer.schedule );
  const admin = useSelector(state => state.viewReducer.admin);
  const user = useSelector(state => state.viewReducer.user);
  const activities = useSelector(state => state.scheduleReducer.activities);
  const dispatch = useDispatch();
  const userRoles = useSelector(state => state.viewReducer.user[2]);

  if (!activities) return ( <div id="activityLogContainer">Loading...</div> );

  const pickUpShift = (e, activity) => {
    e.target.disabled = true;
    e.target.innerHTML = 'YOU PICKED UP THIS SHIFT';
      const getDate = activity.type_of_activity.split(' ')[10];
      const removePeriod = getDate.slice(0, getDate.length - 1);
      const getRole = activity.type_of_activity.split(' ')[5];
      const getMorning = activity.type_of_activity.split(' ')[7];
      const isMorning = getMorning === 'evening' ? 0 : 1;
      const canPick = getRole === user[2] ? true : false;
      console.log(activity)
      const pickedUp = {
        id: activity.id,
        shiftId: activity.shift,
        role: getRole,
        empName: user[1],
        empId: user[0],
        date: removePeriod,
        morning: isMorning,
      };
      axios.put('/pickUpShift', pickedUp)
        .then((res) => {
          const dateObj = new Date();
          var date =
            [dateObj.getFullYear(),
            (dateObj.getMonth() + 1).toString().length === 1
            ? '0' + (dateObj.getMonth() + 1)
            : (dateObj.getMonth() + 1),
            (dateObj.getDate()).toString().length === 1
            ? '0' + (dateObj.getDate())
            : (dateObj.getDate())].join('-')
          dispatch(fetchSchedule(date));
        })
        .catch((err) => {
          throw err;
        });
  };

  if (admin === true) {
    return (
      <div id="activityLogContainer">
        <h1 style={{margin: 0, padding: '20px', borderBottom: '#8eb4d9 1px solid'}}>Activity Log</h1>
      <div className="activityLog">
        {activities.map((activity) => (
        <div className="activityListItem" key={activity.id}>
            {activity.type_of_activity.split(' ').slice(1, 3).join(' ') === 'has picked' ? <strong className="update">Update: </strong> : <strong className="alert">Alert: </strong>}
            {activity.type_of_activity}
            <br />
          </div>
        ))}
      </div>
    </div>
    );
  }

    return (
      <div id="activityLogContainer">
        <h1 style={{margin: 0, padding: '20px', borderBottom: '#8eb4d9 1px solid'}}>Activity Log</h1>
        <div className="activityLog">
          {activities.map((activity) => (
            activity.type_of_activity.split(' ').slice(1, 3).join(' ') === 'has changed' || activity.type_of_activity.split(' ').slice(1, 3).join(' ') === 'has requested' ? <></> :
            <div key={activity.id}className="activityListItem">
              <br />
              <strong>Alert:</strong>{' '}{activity.type_of_activity}
              <br />
              {activity.type_of_activity.split(' ').slice(1, 3).join(' ') === 'has given' ? <div id="pickup-shift-btn">
                <button disabled={userRoles.includes(activity.type_of_activity.split(' ')[5]) ? false : true} id={activity.id} onClick={(e) => pickUpShift(e, activity)}>Pick Up Shift</button>
                </div> : <></>}
              <br />
            </div>
            ))}
        </div>
      </div>
    );
};

export default ActivityList;