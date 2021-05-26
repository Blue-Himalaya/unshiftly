import React, { useState, useEffect, useLayoutEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import fetchSchedule from '../../../redux-state/actions/fetchEmployees.js';
import EmployeeAdd from '../EmployeeList/EmployeeAdd.jsx'


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
  const [currentEmployee, updateCurrentEmployee] = useState(employees[0])

  //MODAL
  const [showModal, updateShowModal] = useState(false);



  useEffect(() => {
    if (employees) {
      // UPDATES ACTUAL LIST WITH EMPLOYEE'S NAMES
      let employeeNames = []

      employees.map((employee) => {
        employeeNames.push(employee.name)
      })

      updateEmployeeNames(employeeNames)
  }
  }, []);


  // WINDOW SIZE
  const [width, height] = useWindowSize();

  // CHANGES CURRENTLY VIEWED EMPLOYEE
  function changeCurrent(e) {
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].name === e.target.innerHTML) {
        updateCurrentEmployee(employees[i])
      }
    }
  };

  //ALLOWS FOR MODAL TO BE OPENED AND CLOSED
  function setShowModal(e) {
    updateShowModal(!showModal)
    console.log(showModal)
  }

  return (
    <div className="employeeList">
      <div className="employee-list-container">
        <div className="employee-list-title">Employee List</div>
        <div className="employee-names">
          {employeeNames ?
          employeeNames.map((employee) => {
            return (
            <div
            key={employee}
            className='employee-name-entry'
            onClick={changeCurrent}
            >
              {employee}
              </div>
            )

          })
          : <div> NOT DONE </div>}
        </div>
      </div>
      <div className="employee-edit-container">
        {currentEmployee ?
          <div className="employee-edit-entries">
            <div className="employee-edit-name">{currentEmployee.name}</div>
            <div className="employee-edit-password">Password: {currentEmployee.password}</div>
            <div className="employee-edit-phone">Phone Number: {currentEmployee.phone}</div>
            <div className="employee-edit-birthday">Birthday: {currentEmployee.birthday}</div>
            <div className="employee-edit-roles">Roles:{currentEmployee.roles.map((role) => {
              return (<div key={role.role}>{role.role}</div>)
            })}</div>
            <div className="employee-edit-startDate">Start Date: {currentEmployee.start_date}</div>
          </div>
        : <div> NOT DONE</div>}
      </div>
      <div className="employee-add-button">
      <button onClick={e => {setShowModal(e)}}></button>
      <EmployeeAdd onClose = {setShowModal} showModal={showModal}/>
      </div>
      <div className="employee-remove-button">
          <button></button>
      </div>
    </div>

  );
};


export default EmployeeList;