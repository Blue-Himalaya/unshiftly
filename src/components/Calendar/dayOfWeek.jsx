import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EmployeeInfoModal from './employeeInfoModal.jsx';

const DayOfWeek = (props) => {

  //console.log('props: ', props);

  const [isModalOpen, setToggleModal] = useState(false);

  // All of the day's shifts
  const shifts = props.shifts;

  // Format the time
  const formatTime = (time) => {
    let timeSplit = time.split(' ');
    let hour = timeSplit[3].slice(0, timeSplit.length);
    let dayEve = timeSplit[4];
    return (hour + ' ' + dayEve);
  }

  const toggleModal = (pNum, sID) => {
    //console.log(pNum);
    //console.log(sID);
    setToggleModal(prevIsModalOpen => !prevIsModalOpen)
    //console.log(isModalOpen)
  }

  // MODAL
  // in State = { modalOpen: false }
  // onClick toggles the state of modalOpen
  // with conditional rendering
    // then it renders the modal
  // clicking the 'x' button to exit
    // should toggle the state so it can close

  return (
    <div>
      {shifts.map((shift) => (
        <div className="shift-block" onClick={() => toggleModal(shift.phone, shift.id)}>
          {shift.name}
          <br/>
          {formatTime(shift.datetime)}
          <EmployeeInfoModal isOpen={isModalOpen} info={[shift.name, shift.phone]}/>
        </div>
      ))}
    </div>
  )
  //
}

export default DayOfWeek;
