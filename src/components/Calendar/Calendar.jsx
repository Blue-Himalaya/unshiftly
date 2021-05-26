import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Shifts from './shifts.jsx';
import RequestTimeOffForm from './requestTimeOffForm.jsx';
import ActivityList from './ActivityList/ActivityList.jsx';

const Calendar = () => {
  const admin = useSelector(state => state.adminReducer.admin);
  const roles = useSelector(state => state.rolesReducer.roles);
  const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const employees = useSelector(state => state.employeeReducer.employees);
  const columnDates = useSelector(state => state.scheduleReducer.listOfDays);
  const currentDateInfo = useSelector(state => state.scheduleReducer.currentDate).split('-');

  console.log(columnDates);
  console.log(currentDateInfo);
  let today = `${currentDateInfo[1]} ${currentDateInfo[2]} ${currentDateInfo[0]}`

  const [isFormOpen, setToggleForm] = useState(false);

  // render days (num) dynamically

  // check if admin is true for admin btns + functionality
  // if admin is false
  // render the "request time off (RTO)" btns & "release shift"

  /*
  === REQUEST TIME OFF ===

  Employees can only click on their shifts only
  -When clicked a modal with info & btns pops
  -Has shift info
  -Has "RTO" btn & release schedule btn

  RTO button needs the shift id of the clicked shift

  2- click a "RTO" btn
     modal pops up with field inputs
      -Choose the date (Request a (single) whole day off)
      -Choose whether it's "one time" or "recurring" time off
      -If admin approves the request
      -The calendar should reflect for both the admin
       and the employee who requested greyed out blocks
  */
  // console.log('roles: ', roles);
  // console.log('timeoff: ', timeOff);
  // console.log('employees: ', employees);

  const sendTimeOffReq  = (date, morning, empId, empName) => {
    // submit req func
  }

  const timeOffReqForm = () => {
    // onClick
    setToggleForm(prevIsFormOpen => !prevIsFormOpen)
  }

  return (
    <div>
      <div className="view-container">
        <div className="cal-container">
          <div className="title-container">
            <h1 className="cal-title">{'<'} {today} {'>'}</h1>
          </div>
          <div className="cal-contents-cont">
              <div id="daysOfWeek">
                <div className="date-container">
                  <div className="day">
                    Fri
                    <div className="date">11</div>
                  </div>
                </div>
                <div>Sat</div>
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
              </div>
              <Shifts />
            </div>
        </div>

          <div className="activity-log-container">
            <div className="activity-grid">
              <ActivityList />
            </div>
          </div>
      </div>
      <button type="click" onClick={timeOffReqForm}>Request Time Off</button>
      <RequestTimeOffForm isOpen={isFormOpen} />
      <button type="click">Release Shift</button>
    </div>
  );
}

export default Calendar;