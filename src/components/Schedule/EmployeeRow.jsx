import React from 'react'
import Shift from './Shift.jsx'


const EmployeeRow = (props) => {

  if (props.row === undefined || props.threeDays === []) {
    return null
  } else {

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

          {props.days.map((day, dayOfWeek) => {

            // SETTING 3 DAYS TO TODAY FOR MOBILE
            if( props.width > props.mobileWidth || props.threeDays.indexOf(day) !== -1 ) {

              return <div key={`day-table-${day}`}className={'day-table'}
              style={{
                // background: `linear-gradient(to left, rgb(245, 245, 245) 50%, rgb(255, 255, 255) 50%)`
              }}>
                {
                  props.times.map((meridian) => {
                    var shiftTime = props.row[day][meridian][0]
                    shiftTime = shiftTime.substring(0, shiftTime.length-3)
                    var role1 = props.row[day][meridian][1]
                    if (!role1) {
                      role1 = 'none'
                    }
                    var role2 = props.row[day][meridian][2]
                    if (!role2) {
                      role2 = role1
                    }
                    return (
                      <Shift
                      key={`table-elem-${day}-${meridian}`}
                      day={day}
                      meridian={meridian}
                      color1={props.colors[role1]}
                      color2={props.colors[role2]}
                      shiftTime={shiftTime}
                      info={props.row.info}
                      shiftShow={props.shiftShow}
                      toggleShiftShow={props.toggleShiftShow}
                      past={(dayOfWeek < props.indexOfDay) ? 'past' : ''}
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