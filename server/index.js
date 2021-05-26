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
  credentials: true
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

/*
======================================================
        AUTH
======================================================
*/

app.post('/login', (req, res, next) => {
  //console.log(req)
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('No User Exists');
    else {
      req.logIn(user, err => {
        if (err) throw err;
        console.log('USER: ', req.user, 'INFO: ', info)
        res.send({ auth: 'success!', role: user[0].role, user: [user[0].id, user[0].name] });
      });
    }
  })(req, res, next);
});

app.get('/logOut', (req, res) => {
  req.logout();
  console.log('after: ', req);
  res.send('loggedOut');
});

/*
======================================================
        ALL SCHEDULE ENDPOINTS
======================================================
*/

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
/*
Example Body Info For A Employee To Release A Shift
{
  shiftId: [shift-id], <-- provided on schedule return body
  empName: [employee name],
  role: [name of role of shift],
  empId: [employeeId of person picking up shift]
  date: [day of week],
  morning: [boolean]
}
*/

app.put('/releaseShift', (req, res) => {
  const reqObj = req.body;
  //console.log('reqobj', reqObj);
  dbHelpers.releaseShift(reqObj, (results) => {
    res.status(200).send('Shift has been released to the people.')
  })
})

/*
put body requirements:
{
  shiftId: [shift-id], <-- provided on schedule return body
  role: [name of role of shift],
  empName: [employee name],
  empId: [employeeId of person picking up shift],
  date: [shift date],
  morning: [boolean]
}
*/

app.put('/pickUpShift', (req, res) => {
  const reqObj = req.body;
  dbHelpers.pickUpShift(reqObj, (results) => {
    res.status(200).send('Shift successfully picked up').end();
  })
})

/*
======================================================
        TIME OFF - SINGLE
======================================================
*/

app.get('/allSingleTimeOff', (req, res) => {
  const dateObj = req.query;
  dbHelpers.getAllSingleTimeOff(dateObj,(results) => {
    res.send(results)
  })
})

/*
example body for requestSingleDayOff:
 {
   date: 2019-10-22,
   morning: 1,
   empId: 4,
   empName: "Danielle"
 }
 */

app.post('/requestSingleDayOff', (req, res) => {
  const requestObj = req.body
  dbHelpers.requestSingleDayOff(requestObj, (results) => {
    res.status(200).send('created')
  })
})

app.put('/singleTimeOff', (req, res) => {
  const reqId = req.body.id;
  dbHelpers.removeSingleTimeOff(reqId, (results) => {
    res.status(201).send('removed').end();
  })
})

/*
======================================================
        TIME OFF - RECURRING
======================================================
*/

app.get('/recurringTimeOff', (req, res) => {
  dbHelpers.getAllRecurringTimeOff((results) => {
    res.send(results)
  })
})

/*
Example Body For Employee Recurring Time-Off-Request Info Object
{
  employeeName: 'Danielle',
  employeeId: 4,
  dayOfWeek: "Tuesday",
  morning: 0 || 1
}
*/

app.post('/recurringTimeOff', (req, res) => {
  const requestInfo = req.body
  dbHelpers.addNewRecurringTimeOff(requestInfo, (results) => {
    res.status(200).send('time off request recieved')
  })
})

app.put('/recurringTimeOff', (req, res) => {
  const reqObj = req.body;
  dbHelpers.revokeRecurringTimeOff(reqObj, (result) => {
    res.status(204).send('time off revoked').end();
  })
})

/*
======================================================
      EMPLOYEE INFORMATION
======================================================
*/

app.get('/allActiveEmployees', (req, res) => {
  dbHelpers.getAllActiveEmployees((results) => {
    var final = helperFunctions.employeeRolesFormatting(results)
    res.send(final)
  })
})

app.get('/allRolesAndColors', (req, res) => {
  dbHelpers.getRolesWithColors((results) => {
    res.send(results)
  })
})

/*
Change information about employees
Endpoint needs the following in the form of a body from the
axios put request:
{id: [employee id],
name: [employee name],
phone: [employee phone],
birthday: [employee birthday],
startDate: [employee start date],
isActive: 0 if employee is inactive, 1 if they are active}

All of these values should be what the employee information should reflect AFTER put request.
The only variable which is needed, and cannot be changed is the id.
i.e. if you want to update the isActive, but nothing else, the endpoint still needs the old information for all other fields
*/

app.put('/employees', (req, res) => {
  dbHelpers.editEmployee(req.body, (results) => {
    res.status(204).end();
  });
})


/*
employee creation requires a body of the following format:
{
  name: [employee name],
  phone: [10 character string of phone number],
  birthday: [YYYY-MM-DD],
  password: [initial input password],
  startDate: [YYYY-MM-DD],
  role: [single role] <-- currently only a single role, future work for multiple role array
}
*/

app.post('/employees', (req, res) => {
  dbHelpers.createEmployee(req.body, (results) => {
    res.status(201).send(results).end();
  })
})

/*
==============================================
      MISC
==============================================
*/

app.get('/getActivities', (req, res) => {
  dbHelpers.getActivities((results) => {
    res.send(results);
  });
});

app.put('/updateActivities', (req, res) => {
  const { id, name, type } = req.body;
  dbHelpers.updateActivities(id, name, type, (results) => {
    res.send(results);
  });
})

/*
example role color params object:
{
  role: [example role],
  color: [new color name]
}
*/

app.put('/updateRoleColor', (req, res) => {
  const roleColorObj = req.query
  dbHelpers.changeRoleColor(roleColorObj, (results) => {
    res.send(results)
  })
})


module.exports = app;

