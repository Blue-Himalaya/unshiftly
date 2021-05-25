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

const authenticateUser = (username, callback) => {
  const queryString = `SELECT * FROM employees WHERE name = '${username}'`;
  connection.query(queryString, (err, results) => {
    callback(null, results);
  });
};

const checkIfAdmin = (id, callback) => {
  const queryString = `SELECT role FROM roles r INNER JOIN employee_roles er ON r.id = er.id_role WHERE id_employee = ${id} `;
  connection.query(queryString, (err, results) => {
    callback(null, results[0].role);
  });
};



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
  authenticateUser,
  checkIfAdmin,
}

// INSERT INTO employees (name, phone, birthday, password) VALUES ('example@email.com', 5166660124, '1997-01-06', '$2y$10$niNB9kx6k.lnLgbLn8yfr.oUzIM4xYV90I6nma3qED3nifn6oWdkK')

