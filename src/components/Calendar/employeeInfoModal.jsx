import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const EmployeeInfoModal = (props) => {
  let employeeInfo = props.info;
  console.log(employeeInfo)

  // if the modal is not open return null
  // else the code below (modal) will render
  if (!props.isOpen) return null;
  return (
    <div className="emp-info-modal-bg">
      <div className="emp-info-modal">
        Employee: {employeeInfo.name}
        <br/>
        Phone: {employeeInfo.phone}
      </div>
    </div>
  )
}

export default EmployeeInfoModal;