import React, { useState, useEffect, useLayoutEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import fetchSchedule from '../../../redux-state/actions/fetchEmployees.js';


function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const EmployeeList = () => {

  //EMPLOYEE DATA
  const employees = useSelector(state => state.employeeReducer.employees);
  console.log(employees)
        // const dispatch = useDispatch();

  useEffect(() => {
          // dispatch(fetchSchedule());
          // page load, then immediate schedule view
          //



  }, []);


  // WINDOW SIZE
  const [width, height] = useWindowSize();

  return (
    <div className="employeeList">
      <div className="list">
        Employee List
        <div className="employee-names">
            <div id="calendar-dates">
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
            </div>
            <div>shifts</div>
          </div>
      </div>

        <div className="activity-log-container">
          <div className="activity-grid">
          </div>
        </div>

    </div>
  );
};


export default EmployeeList;