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
  const [employeeNames, updateEmployeeNames] = useState(null)
  const employees = useSelector(state => state.employeeReducer.employees);
  console.log(employees)
        // const dispatch = useDispatch();

  useEffect(() => {
    if (employees) {

          // dispatch(fetchSchedule());
          // page load, then immediate schedule view
          //
      let employeeNames = []

      employees.map((employee) => {
        employeeNames.push(employee.name)
      })

      updateEmployeeNames(employeeNames)
  }
  }, []);


  // WINDOW SIZE
  const [width, height] = useWindowSize();

  return (
    <div className="employeeList">
      <div className="list">
        Employee List
        <div className="employee-names">
          {employeeNames ?
          employeeNames.map((employee) => {
            return (
            <div key={employee}>{employee}</div>
            )

          })
          : <div> NOT DONE </div>}
        </div>
      </div>
    </div>

  );
};


export default EmployeeList;