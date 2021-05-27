import React from 'react'

/**
 * {
    "schedule": [
        {
            "dateTime": "2020-09-11 16:00:00",
            "name": "jum",
            "role_one": "bartender",
            "role_two": null
        }
    ]
}
 */

const addShift = (e, emp, date, meridian, cb) => {
  e.preventDefault()
  console.log(date)
  console.log(e.target[0].value)
  console.log(meridian)
  console.log(emp.name)
  console.log(e.target[1].value)
  console.log(e.target[2].value)
  cb()
}

const UpdateShiftModal = (props) => {

  var dateInfo = props.currentDate.split('-')
  if (props.show) {
    return (
      <div className='update-shift-modal-outside modal-outer'>
        <div className='update-shift-modal modal-inner'>

          <div onClick={() => {
            props.toggleShiftShow(!props.show)
            props.updateEmployee('')
            props.updateDay('')
            props.updateMeridian('')
            }}>x</div>

            <div>
              Add to Schedule:
            </div>

            <div>
              {props.currentEmployee.name}
            </div>

            <div>
              <br/>
              {props.currentDay},&nbsp;
              {props.months[parseInt(dateInfo[1])]}&nbsp;
              {parseInt(dateInfo[2])}
            </div>

            <form onSubmit={(e) => {
                addShift(e, props.currentEmployee, props.currentDate, props.currentMeridian, () => {
                  props.toggleShiftShow(!props.show)
                })
              }}>
              <label htmlFor="shift-time">Shift Time: </label>
              <select id="shift-time" name="shift-time">
                {props.currentMeridian === 'am' ?
                <>
                <option value='6:00'>6:00</option>
                <option value='7:00'>7:00</option>
                <option value='8:00'>8:00</option>
                <option value='9:00'>9:00</option>
                <option value='10:00'>10:00</option>
                <option value='11:00'>11:00</option>
                </>
                :
                <>
                <option value='6:00'>12:00</option>
                <option value='6:00'>1:00</option>
                <option value='6:00'>2:00</option>
                <option value='6:00'>3:00</option>
                <option value='6:00'>4:00</option>
                <option value='6:00'>5:00</option>
                <option value='6:00'>6:00</option>
                <option value='6:00'>7:00</option>
                <option value='6:00'>8:00</option>
                <option value='6:00'>9:00</option>
                <option value='6:00'>10:00</option>
                </>
                }
              </select> {props.currentMeridian.toUpperCase()}
               {/* {JSON.stringify(props.currentEmployee)} <br/> */}

              <br/>

              <label htmlFor="shift-role-1">Role 1: </label>
              <select id="shift-role-1" name="shift-role-1">
                {props.currentEmployee.roles.map((role) => {
                  return <option key={role.role} value={role.role}>{role.role}</option>
                })}
              </select>

              <br/>

              <label htmlFor="shift-role-2">Role 2: </label>
              <select id="shift-role-2" name="shift-role-2">
                <option value={'flamingo'}>--</option>
                {props.currentEmployee.roles.map((role) => {
                  return <option key={role.role} value={role.role}>{role.role}</option>
                })}
              </select>

              <br/>

              {props.publish ?
              <input type='submit' value='Save Progress'/> :
              <input type='submit' value='Publish'/>}
            </form>
        </div>
      </div>
    )
  } else {
    return (null)
  }

}

export default UpdateShiftModal