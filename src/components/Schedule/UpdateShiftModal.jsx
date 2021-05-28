import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import fetchSchedule from '../../../redux-state/actions/fetchSchedule.js';


const addShift = (e, emp, date, cbSuccess, cbEnd) => {
  e.preventDefault()

  var body = {
    "schedule": [
        {
            "dateTime": date + ' ' + e.target[0].value,
            "name": emp.name,
            "role_one": e.target[1].value
        }
    ]
  }

  axios.post('schedule', body)
    .then((res) => {
      cbSuccess()
    })
    .catch((err) => {
      console.error(err)
    })

  cbEnd()
}

const UpdateShiftModal = (props) => {
  const dispatch = useDispatch();

  var dateInfo = props.currentDate.split('-')
  if (props.show) {
    return (
      <div className='update-shift-modal-outside modal-outer'>
        <div className='update-shift-modal modal-inner'>

          <div className='update-shift-modal-content'>

            <div className='modal-header'onClick={() => {
              props.toggleShiftShow(!props.show)
              props.updateEmployee('')
              props.updateDay('')
              props.updateMeridian('')
              }}>x
            </div>

            <div className='modal-title'>
              Add to Schedule:
            </div>

            <div className='modal-employee-name'>
              {props.currentEmployee.name}
            </div>

            <div className='modal-shift-info'>
              <br/>
              {props.currentDay},&nbsp;
              {props.months[parseInt(dateInfo[1])]}&nbsp;
              {parseInt(dateInfo[2])}
            </div>

            <form onSubmit={(e) => {
                addShift(e, props.currentEmployee, props.currentDate,
                () => { //cbSuccess
                  dispatch(fetchSchedule(props.today))
                  // const schedule = useSelector(state => state.scheduleReducer.schedule);
                  // props.updateSchedule()
                },
                () => { //cbEnd
                  props.toggleShiftShow(!props.show)
                })
              }}>
              <label htmlFor="shift-time">Shift Time: </label>
              <select id="shift-time" name="shift-time">
                {props.currentMeridian === 'am' ?
                <>
                <option value='6:00:00'>6:00</option>
                <option value='7:00:00'>7:00</option>
                <option value='8:00:00'>8:00</option>
                <option value='9:00:00'>9:00</option>
                <option value='10:00:00'>10:00</option>
                <option value='11:00:00'>11:00</option>
                </>
                :
                <>
                <option value='12:00:00'>12:00</option>
                <option value='13:00:00'>1:00</option>
                <option value='14:00:00'>2:00</option>
                <option value='15:00:00'>3:00</option>
                <option value='16:00:00'>4:00</option>
                <option value='17:00:00'>5:00</option>
                <option value='18:00:00'>6:00</option>
                <option value='19:00:00'>7:00</option>
                <option value='20:00:00'>8:00</option>
                <option value='21:00:00'>9:00</option>
                <option value='22:00:00'>10:00</option>
                </>
                }
              </select> {props.currentMeridian.toUpperCase()}
               {/* {JSON.stringify(props.currentEmployee)} <br/> */}

              <br/>

              <label htmlFor="shift-role">Role: </label>
              <select id="shift-role" name="shift-role">
                {props.currentEmployee.roles.map((role) => {
                  return <option key={role.role} value={role.role}>{role.role}</option>
                })}
              </select>

              <br/>

              <br/>

              {props.publish ?
              <input type='submit' value='Save Progress'/> :
              <input type='submit' value='Publish'/>}
            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return (null)
  }

}

export default UpdateShiftModal