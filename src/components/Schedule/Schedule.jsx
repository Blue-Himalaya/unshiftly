import React, {useState, useEffect, useLayoutEffect} from 'react'
import EmployeeRow from './EmployeeRow.jsx'
import { useSelector, useDispatch } from 'react-redux'
import UpdateShiftModal from './UpdateShiftModal.jsx'

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Schedule = (props) => {

  // MODAL STATES
  const [shiftShow, toggleShiftShow] = useState(false)

  // INFORMATION FROM THE DATABASE
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

  // WINDOW SIZE
  const [width, height] = useWindowSize();

  // LIST OF THREE DAY VIEW FOR MOBILE
  var threeDays = []
  if (today.getDay() < 2 || today.getDay() > 4) {
    var index = days.indexOf(daysOrdered[today.getDay()])
    threeDays = days.slice(index, index + 3)
  } else {
    threeDays = days.slice(4, 7)
  }

  // CREATE DATA STRUCTURE FOR THE CALENDAR ONLY WHEN ALL DATA EXISTS
  useEffect(() => {
    if (schedule && employees && timeOff && roles) {

      // LIST OF ALL DATA TO GO IN THE SCHEDULE BY EMPLOYEE NAME
      var table = {};

      // SET THE DAYS OF ALL EMPLOYEES TO EMPTY SCHEDULES
      employees.map((employee) => {
        table[employee.name] =
        {
          info: employee,
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
      newColors.none = 'rgba(255, 255, 255, 0)'
      newColors.off = 'gray'

      updateTable(table)
      updateColors(newColors)
    }
  }, [])

  var gridTemplateColumns = (width > props.mobileWidth)
  ? '1fr 1fr 1fr 1fr 1fr 1fr 1fr'
  : '1fr 1fr 1fr'

  var gridTemplateColumnsTable = (width > props.mobileWidth)
  ? '1fr 7fr'
  : 'auto'

  return (
    <>
    {table !== null ?
    <div className='schedule'>
      {/* <UpdateShiftModal
      show={shiftShow}
      toggleShiftShow={toggleShiftShow}
      /> */}
      <div className='month'> {'<'} Oct 2019 {'>'}</div>

      <div className='table'
      style={{
        display: 'grid',
        gridTemplateColumns: (width > props.mobileWidth ? '1fr ' : '') + gridTemplateColumns
      }}>
        {width > props.mobileWidth ? <div className='table-elem-empty'></div> : null}

        {columnDays.map((day, i) => {
          if ( width > props.mobileWidth || threeDays.indexOf(days[i]) !== -1) {
            return(
              <div key={`table-elem-top-${day}`} className={`table-elem-top column`}>
                <div className='col-day'>{day}</div>
                <div className='col-date'>{columnDates[i]}</div>
              </div>
            ) // END OF COLUMN HEADER RETURN
          }

        })}

      </div> {/* END OF COLUMN HEADERS */}

      {employees.map((employee) => {
        return <EmployeeRow
        key={employee.name}
        colors={colors}
        name={employee.name}
        row={table[employee.name]}
        days={days}
        times={times}
        threeDays={threeDays}
        width={width}
        mobileWidth={props.mobileWidth}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateColumnsTable={gridTemplateColumnsTable}
        shiftShow={shiftShow}
        toggleShiftShow={toggleShiftShow}
        />
      })}

      {/* PUBLISH BUTTON */}
      <div className='publish'>
        <div className='button'>
          <button>Publish</button>
        </div>
      </div>

    </div> // END OF SCHEDULE PAGE
    : <div>Loading...</div>}
    </>
  )
}

export default Schedule