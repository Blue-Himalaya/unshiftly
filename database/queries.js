const connection = require('./index.js')

const getAllActiveEmployees = (callback) => {
  const queryString = 'select e.id, e.name, e.phone, e.birthday, e.start_date, e.password, e.is_active, r.role from employees e join employee_roles er on er.id_employee = e.id join roles r on r.id = er.id_role where e.is_active = 1'
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

const changeRoleColor = (roleColorObj, callback) => {
  const queryString = `update roles set color = '${roleColorObj.color}' where role = '${roleColorObj.role}'`
  connection.query(queryString, (err, response) => {
    if(err) console.log(err)
    else callback(response)
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


const getSchedule = (dateObj, callback) => {
  const queryString = `select es.id, es.datetime, e.name, r.role, e.phone from employee_schedule es, employees e join employee_roles er on er.id_employee = e.id join roles r on r.id = er.id_role where es.employee_role_one = er.id and es.datetime between '${dateObj.startDate}' and '${dateObj.endDate}' or employee_role_two = er.id and es.datetime between '${dateObj.startDate}' and '${dateObj.endDate}' order by es.datetime asc`
  connection.query(queryString, (err, results) => {
    if(err) console.log("db err", err)
    else callback(null, Object.values(JSON.parse(JSON.stringify(results))))
  })
}


module.exports ={
  getAllActiveEmployees,
  getAllRecurringTimeOff,
  getRolesWithColors,
  changeRoleColor,
  postSchedule,
  getSchedule,
}
