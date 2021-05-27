import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const EmployeeInfoModal = (props) => {
  let employeeInfo = props.info;
  // console.log(employeeInfo)
  let isOpen = props.isOpen;

  // if the modal is not open return null
  // else the code below (modal) will render
  return (
    <div>
      {isOpen?
        <div className="emp-info-modal-bg-2 modal-outer">
          <div className="emp-info-modal-2 modal-inner">
            Employee: {employeeInfo.name}
            <br/>
            Phone: {employeeInfo.phone}
          </div>
        </div>
        : null
      }

    </div>
  )
}

export default EmployeeInfoModal;