const connection = require('./index.js')
const bcrypt = require('bcrypt');

/*
======================================================
        Auth
======================================================
*/
const authenticateUser = (username, callback) => {
  const queryString = `SELECT * FROM employees WHERE name = '${username}'`;
  connection.query(queryString, (err, results) => {
    callback(null, results);
  });
};

const checkIfAdmin = (id, callback) => {
  const queryString = `SELECT role FROM roles r INNER JOIN employee_roles er ON r.id = er.id_role WHERE id_employee = ${id}`;
  connection.query(queryString, (err, results) => {
    callback(null, results[0].role);
  });
};

/*
======================================================
        Scheduling
======================================================
*/
const getSchedule = (dateObj, callback) => {
  const queryString = `select es.id, es.datetime, e.name, r.role, e.phone from employee_schedule es, employees e join employee_roles er on er.id_employee = e.id join roles r on r.id = er.id_role where es.employee_role_one = er.id and es.datetime between '${dateObj.startDate}' and '${dateObj.endDate}' or employee_role_two = er.id and es.datetime between '${dateObj.startDate}' and '${dateObj.endDate}' order by es.datetime asc`
  connection.query(queryString, (err, results) => {
    if(err) console.log("db err", err)
    else callback(null, Object.values(JSON.parse(JSON.stringify(results))))
  })
}
const postSchedule = (request, cb) => {
  let len = request.schedule.length;
  let role_one_values = [];
  let role_two_values = [];
  let retArr = [];
  for (let i = 0; i < len; i ++) {
    (function (i) {
      connection.query(`SELECT '${request.schedule[i].dateTime}' AS date, er.id FROM employee_roles er JOIN employees e ON er.id_employee = e.id JOIN roles r ON er.id_role = r.id WHERE e.name = '${request.schedule[i].name}' AND r.role = '${request.schedule[i].role_one}'`,
      (error, results, fields) => {
        if (error) {
          console.error('error: ', error);
        } else {
          role_one_values.push(results);
          if (role_one_values.length === len) {
            role_one_values = Object.values(JSON.parse(JSON.stringify(role_one_values)));
            for (let i = 0; i < role_one_values.length; i ++) {
              retArr.push([role_one_values[i][0]['date'], role_one_values[i][0]['id']]);
            }
            for (let j = 0; j < retArr.length; j ++) {
              (function (j) {
                connection.query(`SELECT '${request.schedule[j].dateTime}' AS date, er.id FROM employee_roles er JOIN employees e ON er.id_employee = e.id JOIN roles r ON er.id_role = r.id WHERE e.name = '${request.schedule[j].name}' AND r.role = '${request.schedule[j].role_two}'`,
                (err, rslts) => {
                  if (err) {
                    console.error('err: ', err);
                  } else {
                    if (!rslts.length) {
                      retArr[j].push(null);
                      role_two_values.push(null);
                      if (role_two_values.length === len) {
                        setSchedule(retArr, cb);
                      }
                    } else {
                      retArr[j].push(Object.values(JSON.parse(JSON.stringify(rslts)))[0]['id']);
                      role_two_values.push(rslts);
                      if (role_two_values.length === len) {
                        setSchedule(retArr, cb);
                      }
                    }
                  }
                })
              })(j);
            }
          }
        }
      })
    })(i);
  }
}

const setSchedule = (arr, callback) => {
  connection.query(`INSERT INTO employee_schedule (datetime, employee_role_one, employee_role_two) VALUES ?`, [arr],
  (error, results, fields) => {
    if (error) {
      console.error(error);
    } else {
      callback(results);
    }
  });
}

/*
======================================================
        Scheduling Realse-Pick Up
======================================================
*/
const releaseShift = (reqObj, callback) => {
  console.log(reqObj);
  const { shiftId, empName, empId, date, morning, role } = reqObj;
  const shift = morning ? 'morning' : 'evening';
  const activityString = `${empName} has given up their ${role} - ${morning} shift on ${date}.`
  const queryString = `update employee_schedule set is_released = 1 where id = '${shiftId}'; insert into activity (time_of_activity, type_of_activity) values (now(), '${activityString}')`
  connection.query(queryString, (err, results) => {
    if(err) console.log(err);
    else callback(results);
  })
}

const pickUpShift = (reqObj, callback) => {
  const {date, morning, shiftId, role, empName, empId} = reqObj;
  const shift = morning ? 'morning' : 'evening';
  const activityString = `${empName} has picked up a ${role} shift on ${date} in the ${shift}`
  const queryString = `UPDATE employee_schedule SET employee_role_one = (SELECT er.id FROM employee_roles er JOIN employees e ON er.id_employee = e.id JOIN roles r ON er.id_role = r.id WHERE e.name = '${empName}' AND r.role = '${role}'), is_released = 0 WHERE id = ${shiftId}; INSERT INTO activity (time_of_activity, type_of_activity) VALUES (now(), '${activityString}')`;
  connection.query(queryString, (err, results) => {
    if(err) console.log(err);
    else callback(results);
  })
}
/*
======================================================
        Time-Off-Single
======================================================
*/
const getAllSingleTimeOff = (dateObj, callback) => {
  const queryString = `select t.id, t.date, t.morning, e.name, e.id from time_off t  join employees e where t.id_employee = e.id and t.date between '${dateObj.startDate}' and '${dateObj.endDate}' order by t.date asc`;
  connection.query(queryString, (err, response) => {
    if(err) console.log(err)
    else callback(response)
  })
}

