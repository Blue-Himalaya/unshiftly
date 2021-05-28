import React, { useState, useEffect, useLayoutEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';


const EmployeeAdd = ({showModal, onClose}) => {
  //MODAL CLOSE
  function close(e) {
     onClose(e);
  }

  const [addEmployeeName, updateAddEmployeeName] = useState(addEmployee.name)
  const [addEmployeePhone, updateAddEmployeePhone] = useState(addEmployee.phone)
  const [addEmployeeBirthday, updateAddEmployeeBirthday] = useState(addEmployee.birthday)
  const [addEmployeePassword, updateAddEmployeePassword] = useState(addEmployee.password)
  const [addEmployeeStartDate, updateAddEmployeeStartDate] = useState(addEmployee.start_date)
  const [addEmployeeRoles, updateAddEmployeeRoles] = useState(addEmployee.roles)



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
            <button onClick={close}>Submit</button>
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