import React from 'react'



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
            {props.name}
          </div>
        </div>

        {/* EMPLOYEE SCHEDULE */}
        {/* SECOND BLOCK IN GRID */}
        <div className='employee-schedule'
        style={{
          display: 'grid',
          gridTemplateColumns: props.gridTemplateColumns
        }}>

          {props.days.map((day) => {

            // SETTING 3 DAYS TO TODAY FOR MOBILE
            if( props.width > props.mobileWidth || props.threeDays.indexOf(day) !== -1 ) {

              return <div key={`day-table-${day}`}className={'day-table'}
              style={{
                // background: `linear-gradient(to left, rgb(245, 245, 245) 50%, rgb(255, 255, 255) 50%)`
              }}>
                {
                  props.times.map((time) => {
                    var shiftTime = props.row[day][time][0]
                    shiftTime = shiftTime.substring(0, shiftTime.length-3)
                    var role1 = props.row[day][time][1]
                    if (!role1) {
                      role1 = 'none'
                    }
                    var role2 = props.row[day][time][2]
                    if (!role2) {
                      role2 = role1
                    }
                    return (
                      <div key={`table-elem-${day}-${time}`} className={'table-elem role1-' + role1 + ' role2-' + role2}
                        style={{
                          background: `linear-gradient(0.375turn, ${props.colors[role1]} 50%, ${props.colors[role2]} 50%)`,
                          color: 'white',
                          borderRadius: '5px'
                        }}>
                        &nbsp;{shiftTime}&nbsp;
                      </div>
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