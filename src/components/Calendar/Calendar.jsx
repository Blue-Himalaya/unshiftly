import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Shifts from './shifts.jsx';
import RequestTimeOffForm from './requestTimeOffForm.jsx';
import ReleaseShiftForm from './releaseShiftForm.jsx';
import ActivityList from './ActivityList/ActivityList.jsx';
import fetchWeek from '../../../redux-state/actions/fetchWeek.js';

const Calendar = () => {
  const dispatch = useDispatch();

  const admin = useSelector(state => state.adminReducer.admin);
  const roles = useSelector(state => state.rolesReducer.roles);
  const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const weekDate = useSelector(state => state.scheduleReducer.weekDate);
  const employees = useSelector(state => state.employeeReducer.employees);
  const columnDates = useSelector(state => state.scheduleReducer.listOfDays);
  const currentDateInfo = useSelector(state => state.scheduleReducer.currentDate).split('-');
  const startDateInfo = useSelector(state => state.scheduleReducer.startDate); // ['2019', '10', '15']

  let today = `${currentDateInfo[1]} ${currentDateInfo[0]}`

  const [isFormOpen, setToggleForm] = useState(false);
  const [isReleaseFormOpen, setToggleReleaseForm] = useState(false);

  const timeOffReqForm = () => {
    setToggleForm(prevIsFormOpen => !prevIsFormOpen)
  }
  const toggleReleaseShiftForm = () => {
    setToggleReleaseForm(prevIsReleaseFormOpen => !prevIsReleaseFormOpen)
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div>
      <div className="view-container">
        <div className="cal-container">
          <div className="title-container">
            <h1 className="cal-title"> <span className="btn" onClick={() => dispatch(fetchWeek(weekDate, -7))}>{'<'}</span> {months[startDateInfo.getUTCMonth()]} {currentDateInfo[0]} <span className="btn" onClick={() => dispatch(fetchWeek(weekDate, 7))}>{'>'}</span></h1>
          </div>
          <div className="cal-contents-cont">
                <div className="date-container">
                  <div className="day">Fri
                    <div className="date">{columnDates[0]}</div>
                  </div>
                </div>
                <div className="date-container">
                  <div className="day">Sat
                    <div className="date">{columnDates[1]}</div>
                  </div>
                </div>
                <div className="date-container">
                  <div className="day">Sun
                    <div className="date">{columnDates[2]}</div>
                  </div>
                </div>
                <div className="date-container">
                  <div className="day">Mon
                    <div className="date">{columnDates[3]}</div>
                  </div>
                </div>
                <div className="date-container">
                  <div className="day">Tue
                    <div className="date">{columnDates[4]}</div>
                  </div>
                </div>
                <div className="date-container">
                  <div className="day">Wed
                    <div className="date">{columnDates[5]}</div>
                  </div>
                </div>
                <div className="date-container">
                  <div className="day">Thu
                    <div className="date">{columnDates[6]}</div>
                  </div>
                </div>
              <Shifts />
            </div>
            <button type="click" onClick={timeOffReqForm}>Request Time Off</button>
            <RequestTimeOffForm isOpen={isFormOpen} closeModal={timeOffReqForm}/>
        </div>
          <div className="activity-log-container">
            <div className="activity-grid">
              <ActivityList />
            </div>
          </div>
      </div>
    </div>
  );
}

export default Calendar;
