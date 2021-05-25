const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('../database/index.js');
const moment = require('moment');
const helperFunctions = require('./helperFunctions.js')
const dbHelpers = require('../database/queries.js')

app.use(express.static('public'));
app.use(bodyParser.json());

//page first loads - admin
  //dates of week, in the request params (start, end)
  //shifts for each day
    //name, time, color coded, employee phone number
  //activity log (limit last 20)

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
// es.employee_role_one, employee_role_two

app.get('/scheduletest', (req, res) => {
  db.query(`select es.datetime, e.name, r.role, e.phone from employee_schedule es, employees e join employee_roles er on er.id_employee = e.id join roles r on r.id = er.id_role where es.employee_role_one = er.id or employee_role_two = er.id and es.datetime between '2020-10-11' and '2020-10-17' order by es.datetime asc`,
  (error, results, fields) => {
    if (error) {
      res.send(error);
      res.status(500);
      res.end();
    } else {
      var final = helperFunctions.adminScheduleFormatting(results)
      res.send(final);
      res.status(200);
      res.end();
    }
  })
})

app.get('/allActiveEmployees', (req, res) => {
  dbHelpers.getAllActiveEmployees((results) => {
    var final = helperFunctions.employeeRolesFormatting(results)
    res.send(final)
  })
})

app.get('/allRecurringTimeOff', (req, res) => {
  dbHelpers.getAllRecurringTimeOff((results) => {
    res.send(results)
  })
})

app.get('/allRolesAndColors', (req, res) => {
  dbHelpers.getRolesWithColors((results) => {
    res.send(results)
  })
})

app.get('/login', (req, res) => {

});






module.exports = app;
