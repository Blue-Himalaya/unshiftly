const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const expressSession = require('express-session');
const app = express();
const path = require('path');
const db = require('../database/index.js');
const moment = require('moment');
const helperFunctions = require('./helperFunctions.js')
const dbHelpers = require('../database/queries.js')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

app.use(expressSession({
  secret: process.env.secretOrKey,
  resave: true,
  saveUninitialized: true,
}));

app.use(cookieParser(process.env.secretOrKey));
app.use(passport.initialize());
app.use(passport.session());
const passportAuth = require('./passportConfig');
passportAuth(passport);

app.post('/login', (req, res, next) => {
  console.log(req)
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info)
    if (err) throw err;
    if (!user) res.send('No User Exists');
    else {
      req.logIn(user, err => {
        if (err) throw err;
        res.send({auth: 'success!', role: user[0].role});
      });
    }
  })(req, res, next);
});

app.get('/user', (req, res) => {
  res.send(req.user);
});

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

app.get('/getActivities', (req, res) => {
  dbHelpers.getActivities((results) => {
    res.send(results);
  });
});

app.put('/updateActivities', (req, res) => {
  const { id, type } = req.body;
  dbHelpers.updateActivities(1, type, (results) => {
    res.send(results);
  });
})


module.exports = app;
