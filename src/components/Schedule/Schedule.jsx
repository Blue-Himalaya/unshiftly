import React, {useState, useEffect, useLayoutEffect} from 'react'
import EmployeeRow from './EmployeeRow.jsx'
import { useSelector, useDispatch } from 'react-redux'
import UpdateShiftModal from './UpdateShiftModal.jsx'
import moment from 'moment'

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
  const [currentDate, updateDate] = useState('') // fri-thu
  const [currentDay, updateDay] = useState('') // whole date 2019-10-15
  const [currentMeridian, updateMeridian] = useState('') //am pm
  const [currentEmployee, updateEmployee] = useState('')

  // INFORMATION FROM THE DATABASE
  const [table, updateTable] = useState(null)
  const [unavailability, updateUnavailability] = useState(null)

  const columnDatesFull = useSelector(state => state.scheduleReducer.listOfFullDays); // 2019-10-11 - 2019-10-17
  const currentDateInfo = useSelector(state => state.scheduleReducer.currentDate).split('-'); // ['2019', '10', '15']
  const startDateInfo = useSelector(state => state.scheduleReducer.startDate); // ['2019', '10', '15']
  const singleTimeOff = useSelector(state => state.timeOffReducer.singleTimeOff);
  const columnDates = useSelector(state => state.scheduleReducer.listOfDays); // 11-17
  const employees = useSelector(state => state.employeeReducer.employees);
  const schedule = useSelector(state => state.scheduleReducer.schedule);
  const timeOff = useSelector(state => state.timeOffReducer.timeOff);
  const colors = useSelector(state => state.rolesReducer.roles);
  const today = new Date(currentDateInfo.join('-')).getTime() // date version of current day

  // LIST OF CALENDAR INFO
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
  const times = ['am', 'pm']

  // PUBLISH BUTTON
  const [publish, togglePublish] = useState(false)

  // WINDOW SIZE
  const [width, height] = useWindowSize();

  // LIST OF THREE DAY VIEW FOR MOBILE
  var threeDays = []
  var index = columnDates.indexOf(parseInt(currentDateInfo[2]))
  if (index < 5) {
    threeDays = days.slice(index, index + 3)
  } else if (index >= 5 && index < 7) {
    threeDays = days.slice(4, 7)
  } else {
    threeDays = days.slice(0, 3)
  }

  // NUMBER OF DAYS SHOWN DEPENDING ON MOBILE VIEW
  var gridTemplateColumns = (width > props.mobileWidth)
  ? '1fr 1fr 1fr 1fr 1fr 1fr 1fr'
  : '1fr 1fr 1fr'
  var gridTemplateColumnsTable = (width > props.mobileWidth)
  ? '1fr 7fr'
  : 'auto'

  /* ===========================================================
    COMPONENT DID MOUNT ========================================
  ============================================================= */

  // CREATE DATA STRUCTURE FOR THE CALENDAR ONLY WHEN ALL DATA EXISTS
  useEffect(() => {
    if (schedule && employees && timeOff && colors) {

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

          // DEACTIVATE PUBLISH BUTTON

          togglePublish(false)
          // [..., TIME, AM/PM]
          var time = shift.datetime.split(' ')

          //EMPLOYEE-NAME > DAY > AM/PM = TIME
          if (table[shift.name]) {
            table[shift.name][day][time[time.length - 1]] =
              [time[time.length - 2], shift.role[0], shift.role[1]]
          }
        })
      }

      // singleTimeOff.map(timeoff => {
      //   var day = moment.utc(timeoff.date).format('dddd')
      //   var time = timeoff.morning ? 'am' : 'pm'
      //   table[timeoff.name][day][time][1] = 'off'
      //   table[timeoff.name][day][time][0] = 'RTO:00'
      // })

      var unavailability = {}

      employees.map((employee) => {
        unavailability[employee.name] =
        {
          info: employee,
          Friday: { am: 0, pm: 0 },
          Saturday: { am: 0, pm: 0 },
          Sunday: { am: 0, pm: 0 },
          Monday: { am: 0, pm: 0 },
          Tuesday: { am: 0, pm: 0 },
          Wednesday: { am: 0, pm: 0 },
          Thursday: { am: 0, pm: 0 }
        }
      })

      // timeOff.map(off => {
      //   if (off.morning === 1) {
      //     unavailability[off.name][off.day]['am'] = 1
      //   } else if (off.morning === 0) {
      //     unavailability[off.name][off.day]['pm'] = 1
      //   }
      // })

      updateTable(table)
      updateUnavailability(unavailability)
    }
  }, [])


  /* ===========================================================
    RENDER =====================================================
  ============================================================= */
  return (
    <>
    {table !== null ?
    <div className='schedule'>

      {/* =========================
      =========== MODAL ===========
      ========================== */}
      <UpdateShiftModal
      days={days}
      months={months}
      publish={publish}

      show={shiftShow}
      toggleShiftShow={toggleShiftShow}

      updateMeridian={updateMeridian}
      updateDay={updateDay}
      updateEmployee={updateEmployee}
      updateDate={updateDate}

      currentMeridian={currentMeridian}
      currentDay={currentDay}
      currentEmployee={currentEmployee}
      currentDate={currentDate}
      />


      {/* =========================
      =========== DATES ===========
      ========================== */}

      <div className='table table-header'
      style={{
        display: 'grid',
        gridTemplateColumns: gridTemplateColumnsTable
      }}>

        {/* MONTH */}
        <div className='month'>
          <div className='click-left'>{'<'}</div>
          <div className='month-text'>
            {months[startDateInfo.getUTCMonth()]} {startDateInfo.getUTCFullYear()}
          </div>
          <div className='click-right'>{'>'}</div>
        </div>

        {/* DAYS OF THE WEEK   s */}
        <div className='column-names'
        style={{
          display: 'grid',
          gridTemplateColumns: gridTemplateColumns
        }}>

        {/* MAP THROUGH FRIDAY-THURSDAY */}
        {/* i WILL BE THE SAME FOR DAYS, COLUMNDATES, COLUMNDATESFULL */}
        {days.map((day, i) => {

          //RENDER ALL IF WIDTH IS GREATER. OTHERWISE RENDER ONLY THE THREEDAYS
          if ( width > props.mobileWidth || threeDays.indexOf(days[i]) !== -1) {

            //CLASSES FOR CONDITIONAL STYLING
            var iterationDate = new Date(columnDatesFull[i]).getTime()
            var isToday = iterationDate === today ? 'highlight-today' : ''
            var pastToday = iterationDate < today ? 'past-today' : ''

            // console.log('TODAY:', today)
            // console.log('ITERA:', iterationDate)

            //RENDER COLUMN NAMES
            return(
              <div key={`table-elem-top-${day}`} className={`table-elem-top column ${isToday} ${pastToday}`}>
                <div className='col-day'>{day.substring(0, 3)}</div>
                <div className={`col-date ${isToday}`}>{columnDates[i]}</div>
              </div>
            )
          } // END FOR RENDER CONDITION
        })} {/* END FOR DAYS MAP */}
        </div>

      </div> {/* END OF COLUMN HEADERS */}



      {/* =========================
      ========= EMPLOYEES =========
      ========================== */}

      {employees.map((employee) => {
        return <EmployeeRow
        key={employee.name}
        colors={colors}
        name={employee.name}
        row={table[employee.name]} // Includes information
        timeoff={unavailability[employee.name]}

        days={days} // Friday-Thursday
        times={times} // AM-PM
        indexOfDay={index} // Which day of the week is the current day
        threeDays={threeDays}
        today={today}

        width={width} // Width of the window
        mobileWidth={props.mobileWidth} // Width of mobile
        tabletWidth={props.tabletWidth}  // Width of tablet
        gridTemplateColumns={gridTemplateColumns} // How many days to render
        gridTemplateColumnsTable={gridTemplateColumnsTable} // Where to render employee in respect to schedule

        shiftShow={shiftShow} // show modal
        toggleShiftShow={toggleShiftShow} // update whether modal shows
        updateDay={updateDay}
        updateMeridian={updateMeridian}
        updateEmployee={updateEmployee}
        updateDate={updateDate}
        />
      })}



      {/* =========================
      ========== PUBLISH ==========
      ========================== */}
      {publish === true ?
      <div className='publish'>
        <div className='button'>{publish}
          <button>Publish </button>
        </div>
      </div>
      : null
      }

    </div> // END OF SCHEDULE PAGE
    : <div>Loading...</div>}
    </>
  )
}

export default Schedule