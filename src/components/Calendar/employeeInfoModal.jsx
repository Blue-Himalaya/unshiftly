import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const EmployeeInfoModal = (props) => {
  let employeeInfo = props.info;
  let isOpen = props.isOpen;

  //console.log(employeeInfo);

  const user = useSelector(state => state.viewReducer.user)

  const { openModal } = props;
  const { closeModal } = props;

  const sendReleaseShiftForm = () => {
    console.log('WIP');
    //axios.put
    // .then({
  //     dispatch(fetchActivityList)
  //   })
  //   .catch((err) => console.log(err))
  }

  return (
    <div className="shift-block-cont">
      {isOpen?
        <div className="emp-info-modal-bg-2 modal-outer">
          <div className="emp-info-modal-2 modal-inner">
            <div className="x-btn-rto-form" onClick={closeModal}>X</div>
            Employee: {employeeInfo.name}
            <br/>
            Phone: {employeeInfo.phone}
            <br/>
            ID: {employeeInfo.id}
            {user[1] === employeeInfo.name
            ? <button type="click" onClick={() => console.log('release shift')}>Submit</button>
            : null}
          </div>
        </div>
        : null}
    </div>
  )
}

export default EmployeeInfoModal;
