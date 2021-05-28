import React, { useState, useEffect, useLayoutEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


const EmployeeAdd = ({showModal, onClose}) => {
  //MODAL CLOSE
  function close(e) {
     onClose(e);
  }

  const [addEmployeeName, updateAddEmployeeName] = useState(null)
  const [addEmployeePhone, updateAddEmployeePhone] = useState(null)
  const [addEmployeeBirthday, updateAddEmployeeBirthday] = useState(null)
  const [addEmployeePassword, updateAddEmployeePassword] = useState(null)
  const [addEmployeeStartDate, updateAddEmployeeStartDate] = useState(null)
  const [addEmployeeRoles, updateAddEmployeeRoles] = useState(null)



  useEffect(() => {
  }, []);

  let containerStyle;
  if(!showModal) {
    containerStyle = {
      display: 'none',
    }
    return null;
  }

  if(showModal) {
    containerStyle = {
      display: 'block',
    }
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
      return eval('updateAddEmployee' + extractClassName(e.target.className))(e.target.value)
    }

    updateName(e);
  }

  //ADD NEW EMPLOYEE
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

function submitChanges() {
  addNewEmployee(addEmployeeName, addEmployeePhone, addEmployeeBirthday, addEmployeePassword, addEmployeeStartDate, addEmployeeRoles);
  close();
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
    <div className='employeeAdd modal-outer' style = {containerStyle}>
      <div className='employeeAdd-container modal-inner'>
        <div className="employee-add-entries">
            <input className="employee-add-name-input" placeholder="Name" input="text" onChange={e => checkOnChange(e)}></input>
            <div className="employee-add-credentials">
            <div className="credential  employee-add-title-password">Password:</div>
            <input className="entry employee-add-password-input" placeholder="Password" input="text" onChange={e => checkOnChange(e)}/>
            <div className="credential  employee-add-title">Phone Number:
            </div>
              <input className="entry employee-add-phone-input" placeholder="10 digit number (1234567890)" input="text" onChange={e => checkOnChange(e)}/>
            <div className="credential employee-add-title">Birthday:
            </div>
              <input className="entry employee-add-birthday-input" placeholder="YYYY-MM-DD" input="text" onChange={e => checkOnChange(e)}/>
              <div className="credential employee-add-title">Start Date:
              </div>
                <input className="entry employee-add-startDate-input" placeholder="YYYY-MM-DD" input="text" onChange={e => checkOnChange(e)}/>
            <div className="credential  employee-add-title">Role:</div>
            <input className="entry employee-add-roles-input" placeholder="ex: Expo" input="text" onChange={e => checkOnChange(e)}/>
              </div>
          </div>
        <div className='footer'>
          <div className='submit-new'>
            <button onClick={submitChanges}>Submit</button>
          </div>
          <div className='exit-new'>
            <button onClick={close}> Exit </button>
          </div>
        </div>
      </div>
    </div>

  );
};


export default EmployeeAdd;