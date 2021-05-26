import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const RequestTimeOffForm = (props) => {
  const user = useSelector(state => state.viewReducer.user)
  const { isOpen } = props;
  const { closeModal } = props;
  console.log(user);
  return (
    <div>
      {isOpen
      ? <div className="emp-info-modal-bg">
          <div className="emp-info-modal">
            <div className="x-btn-rto-form" onClick={closeModal}>X</div>
            Request Time Off
            <br/>
            Date: <input className="date-picker" type="date"></input>
            <br/>
            Split: <select>
              <option value="">Pick</option>
              <option value="1">AM</option>
              <option value="0">PM</option>
            </select>
            Employee info: {}
            <button type="submit">Submit request</button>

          </div>
      </div>
      : null}
      {/* Request time off form */}
    </div>
  )
}

export default RequestTimeOffForm;
