import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminNotifications from './adminNotifs.jsx';
import updateActivities from '../../../../redux-state/actions/updateActivities.js';

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
  };

  if (admin === true) {
    return (
      <div>
      <h1>Activity Log</h1>
      <button onClick={() => setView('adminNotifs')}>Pending Swaps</button>
      <ul>
      {Object.values(schedule).map((shiftArr) => (
        shiftArr.map((shift) => (
        <li name={shift.name}> Date: {shift.datetime}
          <br />
          Name: {shift.name}
          <br />
          Role: {shift.role}
          <br />
          Phone: {shift.phone}
          <br />
          <div id="pickup-shift-btn">
          <button disabled={false} name={shift.name} onClick={(e) => pickUpShift(e)}>Pick Up Shift</button>
          </div>
          </li>
        ))
      ))}
      </ul>
    </div>
    )
  }

    return (
      <div>
      <h1>Activity Log</h1>
      <ul>
      {Object.values(schedule).map((shiftArr) => (
        shiftArr.map((shift) => (
        <li name={shift.name}> Date: {shift.datetime}
          <br />
          Name: {shift.name}
          <br />
          Role: {shift.role}
          <br />
          Phone: {shift.phone}
          <br />
          <div id="pickup-shift-btn">
          {/** activity.pending ?  <button disabled={true} name={shift.name} onClick={(e) => pickUpShift(e)}>Pick Up Shift</button> : <button disabled={false} name={shift.name} onClick={(e) => pickUpShift(e)}>Pick Up Shift</button> */}
          <button disabled={false} name={shift.name} onClick={(e) => pickUpShift(e)}>Pick Up Shift</button>
          </div>
          </li>
        ))
      ))}
      </ul>
    </div>
    )
  }

  // for (const x in schedule) {
  //   getProps(x);
  // }

  // if admin view
  // alerts should be present...
  // notifications tab? ... probably
  // these notificatinos include:
    // overtime alerts (calculate hours scheduled)
    // the ability to approve/deny trades

  // if employee view just activity log and
  // option to pick up shift

  // const pickupShift = (e) => {
      // employee view
    // when someone picks up a shift
    // notify admin with: name2 wants to pick up shift from name1 on *date* as *role*
      // name acting as shift id
    // notifyAdmin(e.target.name)
    // pick up shift btn should switch from 'pick up' to pending
    // if admin approves then
    // shift should be *deleted* from activity log view
      // and deleted from database
      // schedule in redux state should update too
      // this should update the schedule
    // if admin denies then pickup option should be available again
//   };



// };

export default ActivityList;