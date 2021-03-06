import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EmployeeInfoModal from './employeeInfoModal.jsx';


const DayOfWeek = (props) => {
  const roles = useSelector(state => state.rolesReducer.roles);
  const [isModalOpen, setToggleModal] = useState(false);
  const [shiftInfo, setShiftInfo] = useState({});


  // All of the day's shifts
  const shifts = props.shifts;
  const day = props.day;
  const { previous } = props;

  // Format the time
  const formatTime = (time) => {
    let timeSplit = time.split(' ');
    let hour = timeSplit[3].slice(0, timeSplit.length);
    let dayEve = timeSplit[4];
    return (hour + ' ' + dayEve);
  }

  const toggleModal = (id, name, phone, role, day, e) => {
    setShiftInfo({
      name: name,
      phone: phone,
      id: id,
      role: role,
      day: day
    });
    setToggleModal(prevIsModalOpen => !prevIsModalOpen)
  }

  return (
    <div className="inner-column-spacing">
      {shifts.map((shift, i) => (
        <div className="shift-block" key={shift+i} onClick={(e) => toggleModal(shift.id, shift.name, shift.phone, shift.role[0], day, e)} style={{
          backgroundColor: roles[shift.role[0]],
          opacity: previous ? "30%" : "100%",
          color: 'white'
        }}>
          <span>{shift.name}</span>
          <br/>
          {formatTime(shift.datetime)}
        </div>
      ))}
      <EmployeeInfoModal isOpen={isModalOpen} info={shiftInfo} toggleOpen={toggleModal}/>
    </div>
  )
}

export default DayOfWeek;
