import React, { useState, useEffect, useLayoutEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';


const EmployeeAdd = ({showModal, onClose}) => {
  //MODAL CLOSE
  function close(e) {
     onClose(e);
  }



  useEffect(() => {
  }, []);

  let containerStyle;
  if(!showModal) {
    containerStyle = {
      display: 'none',
    }
    return null;
  }

  if(showModal) {
    containerStyle = {
      display: 'block',
    }
  }

  return (
    <div className='employeeAdd' style = {containerStyle}>
      <div className='employeeAdd-container'>
        ADD AN EMPLOYEE
        <div className='footer'>
        <button onClick={close}> Exit </button>
        <button onClick={close}>Submit</button>
        </div>
      </div>
    </div>

  );
};


export default EmployeeAdd;