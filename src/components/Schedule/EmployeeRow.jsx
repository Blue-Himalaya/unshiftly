import React from 'react'
import Shift from './Shift.jsx'
import { useSelector, useDispatch } from 'react-redux'

const EmployeeRow = (props) => {

  if (props.row === undefined || props.threeDays === []) {
    return null
  } else {

    const columnDatesFull = useSelector(state => state.scheduleReducer.listOfFullDays); // 2019-10-11 - 2019-10-17
    const naDay = 'rgb(225, 225, 225)'
    const naNight = 'rgb(215, 215, 215)'
    const aDay = 'white'
    const aNight = 'rgb(245, 245, 245)'

    return (

      <div className='table employee-row'
      style={{
        display: 'grid',
        gridTemplateColumns: props.gridTemplateColumnsTable
      }}>

        {/* EMPLOYEE NAME */}
        {/* FIRST BLOCK IN GRID */}
        <div className='table-elem emp-block'>
          <div className='employee-name'>
            {props.width > props.mobileWidth ? props.name.substring(0,8) : props.name}
          </div>
        </div>

        {/* EMPLOYEE SCHEDULE */}
        {/* SECOND BLOCK IN GRID */}
        <div className='employee-schedule'
        style={{
          display: 'grid',
          gridTemplateColumns: props.gridTemplateColumns
        }}>

          {/* LOOP THOURGH FRIDAY-THURSDAY */}
          {props.days.map((day, dayOfWeek) => {

            // SETTING 3 DAYS TO TODAY FOR MOBILE
            if( props.width > props.mobileWidth || props.threeDays.indexOf(day) !== -1 ) {

              var iterationDate = new Date(columnDatesFull[dayOfWeek]).getTime()
              var past = iterationDate < props.today ? 'past' : ''
              var timeoff = props.timeoff[day]

              var dayColor = aDay
              var nightColor = aNight

              if (timeoff.am === 1) {
                dayColor = naDay
              }

              if (timeoff.pm === 1) {
                nightColor = naNight
              }

              var gradDirection = (props.width > props.tabletWidth ? 'left' : 'top')

              return <div key={`day-table-${day}`}className={'day-table'}
              style={{
                // background: `linear-gradient(to left, rgb(245, 245, 245) 50%, rgb(255, 255, 255) 50%)`
                background: `linear-gradient(to ${gradDirection}, ${nightColor} 50%, ${dayColor} 50%)`
                // THIS GRADIENT DEPENDS ON AVAILABLE DAYS
              }}>
                { //LOOP THORUGH AM AND PM FOR THE CURRENT DAY
                  props.times.map((meridian) => {
                    var shiftTime = props.row[day][meridian][0] // 11:00:00
                    shiftTime = shiftTime.substring(0, shiftTime.length-3) //11:00

                    // console.log(props.row[day][meridian])
                    // GET OR SET TwO ROLES
                    var role1 = props.row[day][meridian][1]
                    if (!role1) {
                      role1 = 'none'
                    }
                    var role2 = props.row[day][meridian][2]
                    if (!role2) {
                      role2 = role1
                    }

                    var id = props.row[day][meridian][3]

                    //RENDER SHIFT
                    return (
                      <Shift
                      key={`table-elem-${day}-${meridian}`}

                      day={day} // FRIDAY
                      dayFull={columnDatesFull[dayOfWeek]}
                      meridian={meridian} // AM
                      color1={props.colors[role1]}
                      color2={props.colors[role2]}
                      shiftTime={shiftTime} // 11:00
                      shiftID={id}
                      timeoff={timeoff}
                      employeeInfo={props.row.info} // EMPLOYEE INFO

                      shiftShow={props.shiftShow} // STATE OF MODAL
                      toggleShiftShow={props.toggleShiftShow} // UPDATE STATE OF MODAL
                      updateDay={props.updateDay} // DAY IN MODAL
                      updateMeridian={props.updateMeridian} // AM-PM IN MODAL
                      updateEmployee={props.updateEmployee} // EMPLOYEE INFO IN MODAL
                      updateDate={props.updateDate} // DATE IN MODAL
                      updateExists={props.updateExists}
                      updateShift={props.updateShift}
                      updateShiftID={props.updateShiftID}

                      past={past} //DAY OF WEEK IS THE INDEX FROM MAPPING DAYS
                      />
                    )
                  })
                }
              </div>
            }
          })}

        </div>
      </div>
    )
  }
}

export default EmployeeRow