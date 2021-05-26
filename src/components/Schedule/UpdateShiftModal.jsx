import React from 'react'

const UpdateShiftModal = (props) => {

  if (props.show) {
    return (
      <div className='update-shift-modal-outside'>
        <div className='update-shift-modal'>
          <div onClick={() => {
            props.toggleShiftShow(!props.show)
            props.updateEmployee('')
            props.updateDay('')
            props.updateMeridian('')
            }}>x</div>
          HELLO {props.currentDay} {props.currentMeridian} {JSON.stringify(props.currentEmployee)}
        </div>
      </div>
    )
  } else {
    return (null)
  }

}

export default UpdateShiftModal