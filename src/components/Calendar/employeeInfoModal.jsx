import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const EmployeeInfoModal = (props) => {
  let employeeInfo = props.info;
  let isOpen = props.isOpen;

  const user = useSelector(state => state.viewReducer.user)

  const { openModal } = props;
  // if the modal is not open return null
  // else the code below (modal) will render

  // put a check for user matching the name of the person in shift block

  return (
    <div className="shift-block-cont">
      {isOpen?
        <div className="emp-info-modal-bg-2 modal-outer">
          <div className="emp-info-modal-2 modal-inner">
            Employee: {employeeInfo[0]}
            <br/>
            Phone: {employeeInfo[1]}
            {user === employeeInfo[0]
            ? <button type="click" onClick={() => console.log('release shift sent')}>Submit</button>
            : null}
          </div>
        </div>
        : null}
    </div>
  )
}

export default EmployeeInfoModal;
