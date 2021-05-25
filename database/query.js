const db = require('./index.js');

const postSchedule = (request, cb) => {
  let len = request.schedule.length;
  let role_one_values = [];
  let role_two_values = [];
  let retArr = [];
  for (let i = 0; i < len; i ++) {
    (function (i) {
      db.query(`SELECT '${request.schedule[i].dateTime}' AS date, er.id FROM employee_roles er JOIN employees e ON er.id_employee = e.id JOIN roles r ON er.id_role = r.id WHERE e.name = '${request.schedule[i].name}' AND r.role = '${request.schedule[i].role_one}'`,
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
                db.query(`SELECT '${request.schedule[j].dateTime}' AS date, er.id FROM employee_roles er JOIN employees e ON er.id_employee = e.id JOIN roles r ON er.id_role = r.id WHERE e.name = '${request.schedule[j].name}' AND r.role = '${request.schedule[j].role_two}'`,
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
  db.query(`INSERT INTO employee_schedule (datetime, employee_role_one, employee_role_two) VALUES ?`, [arr],
  (error, results, fields) => {
    if (error) {
      console.error(error);
    } else {
      callback(results);
    }
  });
}

module.exports = {
  postSchedule
}