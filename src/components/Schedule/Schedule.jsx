import React, {useState, useEffect} from 'react'
import EmployeeRow from './EmployeeRow.jsx'
import { useSelector, useDispatch } from 'react-redux';

const Schedule = (props) => {
  const [table, updateTable] = useState(null)
  const [colors, updateColors] = useState(null)
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  const employees = useSelector(state => state.employeeReducer.employees);
  const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const roles = useSelector(state => state.rolesReducer.roles);

  // LIST OF DAYS
  const days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
  const daysOrdered = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const times = ['am', 'pm']
  var today = new Date('2019-10-19T11:00:00Z')

  //LIST OF DAYS FOR COLUMN HEADERS
  const columnDays = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu']
  var columnDates = ['11', '12', '13', '14', '15', '16', '17']

  // LIST OF THREE DAY VIEW FOR MOBILE
  var threeDays = []
  if (today.getDay() < 2 || today.getDay() > 4) {
    var index = days.indexOf(daysOrdered[today.getDay()])
    threeDays = days.slice(index, index + 3)
  } else {
    threeDays = days.slice(4, 7)
  }




  useEffect(() => {
    if (schedule && employees && timeOff && roles) {

      // LIST OF ALL DATA TO GO IN THE SCHEDULE BY EMPLOYEE NAME
      var table = {};

      // SET THE DAYS OF ALL EMPLOYEES TO EMPTY SCHEDULES
      employees.map((employee) => {
        table[employee.name] =
        {
          Friday: { am: ['', '', ''], pm: ['', '', ''] },
          Saturday: { am: ['', '', ''], pm: ['', '', ''] },
          Sunday: { am: ['', '', ''], pm: ['', '', ''] },
          Monday: { am: ['', '', ''], pm: ['', '', ''] },
          Tuesday: { am: ['', '', ''], pm: ['', '', ''] },
          Wednesday: { am: ['', '', ''], pm: ['', '', ''] },
          Thursday: { am: ['', '', ''], pm: ['', '', ''] }
        }
      })

      // LOOP THROUGH THE SCHEDULE AND SET SHIFTS TO
      // [TIME, ROLE1, ROLE2]
      for(var day in schedule[0]) {
        schedule[0][day].map((shift) => {
          // [..., TIME, AM/PM]
          var time = shift.datetime.split(' ')

          //EMPLOYEE-NAME > DAY > AM/PM = TIME
          table[shift.name][day][time[time.length - 1]] =
            [time[time.length - 2], shift.role[0], shift.role[1]]
        })
      }


      // SET COLORS FROM ARRAY OF OBJECT TO OBJECT OF COLORS
      var newColors = {}
      roles.map(role => {
        newColors[role.role] = role.color
      })

      //SET MORE COLORS
      newColors.none = 'white'
      newColors.off = 'gray'

      updateTable(table)
      updateColors(newColors)
    }
  }, [])

  return (
    <>
    {table !== null ?
    <div>
      <div className='month'> {'<'} Oct 2019 {'>'}</div>

      <div className='table'>
        <div className='table-elem-top'></div>

        {columnDays.map((day, i) => {
          var isToday = ''
          if (threeDays.indexOf(days[i]) !== -1) {
            isToday = 'today'
          }

          return(
            <div key={`table-elem-top-${day}`} className={`table-elem-top column ${isToday}`}>
              <div className='col-day'>{day}</div>
              <div className='col-date'>{columnDates[i]}</div>
            </div>

          )

        })}
        {/*

        <div className='table-elem-top column'>
          <div className='col-day'>Fri</div>
          <div className='col-date'>11</div>
        </div>

        <div className='table-elem-top column'>
          <div className='col-day'>Sat</div>
          <div className='col-date'>12</div>
        </div>

        <div className='table-elem-top column'>
          <div className='col-day'>Sun</div>
          <div className='col-date'>13</div>
        </div>

        <div className='table-elem-top column'>
          <div className='col-day'>Mon</div>
          <div className='col-date'>14</div>
        </div>

        <div className='table-elem-top column'>
          <div className='col-day'>Tue</div>
          <div className='col-date'>15</div>
        </div>

        <div className='table-elem-top column'>
          <div className='col-day'>Wed</div>
          <div className='col-date'>16</div>
        </div>

        <div className='table-elem-top column'>
          <div className='col-day'>Thu</div>
          <div className='col-date'>17</div>
        </div> */}
      </div>

      {employees.map((employee) => {
        return <EmployeeRow
        key={employee.name}
        colors={colors}
        name={employee.name}
        row={table[employee.name]}
        days={days}
        times={times}
        threeDays={threeDays}
        />
      })}

      <div className='publish'><div className='button'><button>Publish</button></div></div>

    </div>
    : <div>NO</div>}
    </>
  )
}

export default Schedule