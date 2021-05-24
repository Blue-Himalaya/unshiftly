const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('../database/index.js');

app.use(express.static('public'));
app.use(bodyParser.json());

//initial admin page load request
  //query params need start and end date
    //ASK RAYMOND WHAT DATES HE WANTS TO SEE WHEN HE LOADS THE PAGE
app.get('/adminSchedule', (req, res) => {
  const { dateStart, dateEnd } = req.params
  db.getAdminSchedule([dateStart, dateEnd], (results) => {
    res.send(results)
  })
})

//initial employee page load request
app.get('/employeeSchedule', (req, res) => {
  const { employeeID, dateStart, dateEnd } = req.params
  db.getEmployeeSchedule([employeeID, dateStart, dateEnd], (results) => {
    res.send(results)
  })
})

//employee edit schedule view



//employee shift give up/pick up
app.put('/employeeShiftUpdate', (req, res) => {
  const { employeeID, shiftDate, giveUpPickUp} = req.params
  db.updateEmployeeShiftSwap([employeeID, shiftDate, giveUpPickUp], (results) => {
    res.send(results)
  })
})


app.get('/scheduletest', (req, res) => {
  db.query(`select es.datetime, e.name, r.role from employee_schedule es, employees e join employee_roles er on er.id_employee = e.id join roles r on r.id = er.id_role where es.employee_role_one = er.id or employee_role_two = er.id and es.datetime between '2020-10-11' and '2020-10-17' order by es.datetime asc`,
  (error, results, fields) => {
    if (error) {
      res.send(error);
      res.status(500);
      res.end();
    } else {
      res.send(results);
      res.status(200);
      res.end();
    }
  })
})

module.exports = app;