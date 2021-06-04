import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchActivityList from '../../../redux-state/actions/fetchActivityList.js'
import axios from 'axios';
import moment from 'moment';

const EmployeeInfoModal = (props) => {
  let shiftInfo = props.info; // phone, empName, empId
  let isOpen = props.isOpen;

  const user = useSelector(state => state.viewReducer.user)
  const dispatch = useDispatch();

  const { toggleOpen } = props;

  const [dayOfWeek, setDayOfWeek] = useState('');
  const [daySplit, setDaySplit] = useState('');

  const sendReleaseShiftForm = (e, shiftId, empId, empName, role, date, morning) => {
    const releaseShift = {
      shiftId,
      empId,
      empName,
      role,
      date,
      morning,
    }
    axios.put('/releaseShift', { releaseShift })
    .then(() => {
      dispatch(fetchActivityList());
    })
    .catch(err => {if (err) throw err});
  }

  return (
    <div className="shift-block-cont">
      {isOpen?
        <div className="modal-outer">
          <div className="modal-inner emp-info-modal">
            <div className="x-btn-rto-form" onClick={toggleOpen}>X</div>
            <div className="info-cont">
              <div className="modal-label">
                Employee:
              </div>
              <div className="employee-name-cal">
                {shiftInfo.name}
              </div>
              <div className="modal-label">
                Phone:
              </div>
              <div className="employee-phone">
                {shiftInfo.phone}
              </div>
              {user[1] === shiftInfo.name ? <button className="btn btn-release-shift" onClick={(e) => sendReleaseShiftForm(e, shiftInfo.id, user[0], shiftInfo.name, shiftInfo.role, shiftInfo.date, shiftInfo.morning)}>Drop this shift</button> : null}
              {/* {user[1] === shiftInfo.name
              ? <div className="btn-modal-cont"><select className="btn-release-shift" onChange={(e) => setDayOfWeek(e.target.value)}>
                  <option value="">Day</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                </select>
                <select className="btn-release-shift" onChange={(e) => setDaySplit(e.target.value)}>
                  <option value="">AM/PM</option>
                  <option value={1}>AM</option>
                  <option value={0}>PM</option>
                </select> */}
                {/* <button className="btn btn-release-shift" type="click" onClick={() => sendReleaseShiftForm(shiftInfo.id, shiftInfo.name, shiftInfo.role, user[0], dayOfWeek, shiftInfo.date)}>Submit</button></div>
              : null} */}
            </div>
          </div>
        </div>
        : null}
    </div>
  )
}

export default EmployeeInfoModal;
