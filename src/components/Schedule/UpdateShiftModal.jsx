import React from 'react'

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
              <br/>
              {props.currentDay},&nbsp;
              {props.months[parseInt(dateInfo[1])]}&nbsp;
              {parseInt(dateInfo[2])}
            </div>
            <form>
              <label htmlFor="shift-time">Shift Time: </label>
              <select id="shift-time" type="time" name="shift-time">
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
              {/* HELLO  {JSON.stringify(props.currentEmployee)} <br/> */}
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