const requestSingleDayOff = (requestObj, callback) => {
  /*
  date
  morning
  empId
  empName
  */
  const {date, morning, empId, empName} = requestObj;
  const shift = morning ? 'morning' : 'evening';
  const queryString = `insert into time_off (id_employee, date, morning) values ('${empId}', '${date}', '${morning}'); insert into activity (time_of_activity, type_of_activity) values (now(), '${empName} has requested the ${shift} off on the date of ${date}')`;
  connection.query(queryString, (err, results) => {
    if(err) console.log(err)
    else callback(results)
  })
}

const removeSingleTimeOff = (timeOffId, callback) => {
  const queryString = `DELETE FROM time_off WHERE id = ${timeOffId}`;
  connection.query(queryString, (err, results) => {
    if(err) console.log(err)
    else callback(results)
  })
}

/*
======================================================
        Time-Off-Recurring
======================================================
*/

const getAllRecurringTimeOff = (callback) => {
  const queryString = `select r.day, r.morning, e.name, e.id from recurring_time_off r join employees e where r.id_employee = e.id`;
  connection.query(queryString, (err, response) => {
    if(err) console.log(err)
    else callback(response)
  })
}

const addNewRecurringTimeOff = (requestInfo, callback) => {
  const { employeeId, dayOfWeek, morning, employeeName } = requestInfo;
  const shift = morning ? 'morning' : 'evening';
  const activityString = `${employeeName} has changed their availability for ${dayOfWeek} in the ${shift}.`
  const queryString = `insert into recurring_time_off (id_employee, day, morning) values ('${employeeId}', '${dayOfWeek}', '${morning}'); INSERT INTO activity (time_of_activity, type_of_activity) VALUES (now(), '${activityString}')`
  connection.query(queryString, (err, results) => {
    if(err) console.log(err)
    else callback(results)
  })
}

const revokeRecurringTimeOff = (dayOff, callback) => {
  const {employeeName, employeeId, dayOfWeek, morning} = dayOff;
  const shift = morning ? 'morning' : 'evening';
  const activityString = `${employeeName} has changed their availability for ${dayOfWeek} in the ${shift}.`;
  const queryString = `DELETE FROM recurring_time_off WHERE id_employee = ${employeeId} AND day = '${dayOfWeek}' AND morning = ${morning}; INSERT INTO activity (time_of_activity, type_of_activity) VALUES (now(), '${activityString}')`
  connection.query(queryString, (err, results) => {
    if(err) console.log(err)
    else callback(results);
  });
}

/*
======================================================
        Activities
======================================================
*/

const getActivities = (callback) => {
  // const queryString = `select a.type_of_activity, es.id, es.datetime, e.name, r.role, e.phone from employee_schedule es join activity a on a.shift = es.id, employees e join employee_roles er on er.id_employee = e.id join roles r on r.id = er.id_role where es.employee_role_one = er.id or employee_role_two = er.id `;
  const queryString = `select * from activity`;
  connection.query(queryString, (err, response) => {
    if (err) console.log(err)
    else callback(response);
  })
}

const updateActivities = (id, name, type, callback) => {
  // const queryString = `UPDATE activity SET type_of_activity='${type}' WHERE id=${id}`;
   connection.query(queryString, (err, response) => {
     if (err) console.log(err);
     else getActivities(callback);
   })
}

/*
======================================================
        Get/Add/Edit Employees
======================================================
*/
const getAllActiveEmployees = (callback) => {
  const queryString = 'select e.id, e.name, e.phone, e.birthday, e.start_date, e.password, e.is_active, r.role from employees e join employee_roles er on er.id_employee = e.id join roles r on r.id = er.id_role where e.is_active = 1'
  connection.query(queryString, (err, response) => {
    if(err) console.log(err)
    else callback(response)
  })
}

const createEmployee = (employeeData, callback) => {
  const { name, phone, birthday, password, start_date, role } = employeeData;
  console.log(name, phone, birthday, password, start_date, role)
  bcrypt.hash(password, bcrypt.genSaltSync(10), (err, hashedPwd) => {
    console.log(hashedPwd);
    //*** Don't know if this works yet! ***/
    // const queryString = `insert into employees (name, phone, birthday, password, start_date, is_active) values ('${name}', ${phone}, '${birthday}', '${hashedPwd}', '${start_date}', 1)`;
    // insert into employee_roles (id_employee, id_role) values ((select id from employee where name = '${name}'), (select id from roles where name='${role}'))`;

    // connection.query(queryString, (err, results) => {
    //   if (err) throw err;
    //   console.log(results);
    // });
  });
}

const editEmployee = (requestObj, callback) => {
  const {id, name, phone, birthday, startDate, isActive} = requestObj;
  const queryString = `UPDATE employees SET name = '${name}', phone = '${phone}', birthday = '${birthday}', start_date = '${startDate}', is_active = ${isActive} WHERE id = ${id}`;
  connection.query(queryString, (err, results) => {
    if(err) console.log(err)
    else callback(results)
  })
}

/*
======================================================
        Roles & Colors
======================================================
*/
const getRolesWithColors = (callback) => {
  const queryString = 'select r.role, r.color from roles r';
  connection.query(queryString, (err, response) => {
    if(err) console.log(err)
    else callback(response)
  })
}

const changeRoleColor = (roleColorObj, callback) => {
  const queryString = `update roles set color = '${roleColorObj.color}' where role = '${roleColorObj.role}'`;
  connection.query(queryString, (err, response) => {
    if(err) console.log(err)
    else callback(response)
  })
}



module.exports ={
  getAllActiveEmployees,
  getAllSingleTimeOff,
  getRolesWithColors,
  getActivities,
  authenticateUser,
  checkIfAdmin,
  changeRoleColor,
  postSchedule,
  getSchedule,
  getAllRecurringTimeOff,
  requestSingleDayOff,
  editEmployee,
  removeSingleTimeOff,
  revokeRecurringTimeOff,
  addNewRecurringTimeOff,
  pickUpShift,
  releaseShift
}


