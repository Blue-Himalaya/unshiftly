import React, { useState, useEffect, useLayoutEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import EmployeeAdd from '../EmployeeList/EmployeeAdd.jsx'
import moment from 'moment';
import axios from 'axios';


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
    }
    if(currentEmployee.phone !== currentEmployeePhone) {
      updateCurrentEmployeePhone(currentEmployee.phone)
    }
    if(currentEmployee.roles !== currentEmployeeRoles) {
      updateCurrentEmployeeRoles(currentEmployee.roles)
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

  function transferDateBack(str) {
    moment(str).toISOString()
  }

  function transferDate(str) {
    var date = moment(str);
    var dateComponent = date.utc().format('YYYY-MM-DD');
    transferDateBack(dateComponent)
    return dateComponent
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
  // console.log(currentEmployee.id)
  // console.log(currentEmployeeName)
  // console.log(currentEmployeePhone)
  // console.log(currentEmployeeBirthday)
  // console.dir(currentEmployeeStartDate)
  // console.log(currentEmployee.is_active)
}


const addNewEmployee = (name, phone, birthday, password, startDate, role) => {
  axios.post('/employees', {
    name: name,
    phone: phone,
    birthday: birthday,
    password: password,
    startDate: startDate,
    role: role
  }).catch((err) => console.log('Error', err))
}

//LAYOUT OF ADD EMPLOYEE FUNCTION CALL
// addNewEmployee('Tester','0000000001','4000-02-02','a','1942-05-20','expo')

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
            <div className="employee-edit-credentials">
            <div className="credential  employee-edit-title-password">Password:
            </div>
              <div className="entry employee-edit-password-input">{currentEmployee.password}</div>
            <div className="credential  employee-edit-title">Phone Number:
            </div>
              <div className="entry employee-edit-phone-input" contentEditable="true" suppressContentEditableWarning={true} onFocus={(e) => {e.target.selectionStart = window.cursor}} onInput={e => checkOnChange(e)}>{currentEmployeePhone}</div>
            <div className="credential employee-edit-title">Birthday:
            </div>
              <div className="entry employee-edit-birthday-input">{transferDate(currentEmployeeBirthday)}</div>
              <div className="credential employee-edit-title">Start Date:
              </div>
                <div className="entry employee-edit-startDate-input">{transferDate(currentEmployee.start_date)}</div>
              </div>
            <div className="credential  employee-edit-title">Roles:{currentEmployee.roles.map((role) => {
              return (<div className="employee-edit-roles-input" key={role.role}>{role.role}</div>)
              })}</div>
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