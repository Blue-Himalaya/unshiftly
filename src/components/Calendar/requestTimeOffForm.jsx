import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import fetchSingleTimeOffGet from '../../../redux-state/actions/fetchSingleTimeOff.js'
// fetch the other timeoff thing!

const RequestTimeOffForm = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.viewReducer.user)
  const currentDate = useSelector(state => state.scheduleReducer.currentDate)

  const { isOpen } = props;
  const { closeModal } = props;
  console.log(user);

  const [pickDate, setPickDate] = useState(null);
  const [isMorning, setIsMorning] = useState(null);

  const sendTimeOffReq  = (date, morning, empId, empName) => {
    console.log(morning);
    axios.post('/requestSingleDayOff', {
      date: date,
      morning: morning,
      empId: empId,
      empName: empName
    })
    .then((body) =>
      dispatch(fetchSingleTimeOffGet(currentDate))
    )
    .catch((err) => console.log('err ', err))
  }

  return (
    <div>
      {isOpen
      ? <div className="emp-info-modal-bg-req modal-outer">
          <div className="emp-info-modal-req modal-inner">
            <div className="x-btn-rto-form" onClick={closeModal}>X</div>
            Request Time Off
            <br/>
            Date: <input className="date-picker" type="date" onChange={(e) => setPickDate(e.target.value)}></input>
            <br/>
            Split: <select onChange={(e) => setIsMorning(e.target.value)}>
              <option value="">Pick</option>
              <option value={1}>AM</option>
              <option value={0}>PM</option>
            </select>
            <button type="submit" onClick={() => sendTimeOffReq(pickDate, isMorning, user[0], user[1])}>Submit request</button>
          </div>
      </div>
      : null}
    </div>
  )
}

export default RequestTimeOffForm;
