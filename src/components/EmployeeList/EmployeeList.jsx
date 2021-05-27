import React, { useState, useEffect, useLayoutEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
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
  const employees = useSelector(state => state.employeeReducer.employees);
  const [employeeNames, updateEmployeeNames] = useState(null)
  const [currentEmployee, updateCurrentEmployee] = useState(employees[0])
  const [currentEmployeeName, updateCurrentEmployeeName] = useState(currentEmployee.name)
  const [currentEmployeePhone, updateCurrentEmployeePhone] = useState(currentEmployee.phone)
  const [currentEmployeeBirthday, updateCurrentEmployeeBirthday] = useState(currentEmployee.birthday)
  const [currentEmployeePassword, updateCurrentEmployeePassword] = useState(currentEmployee.password)
  const [currentEmployeeStartDate, updateCurrentEmployeeStartDate] = useState(currentEmployee.start_date)
  const [currentEmployeeRoles, updateCurrentEmployeeRoles] = useState(currentEmployee.roles)

  //MODAL
  const [showModal, updateShowModal] = useState(false);



  useEffect(() => {
    // UPDATES ACTUAL LIST WITH EMPLOYEE'S NAMES
    if (employees) {
      let employeeNames = []

      employees.map((employee) => {
        employeeNames.push(employee.name)
      })

      updateEmployeeNames(employeeNames)
    }

    //WATCHES ATTRIBUTES TO CONTINUE TO CHANGE ONCE A DIFFERENT EMPLOYEE IS SELECTED
    if(currentEmployee.name !== currentEmployeeName) {
      updateCurrentEmployeeName(currentEmployee.name)
      console.log('TRIGGERED')
    }
    if(currentEmployee.phone !== currentEmployeePhone) {
      updateCurrentEmployeePhone(currentEmployee.phone)
      console.log('TRIGGERED P')
    }
    if(currentEmployee.roles !== currentEmployeeRoles) {
      updateCurrentEmployeeRoles(currentEmployee.roles)
      console.log('TRIGGERED R')
    }
  }, [currentEmployee.name, currentEmployee.phone, currentEmployee.birthday]);


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
    console.log(currentEmployeeName)
  }

  //CHECKS CURRENT VALUE OF CHANGED TEXT AND CHANGES STATE
  function checkOnChange(e) {

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function extractClassName(e) {
      let split = e.split('-')
      return capitalizeFirstLetter(split[2])
    }
    function updateName(e) {
      return eval('updateCurrentEmployee' + extractClassName(e.target.className))(e.target.innerHTML)
    }

    updateName(e);
  }

/*
  Change information about employees
  Endpoint needs the following in the form of a body from the
  axios put request:
  {id: [employee id],
  name: [employee name],
  phone: [employee phone],
  birthday: [employee birthday],
  startDate: [employee start date],
  isActive: 0 if employee is inactive, 1 if they are active}

  All of these values should be what the employee information should reflect AFTER put request.
  The only variable which is needed, and cannot be changed is the id.
  i.e. if you want to update the isActive, but nothing else, the endpoint still needs the old information for all other fields
*/
function submitChanges() {
  console.log(currentEmployee.id)
  console.log(currentEmployeeName)
  console.log(currentEmployeePhone)
  console.log(currentEmployeeBirthday)
  console.log(currentEmployeeStartDate)
  console.log(currentEmployee.is_active)
}

/*
  employee creation requires a body of the following format:
  {
    name: [employee name],
    phone: [10 character string of phone number],
    birthday: [YYYY-MM-DD],
    password: [initial input password],
    startDate: [YYYY-MM-DD],
    role: [single role] <-- currently only a single role, future work for multiple role array
  }
*/


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
              <div className="employee-edit-name-input" contentEditable="true" suppressContentEditableWarning={true} onInput={e => checkOnChange(e)}>{currentEmployeeName}</div>
            <div className="employee-edit-password-title"> Password:
              <div className="employee-edit-password-input">{currentEmployee.password}</div>
            </div>
            <div className="employee-edit-phone-title">Phone Number:
              <div className="employee-edit-phone-input" contentEditable="true" suppressContentEditableWarning={true} onFocus={(e) => {e.target.selectionStart = window.cursor}} onInput={e => checkOnChange(e)}>{currentEmployeePhone}</div>
            </div>
            <div className="employee-edit-birthday-title">Birthday:
              <div className="employee-edit-birthday-input">{currentEmployeeBirthday}</div>
            </div>
            <div className="employee-edit-roles-title">Roles:{currentEmployee.roles.map((role) => {
              return (<div className="employee-edit-roles-input" key={role.role}>{role.role}</div>)
              })}</div>
            <div className="employee-edit-startDate-title">Start Date:
              <div className="employee-edit-startDate-input">{currentEmployee.start_date}</div>
            </div>
            <button onClick={()=> submitChanges()}>SUBMIT CHANGES</button>
          </div>
        : <div> NOT DONE</div>}
      </div>
      <div className="employee-add-button">
      <button onClick={e => {setShowModal(e)}}>ADD NEW EMPLOYEE</button>
      <EmployeeAdd onClose = {setShowModal} showModal={showModal}/>
      </div>
      <div className="employee-remove-button">
          <button>REMOVE EMPLOYEE FROM ACTIVE</button>
      </div>
    </div>

  );
};


export default EmployeeList;