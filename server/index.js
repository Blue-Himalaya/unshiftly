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
        //console.log(user, info)
        if (err) throw err;
        res.send({ auth: 'success!', role: user[0].role, user: user[0].name });
      });
    }
  })(req, res, next);
});

app.get('/logout')


//page first loads - admin
  //dates of week, in the request params (start, end)
  //shifts for each day
    //name, time, color coded, employee phone number
  //activity log (limit last 20)

//initial employee page load request
// app.get('/employeeSchedule', (req, res) => {
//   const { employeeID, dateStart, dateEnd } = req.params
//   db.getEmployeeSchedule([employeeID, dateStart, dateEnd], (results) => {
//     res.send(results)
//   })
// })

app.get('/logOut', (req, res) => {
  req.logout();
  console.log('after: ', req);
  res.send('loggedOut');
});

<<<<<<< HEAD
app.put('/employeeShiftUpdate', (req, res) => {
  const { employeeID, shiftDate, giveUpPickUp} = req.params
  db.updateEmployeeShiftSwap([employeeID, shiftDate, giveUpPickUp], (results) => {
    res.send(results)
  })
})
=======
// app.put('/employeeShiftUpdate', (req, res) => {
//   const { employeeID, shiftDate, giveUpPickUp} = req.params
//   db.updateEmployeeShiftSwap([employeeID, shiftDate, giveUpPickUp], (results) => {
//     res.send(results)
//   })
// })
>>>>>>> 5ebff84c0f3e901cc0d28d9db956cd35cadfed4f

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
<<<<<<< HEAD
       var final = helperFunctions.adminScheduleFormatting(results)
       res.send(final)
  }})
=======
      var final = helperFunctions.adminScheduleFormatting(results)
      res.send(final)
    }
  })
})

app.get('/scheduletest', (req, res) => {
  db.query(`select es.id, es.datetime, e.name, r.role, e.phone from employee_schedule es, employees e join employee_roles er on er.id_employee = e.id join roles r on r.id = er.id_role where es.employee_role_one = er.id or employee_role_two = er.id and es.datetime between '2020-10-11' and '2020-10-17' order by es.datetime asc`,
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
>>>>>>> 5ebff84c0f3e901cc0d28d9db956cd35cadfed4f
})


app.post('/schedule', (req, res) => {
  dbHelpers.postSchedule(req.body, (resultsFromSched) => {
    res.send(resultsFromSched);
    res.status(200);
    res.end();
  })
})

/*
======================================================
        TIME OFF
======================================================
*/

app.get('/allSingleTimeOff', (req, res) => {
  const dateObj = req.query;
  dbHelpers.getAllSingleTimeOff(dateObj,(results) => {
    res.send(results)
  })
})
<<<<<<< HEAD

app.get('/recurringTimeOff', (req, res) => {
  dbHelpers.getAllRecurringTimeOff((results) => {
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
  // console.log("reqest obj", requestObj)
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
      EMPLOYEE INFORMATION
======================================================

*/

app.get('/allActiveEmployees', (req, res) => {
  dbHelpers.getAllActiveEmployees((results) => {
    var final = helperFunctions.employeeRolesFormatting(results)
    res.send(final)
  })
})
=======
>>>>>>> 5ebff84c0f3e901cc0d28d9db956cd35cadfed4f


app.get('/allRolesAndColors', (req, res) => {
  dbHelpers.getRolesWithColors((results) => {
    res.send(results)
  })
})

app.get('/getActivities', (req, res) => {
  dbHelpers.getActivities((results) => {
    console.log(results);
    res.send(results);
  });
});

app.put('/updateActivities', (req, res) => {
  const { id, name, type } = req.body;
  dbHelpers.updateActivities(id, name, type, (results) => {
    res.send(results);
  });
})

//attach role: role, color: new_color_name to params
app.put('/updateRoleColor', (req, res) => {
  const roleColorObj = req.query
  dbHelpers.changeRoleColor(roleColorObj, (results) => {
    res.send(results)
  })
})


/*
======================================================
        EMPLOYEE INFORMATION
======================================================

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

<<<<<<< HEAD
app.put('/employees', (req, res) => {
  const requestObj = req.body;
  dbHelpers.editEmployee(requestObj, (results) => {
    res.status(201).send('updated').end();
  })
=======
app.post('/requestSingleDayOff', (req, res) => {
  const requestObj = req.query
  // console.log("reqest obj", requestObj)
  dbHelpers.requestSingleDayOff(requestObj, (results) => {
    res.status(200).send('created')
  });
});

app.post('/employees', (req, res) => {
  dbHelpers.createEmployee(req.body, (results) => {
    // I will probably need these results
    // to update state ~
    // res.status(200).send('created');
  });
>>>>>>> 5ebff84c0f3e901cc0d28d9db956cd35cadfed4f
})


module.exports = app;
