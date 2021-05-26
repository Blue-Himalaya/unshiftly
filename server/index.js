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


app.put('/employeeShiftUpdate', (req, res) => {
  const { employeeID, shiftDate, giveUpPickUp} = req.params
  db.updateEmployeeShiftSwap([employeeID, shiftDate, giveUpPickUp], (results) => {
    res.send(results)
  })
})

/*
this route gets the schedule for the week by dates
you must put startDate and endDate in the params
due to MySql, you must ADD ONE DATE TO THE END DATE!

eg: you need the schedule for 10-11-2020 to 10-17-2020

eg params: { startDate: 2020-10-11, endDate: 2020-10-18 }
*/
app.get('/schedule', (req, res) => {
  const dateObj = req.query
  dbHelpers.getSchedule(dateObj, (err, results) => {
    if(err){
      console.log("server err", err)
    } else {
       var final = helperFunctions.adminScheduleFormatting(results)
       res.send(final)
  }})
})

app.post('/schedule', (req, res) => {
  dbHelpers.postSchedule(req.body, (resultsFromSched) => {
    res.send(resultsFromSched);
    res.status(200);
    res.end();
  })
})

module.exports = app;
app.get('/allActiveEmployees', (req, res) => {
  dbHelpers.getAllActiveEmployees((results) => {
    var final = helperFunctions.employeeRolesFormatting(results)
    res.send(final)
  })
})

app.get('/allSingleTimeOff', (req, res) => {
  const dateObj = req.query
  dbHelpers.getAllSingleTimeOff(dateObj,(results) => {
    res.send(results)
  })
})

app.get('/allRolesAndColors', (req, res) => {
  dbHelpers.getRolesWithColors((results) => {
    res.send(results)
  })
})

//attach role: role, color: new_color_name to params
app.put('/updateRoleColor', (req, res) => {
  const roleColorObj = req.query
  dbHelpers.changeRoleColor(roleColorObj, (results) => {
    res.send(results)
  })
})

app.get('/allRecurringTimeOff', (req, res) => {
  dbHelpers.getAllRecurringTimeOff((results) => {
    res.send(results)
  })
})

/*

example params for requestSingleDayOff:

 {
   date: 2019-10-22,
   morning: 1,
   empId: 4,
   empName: "Danielle"
 }

 */

app.post('/requestSingleDayOff', (req, res) => {
  const requestObj = req.query
  // console.log("reqest obj", requestObj)
  dbHelpers.requestSingleDayOff(requestObj, (results) => {
    res.status(200).send('created')
  })
})

module.exports = app;
