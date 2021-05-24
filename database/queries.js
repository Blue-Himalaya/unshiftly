const connection = require('./index.js')

const getAllActiveEmployees = (callback) => {
  const queryString = 'select e.id, e.name, e.phone, e.birthday, e.start_date, e.password, e.is_active, r.role from employees e join employee_roles er on er.id_employee = e.id join roles r on r.id = er.id_role'
  connection.query(queryString, (err, response) => {
    if(err) console.log(err)
    else callback(response)
  })
}

const getAllRecurringTimeOff = (callback) => {
  const queryString = 'select t.date, t.morning, e.name from time_off t  join employees e where t.id_employee = e.id'
  connection.query(queryString, (err, response) => {
    if(err) console.log(err)
    else callback(response)
  })
}

const getRolesWithColors = (callback) => {
  const queryString = 'select r.role, r.color from roles r'
  connection.query(queryString, (err, response) => {
    if(err) console.log(err)
    else callback(response)
  })
}


module.exports ={
  getAllActiveEmployees,
  getAllRecurringTimeOff,
  getRolesWithColors
}
