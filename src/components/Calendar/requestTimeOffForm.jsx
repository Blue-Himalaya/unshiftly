import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import fetchSingleTimeOffGet from '../../../redux-state/actions/fetchSingleTimeOff.js'

const RequestTimeOffForm = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.viewReducer.user)
  const currentDate = useSelector(state => state.scheduleReducer.currentDate)

  const { isOpen } = props;
  const { closeModal } = props;

  const [pickDate, setPickDate] = useState(null);
  const [isMorning, setIsMorning] = useState(null);

  const sendTimeOffReq  = (date, morning, empId, empName) => {
    axios.post('/requestSingleDayOff', {
      date: date,
      morning: morning,
      empId: empId,
      empName: empName
    })
    .then(() =>
      dispatch(fetchSingleTimeOffGet(currentDate))
    )
    .catch((err) => console.log('err ', err))
  }

  return (
    <div>
      {isOpen
      ? <div className="modal-outer emp-info-modal">
          <div className="modal-inner emp-info-modal">
            <div className="x-btn-rto-form" onClick={closeModal}>X</div>
            <div className="info-cont">
            <div className="modal-label">Request Time Off</div>
            <div className="info-cont btn-modal-content">
              <span className="modal-label">
                Date:
              </span>
                <input className="date-picker btn-release-shift" type="date" onChange={(e) => setPickDate(e.target.value)}></input>
            </div>
            <div className="info-cont">
              <span className="modal-label">
                Split:
              </span>
              <select className="btn-release-shift" onChange={(e) => setIsMorning(e.target.value)}>
              <option value="">Pick</option>
              <option value={1}>AM</option>
              <option value={0}>PM</option>
              </select>
            </div>
            <button className="btn btn-release-shift" type="submit" onClick={() => sendTimeOffReq(pickDate, isMorning, user[0], user[1])}>Submit request</button>
            </div>
          </div>
      </div>
      : null}
    </div>
  )
}

export default RequestTimeOffForm;
