import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EmployeeInfoModal from './employeeInfoModal.jsx';

const DayOfWeek = (props) => {
  const [isModalOpen, setToggleModal] = useState(false);
  const [shiftInfo, setShiftInfo] = useState({});


  // All of the day's shifts
  const shifts = props.shifts;

  // Format the time
  const formatTime = (time) => {
    let timeSplit = time.split(' ');
    let hour = timeSplit[3].slice(0, timeSplit.length);
    let dayEve = timeSplit[4];
    return (hour + ' ' + dayEve);
  }

  const toggleModal = (id, name, phone) => {
    setShiftInfo({
      name: name,
      phone: phone,
      id: id
    });
    setToggleModal(prevIsModalOpen => !prevIsModalOpen)
  }

  return (
    <div>
      {shifts.map((shift, i) => (
        <div className="shift-block" key={shift+i} onClick={() => toggleModal(shift.id, shift.name, shift.phone)} >
          {shift.name}
          <br/>
          {formatTime(shift.datetime)}
          <EmployeeInfoModal isOpen={isModalOpen} info={shiftInfo} openModal={toggleModal}/>
        </div>
      ))}
    </div>
  )
}

export default DayOfWeek;
