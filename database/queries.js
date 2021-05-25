const connection = require('./index.js')
const bcrypt = require('bcrypt');

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

const getActivities = (callback) => {
  const queryString = 'select * from activity';
  connection.query(queryString, (err, response) => {
    if (err) console.log(err)
    else callback(response);
  });
}

const updateActivities = (id, type, callback) => {
  const queryString = `UPDATE activity SET type_of_activity='pending' WHERE id=${id}`;
   connection.query(queryString), (err, response) => {
     if (err) console.log(err);
   }
   getActivities(callback);
}

// const authenticateUser = (username, password, callback) => {
//   const mockQuery = {
//     username: 'example@email.com',
//     password: '$2b$05$rcLWLmTW19u0nhsNZuV6C.uDeNv2fYGLDqxFK/7nuttuY6/x99N2W',
//   }
//   bcrypt.compare(password, password, function(err, result) {
//     if (err) throw err;
//     if (result === false) {
//       callback('INVALID COMBINATION');
//     }
//     callback(err, result);
//   });
// };

// const updateSchedule = () => {

// }

// const updateNotifications = () => {

// }

// `id` INTEGER AUTO_INCREMENT,
//   `shift` INTEGER,
//   `time_of_activity` DATETIME,
//   `type_of_activity` VARCHAR, -- as in, take or drop
//   PRIMARY KEY (`id`)



module.exports ={
  getAllActiveEmployees,
  getAllRecurringTimeOff,
  getRolesWithColors,
  getActivities,
  updateActivities,
  // authenticateUser,
}


