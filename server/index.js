const sexpress = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

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


module.exports = app;