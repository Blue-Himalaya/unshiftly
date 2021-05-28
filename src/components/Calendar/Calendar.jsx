import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Shifts from './shifts.jsx';
import RequestTimeOffForm from './requestTimeOffForm.jsx';
import ReleaseShiftForm from './releaseShiftForm.jsx';
import ActivityList from './ActivityList/ActivityList.jsx';

const Calendar = () => {
  const admin = useSelector(state => state.adminReducer.admin);
  const roles = useSelector(state => state.rolesReducer.roles);
  const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const employees = useSelector(state => state.employeeReducer.employees);
  const columnDates = useSelector(state => state.scheduleReducer.listOfDays);
  const currentDateInfo = useSelector(state => state.scheduleReducer.currentDate).split('-');

  let today = `${currentDateInfo[1]} ${currentDateInfo[2]} ${currentDateInfo[0]}`

  const [isFormOpen, setToggleForm] = useState(false);
  const [isReleaseFormOpen, setToggleReleaseForm] = useState(false);

  const timeOffReqForm = () => {
    setToggleForm(prevIsFormOpen => !prevIsFormOpen)
  }
  const toggleReleaseShiftForm = () => {
    setToggleReleaseForm(prevIsReleaseFormOpen => !prevIsReleaseFormOpen)
  }

  useEffect(() => {}, [])

  return (
    <div>
      <div className="view-container">
        <div className="cal-container">
          <div className="title-container">
            <h1 className="cal-title"> <span>{'<'}</span> {today} <span>{'>'}</span></h1>
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
            <button type="click" onClick={timeOffReqForm}>Request Time Off</button>
            <RequestTimeOffForm isOpen={isFormOpen} closeModal={timeOffReqForm}/>
            <button type="click">Release Shift</button>
        </div>

          <div className="activity-log-container">
            <div className="activity-grid">
              <ActivityList />
            </div>
          </div>
      </div>
      <button type="click" onClick={timeOffReqForm}>Request Time Off</button>
      <RequestTimeOffForm isOpen={isFormOpen} closeModal={timeOffReqForm} />
      {/* <button type="click"  onClick={toggleReleaseShiftForm}>Release Shift</button>
      <ReleaseShiftForm isOpen={isReleaseFormOpen} closeModal={toggleReleaseShiftForm} /> */}
    </div>
  );
}

export default Calendar;
